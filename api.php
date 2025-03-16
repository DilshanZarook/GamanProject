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

    // Fetch stops with their stop_order to correctly determine segment positions
    $stopsQuery = "SELECT s.stop_order, s.stop_time, l.name, l.location_id 
                   FROM stops s 
                   JOIN locations l ON s.location_id = l.location_id 
                   WHERE s.schedule_id = {$schedule['schedule_id']} 
                   ORDER BY s.stop_order";
    $stopsResult = $conn->query($stopsQuery);
    $stops = [];
    $stopOrderMap = []; // Map location names to their stop order
    $locationIdMap = []; // Map location names to their location_id
    $firstStop = null;
    $lastStop = null;

    while ($stopRow = $stopsResult->fetch_assoc()) {
        $stop = [
            'name' => $stopRow['name'],
            'time' => date('h:i A', strtotime($stopRow['stop_time']))
        ];
        $stops[] = $stop;
        $stopOrderMap[$stopRow['name']] = $stopRow['stop_order'];
        $locationIdMap[$stopRow['name']] = $stopRow['location_id'];
        
        if ($firstStop === null) {
            $firstStop = $stopRow['name'];
            $firstStopOrder = $stopRow['stop_order'];
        }
        $lastStop = $stopRow['name'];
        $lastStopOrder = $stopRow['stop_order'];
    }

    // Fetch all fares for this schedule
    $allFaresQuery = "SELECT sf.stop_fare_id, sf.from_location_id, sf.to_location_id, sf.fare,
                      l1.name AS from_name, l2.name AS to_name
                      FROM stop_fares sf 
                      JOIN locations l1 ON sf.from_location_id = l1.location_id 
                      JOIN locations l2 ON sf.to_location_id = l2.location_id 
                      WHERE sf.schedule_id = {$schedule['schedule_id']}";
    $allFaresResult = $conn->query($allFaresQuery);

    if (!$allFaresResult) {
        error_log("Fare query failed for schedule_id {$schedule['schedule_id']}: " . $conn->error);
        $fares = ['error' => 'Fare data not found'];
    } else {
        $fares = [];
        while ($fareRow = $allFaresResult->fetch_assoc()) {
            $fromName = $fareRow['from_name'];
            $toName = $fareRow['to_name'];
            $fareKey = strtolower($fromName) . '-' . strtolower($toName);
            
            // Apply special fare logic for specific routes
            if ($fromName == 'Colombo' && $toName == 'Thorana Junction') {
                // Get the 4th fare from the table
                $specificFareQuery = "SELECT fare FROM stop_fares WHERE stop_fare_id = 4 AND schedule_id = {$schedule['schedule_id']}";
                $specificFareResult = $conn->query($specificFareQuery);
                if ($specificFareRow = $specificFareResult->fetch_assoc()) {
                    $fares[$fareKey] = number_format($specificFareRow['fare'], 2) . ' LKR';
                } else {
                    $fares[$fareKey] = number_format($fareRow['fare'], 2) . ' LKR'; // Fallback to original
                }
            } 
            else if ($fromName == 'Thorana Junction' && $toName == 'Kandy') {
                // Use the fare for ID 56 (60-4)
                $specificFareQuery = "SELECT fare FROM stop_fares WHERE stop_fare_id = 56 AND schedule_id = {$schedule['schedule_id']}";
                $specificFareResult = $conn->query($specificFareQuery);
                if ($specificFareRow = $specificFareResult->fetch_assoc()) {
                    $fares[$fareKey] = number_format($specificFareRow['fare'], 2) . ' LKR';
                } else {
                    // If specific fare not found, calculate it as 60-4
                    $calculatedFare = 60 - 4;
                    $fares[$fareKey] = number_format($calculatedFare, 2) . ' LKR';
                }
            }
            else {
                // Default behavior for other routes
                $fares[$fareKey] = number_format($fareRow['fare'], 2) . ' LKR';
            }
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