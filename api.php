<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli('localhost', 'root', '', 'SLBus');
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

$buses = [];

$busQuery = "SELECT * FROM buses";
$busResult = $conn->query($busQuery);

while ($busRow = $busResult->fetch_assoc()) {
    $bus_id = $busRow['bus_id'];

    $scheduleQuery = "SELECT s.*, mr.route_name, mr.route_number 
                     FROM schedules s 
                     JOIN main_routes mr ON s.route_id = mr.route_id 
                     WHERE s.bus_id = $bus_id";
    $scheduleResult = $conn->query($scheduleQuery);
    $schedule = $scheduleResult->fetch_assoc();

    if (!$schedule) {
        continue;
    }

    $stopsQuery = "SELECT rs.stop_order, rs.location_id, l.name 
                   FROM route_stops rs 
                   JOIN locations l ON rs.location_id = l.location_id 
                   WHERE rs.route_id = {$schedule['route_id']} 
                   ORDER BY rs.stop_order";
    $stopsResult = $conn->query($stopsQuery);
    $stops = [];
    $stopOrderMap = [];
    $locationIdMap = [];

    // Calculate total journey duration in seconds
    $departureTime = strtotime($schedule['departure_time']);
    $arrivalTime = strtotime($schedule['arrival_time']);
    $journeyDuration = $arrivalTime - $departureTime; // Total duration in seconds

    // Count total stops to calculate time increment per stop
    $stopsResult->data_seek(0); // Reset pointer to count stops
    $totalStops = $stopsResult->num_rows;
    $timeIncrementPerStop = $totalStops > 1 ? $journeyDuration / ($totalStops - 1) : 0; // Time increment per stop in seconds

    $currentStopIndex = 0;
    while ($stopRow = $stopsResult->fetch_assoc()) {
        // Calculate stop time based on index and increment
        $stopTime = $departureTime + ($currentStopIndex * $timeIncrementPerStop);
        $stop = [
            'name' => $stopRow['name'],
            'time' => date('h:i A', $stopTime)
        ];
        $stops[] = $stop;
        $stopOrderMap[$stopRow['name']] = $stopRow['stop_order'];
        $locationIdMap[$stopRow['name']] = $stopRow['location_id'];
        $currentStopIndex++;
    }

    $firstStop = $stops[0]['name'];
    $lastStop = end($stops)['name'];

    $fares = [];
    foreach ($stopOrderMap as $fromName => $fromOrder) {
        foreach ($stopOrderMap as $toName => $toOrder) {
            if ($fromOrder < $toOrder) {
                $difference = $toOrder - $fromOrder;
                error_log("Calculating fare from $fromName (stop_order: $fromOrder) to $toName (stop_order: $toOrder), difference: $difference");

                // Query fare_master for the fare based on the difference
                $fareQuery = "SELECT fare FROM fare_master WHERE fare_id = $difference";
                $fareResult = $conn->query($fareQuery);
                $fareRow = $fareResult->fetch_assoc();

                if ($fareRow && $fareRow['fare'] !== null) {
                    $fareKey = strtolower($fromName) . '-' . strtolower($toName);
                    $fares[$fareKey] = number_format($fareRow['fare'], 2) . ' LKR';
                } else {
                    $fares[strtolower($fromName) . '-' . strtolower($toName)] = '0.00 LKR'; // Default to 0 if no fare
                }
            }
        }
    }

    if (empty($fares)) {
        $fares = ['error' => 'No fare data available for this route'];
    }

    error_log("Fares for bus_id $bus_id: " . json_encode($fares));

    $buses[] = [
        'company' => $busRow['company'],
        'class' => $busRow['class'],
        'service' => $busRow['service'],
        'amenities' => $busRow['amenities'],
        'image' => $busRow['image'],
        'route' => ['direction' => 'bus', 'start' => $firstStop ?? 'Unknown', 'end' => $lastStop ?? 'Unknown'],
        'departure' => [
            'time' => date('h:i A', strtotime($schedule['departure_time'])),
            'date' => date('d M Y', strtotime($schedule['departure_date'])),
            'location' => $firstStop ?? 'Colombo'
        ],
        'arrival' => [
            'time' => date('h:i A', strtotime($schedule['arrival_time'])),
            'date' => date('d M Y', strtotime($schedule['arrival_date'])),
            'location' => $lastStop ?? 'Kandy(මහනුවර)'
        ],
        'stops' => $stops,
        'allStops' => $stops,
        'coffeeBreak' => date('h:i A', strtotime($busRow['coffeeBreak'])),
        'fare' => $fares,
        'additionalInfo' => [
            'typeOfSeat' => $busRow['type_of_seat'],
            'route' => $schedule['route_name'],
            'noOfSeats' => $busRow['no_of_seats'],
            'availability' => $busRow['availability'],
            'routeNumber' => $schedule['route_number'],
            'rating' => $busRow['rating']
        ]
    ];
}

echo json_encode($buses);
$conn->close();
?>