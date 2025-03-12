<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$conn = new mysqli('localhost', 'root', '', 'bus_booking');
if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

$buses = [];

$busQuery = "SELECT * FROM buses";
$busResult = $conn->query($busQuery);

while ($busRow = $busResult->fetch_assoc()) {
    $bus_id = $busRow['bus_id'];

    // Fetch additional info
    $additionalInfoQuery = "SELECT * FROM additional_info WHERE bus_id = $bus_id";
    $additionalInfoResult = $conn->query($additionalInfoQuery);
    $additionalInfo = $additionalInfoResult->fetch_assoc();

    // Fetch schedule and route details
    $scheduleQuery = "SELECT s.*, r.route_name, r.route_number, r.route_type 
                     FROM schedules s 
                     JOIN routes r ON s.route_id = r.route_id 
                     WHERE s.bus_id = $bus_id";
    $scheduleResult = $conn->query($scheduleQuery);
    $schedule = $scheduleResult->fetch_assoc();

    // Fetch stops
    $stopsQuery = "SELECT s.stop_time, l.name 
                   FROM stops s 
                   JOIN locations l ON s.location_id = l.location_id 
                   WHERE s.schedule_id = {$schedule['schedule_id']} 
                   ORDER BY s.stop_order";
    $stopsResult = $conn->query($stopsQuery);
    $stops = [];
    $firstStop = null;
    $lastStop = null;

    while ($stopRow = $stopsResult->fetch_assoc()) {
        $stop = [
            'name' => $stopRow['name'],
            'time' => date('h:i A', strtotime($stopRow['stop_time']))
        ];
        $stops[] = $stop;
        if ($firstStop === null) $firstStop = $stop['name'];
        $lastStop = $stop['name'];
    }

    // Fetch fares from stop_fares table
    $fareQuery = "SELECT l1.name AS from_name, l2.name AS to_name, sf.fare 
                  FROM stop_fares sf 
                  JOIN locations l1 ON sf.from_location_id = l1.location_id 
                  JOIN locations l2 ON sf.to_location_id = l2.location_id 
                  WHERE sf.schedule_id = {$schedule['schedule_id']}";
    $fareResult = $conn->query($fareQuery);

    if (!$fareResult) {
        error_log("Fare query failed for schedule_id {$schedule['schedule_id']}: " . $conn->error);
        $fares = ['error' => 'Fare data not found'];
    } else {
        $fares = [];
        while ($fareRow = $fareResult->fetch_assoc()) {
            $fareKey = strtolower($fareRow['from_name']) . '-' . strtolower($fareRow['to_name']);
            $fares[$fareKey] = number_format($fareRow['fare'], 2) . ' LKR';
        }
        if (empty($fares)) {
            $fares = ['error' => 'No fare data available for this schedule'];
        }
    }

    error_log("Fares for bus_id $bus_id: " . json_encode($fares));

    $buses[] = [
        'company' => $busRow['company'],
        'class' => $busRow['class'],
        'service' => $busRow['service'],
        'amenities' => $busRow['amenities'],
        'image' => $busRow['image'],
        'route' => [
            'direction' => 'bus',
            'start' => $firstStop ?? 'Unknown',
            'end' => $lastStop ?? 'Unknown'
        ],
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
            'typeOfSeat' => $additionalInfo['typeOfSeat'],
            'route' => $additionalInfo['route'],
            'noOfSeats' => $additionalInfo['noOfSeats'],
            'availability' => $additionalInfo['availability'],
            'routeNumber' => $additionalInfo['routeNumber'],
            'rating' => $additionalInfo['rating']
        ]
    ];
}

echo json_encode($buses);
$conn->close();
?>