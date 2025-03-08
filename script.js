document.addEventListener('DOMContentLoaded', function() {
    // Sample locations (as provided)
    const locations = [
        'Colombo', 'Maligawatta', 'Kelani thissa', '4th Canal / Biyagama Road', 'Thorana Junction',
        'Kelaniya University', 'Kiribathgoda', 'Maharagama Junction', 'Kadawatha', 'Gonahena Junction',
        'Indigama Junction', 'Kirillawala', 'Trackmo Junction', 'Mudungoda', 'Miriswatta', 'Yakkala',
        'Aluthgama', 'Kalagedihena', 'Thihariya', 'Nittambuwa Sanghabodhi Maha Vidyalaya', 'Nittambuwa',
        'Kalalpitiya', 'Paswala', 'Kaju Gama', 'Radhawadunna', 'Wewel Deniya', 'Dummaladoniya', 'Warakapola',
        'Ambepussa', 'Mahena', 'Tholangamuwa', 'Gasnaawa Waththa Junction', 'Nelumdoniya', 'Batapothalla KandaUda',
        'Siyambalapitiya', 'Balla-pana Junction', 'Galigamuwa', 'Ambanpitiya', 'Rangwala Junction', 'Kegalle',
        'Meepitiya', 'Karangupona', 'Mologoda', 'Mangalgama', 'Uthuwankanda', 'Anwarama', 'Mawanella', 'Beligammana',
        'Hubula', 'Gafanethenna', 'Pahala Kadugannawa', 'Kadugannawa', 'Henachavachala (Rehela Road)', 'Pilimathalawa',
        'Ambilipitiya (Yatinuchara Sabha)', 'Kiribathkumbura', 'Peradeniya(පේරාදෙණිය)', 'Gatembe(ගැටඹේ)',
        'Mulgampola(මුල්ගම්පොල)', 'Kandy(මහනුවර)'
    ];

    // Sample bus data with 60 stops (as provided)
    const buses = [
        {
            company: 'Bigidy Travels',
            class: 'Normal',
            service: 'NTC',
            amenities: 'Non-A/C',
            image: 'images/Rathna(XL).png',
            route: { direction: 'bus', start: 'Colombo', end: 'Kandy(මහනුවර)' },
            departure: { time: '05:00 AM', date: '08 Mar 2025', location: 'Colombo' },
            arrival: { time: '09:55 AM', date: '08 Mar 2025', location: 'Kandy(මහනුවර)' },
            stops: [
                { name: 'Colombo', time: '05:00 AM' },
                { name: 'Maligawatta', time: '05:05 AM' },
                { name: 'Kelani thissa', time: '05:10 AM' },
                { name: '4th Canal / Biyagama Road', time: '05:15 AM' },
                { name: 'Thorana Junction', time: '05:20 AM' },
                { name: 'Kelaniya University', time: '05:25 AM' },
                { name: 'Kiribathgoda', time: '05:30 AM' },
                { name: 'Maharagama Junction', time: '05:35 AM' },
                { name: 'Kadawatha', time: '05:40 AM' },
                { name: 'Gonahena Junction', time: '05:45 AM' },
                { name: 'Indigama Junction', time: '05:50 AM' },
                { name: 'Kirillawala', time: '05:55 AM' },
                { name: 'Trackmo Junction', time: '06:00 AM' },
                { name: 'Mudungoda', time: '06:05 AM' },
                { name: 'Miriswatta', time: '06:10 AM' },
                { name: 'Yakkala', time: '06:15 AM' },
                { name: 'Aluthgama', time: '06:20 AM' },
                { name: 'Kalagedihena', time: '06:25 AM' },
                { name: 'Thihariya', time: '06:30 AM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '06:35 AM' },
                { name: 'Nittambuwa', time: '06:40 AM' },
                { name: 'Kalalpitiya', time: '06:45 AM' },
                { name: 'Paswala', time: '06:50 AM' },
                { name: 'Kaju Gama', time: '06:55 AM' },
                { name: 'Radhawadunna', time: '07:00 AM' },
                { name: 'Wewel Deniya', time: '07:05 AM' },
                { name: 'Dummaladoniya', time: '07:10 AM' },
                { name: 'Warakapola', time: '07:15 AM' },
                { name: 'Ambepussa', time: '07:20 AM' },
                { name: 'Mahena', time: '07:25 AM' },
                { name: 'Tholangamuwa', time: '07:30 AM' },
                { name: 'Gasnaawa Waththa Junction', time: '07:35 AM' },
                { name: 'Nelumdoniya', time: '07:40 AM' },
                { name: 'Batapothalla KandaUda', time: '07:45 AM' },
                { name: 'Siyambalapitiya', time: '07:50 AM' },
                { name: 'Balla-pana Junction', time: '07:55 AM' },
                { name: 'Galigamuwa', time: '08:00 AM' },
                { name: 'Ambanpitiya', time: '08:05 AM' },
                { name: 'Rangwala Junction', time: '08:10 AM' },
                { name: 'Kegalle', time: '08:15 AM' },
                { name: 'Meepitiya', time: '08:20 AM' },
                { name: 'Karangupona', time: '08:25 AM' },
                { name: 'Mologoda', time: '08:30 AM' },
                { name: 'Mangalgama', time: '08:35 AM' },
                { name: 'Uthuwankanda', time: '08:40 AM' },
                { name: 'Anwarama', time: '08:45 AM' },
                { name: 'Mawanella', time: '08:50 AM' },
                { name: 'Beligammana', time: '08:55 AM' },
                { name: 'Hubula', time: '09:00 AM' },
                { name: 'Gafanethenna', time: '09:05 AM' },
                { name: 'Pahala Kadugannawa', time: '09:10 AM' },
                { name: 'Kadugannawa', time: '09:15 AM' },
                { name: 'Henachavachala (Rehela Road)', time: '09:20 AM' },
                { name: 'Pilimathalawa', time: '09:25 AM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '09:30 AM' },
                { name: 'Kiribathkumbura', time: '09:35 AM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '09:40 AM' },
                { name: 'Gatembe(ගැටඹේ)', time: '09:45 AM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '09:50 AM' },
                { name: 'Kandy(මහනුවර)', time: '09:55 AM' }
            ],
            coffeeBreak: '07:10 AM',
            fare: { 'Colombo-Kandy(මහනුවර)': '350.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Adjustable',
                route: 'ExpressWay',
                noOfSeats: 51,
                availability: 20,
                routeNumber: '15/87',
                rating: 4.5
            }
        },
        {
            company: 'Golden Lion Bus',
            class: 'Luxury',
            service: 'GLB',
            amenities: 'A/C, Wi-Fi',
            image: 'images/LuxuryBus.png',
            route: { direction: 'bus', start: 'Kandy(මහනුවර)', end: 'Colombo' },
            departure: { time: '06:00 AM', date: '09 Mar 2025', location: 'Kandy(මහනුවර)' },
            arrival: { time: '10:55 AM', date: '09 Mar 2025', location: 'Colombo' },
            stops: [
                { name: 'Kandy(මහනුවර)', time: '06:00 AM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '06:05 AM' },
                { name: 'Gatembe(ගැටඹේ)', time: '06:10 AM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '06:15 AM' },
                { name: 'Kiribathkumbura', time: '06:20 AM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '06:25 AM' },
                { name: 'Pilimathalawa', time: '06:30 AM' },
                { name: 'Henachavachala (Rehela Road)', time: '06:35 AM' },
                { name: 'Kadugannawa', time: '06:40 AM' },
                { name: 'Pahala Kadugannawa', time: '06:45 AM' },
                { name: 'Gafanethenna', time: '06:50 AM' },
                { name: 'Hubula', time: '06:55 AM' },
                { name: 'Beligammana', time: '07:00 AM' },
                { name: 'Mawanella', time: '07:05 AM' },
                { name: 'Anwarama', time: '07:10 AM' },
                { name: 'Uthuwankanda', time: '07:15 AM' },
                { name: 'Mangalgama', time: '07:20 AM' },
                { name: 'Mologoda', time: '07:25 AM' },
                { name: 'Karangupona', time: '07:30 AM' },
                { name: 'Meepitiya', time: '07:35 AM' },
                { name: 'Kegalle', time: '07:40 AM' },
                { name: 'Rangwala Junction', time: '07:45 AM' },
                { name: 'Ambanpitiya', time: '07:50 AM' },
                { name: 'Galigamuwa', time: '07:55 AM' },
                { name: 'Balla-pana Junction', time: '08:00 AM' },
                { name: 'Siyambalapitiya', time: '08:05 AM' },
                { name: 'Batapothalla KandaUda', time: '08:10 AM' },
                { name: 'Nelumdoniya', time: '08:15 AM' },
                { name: 'Gasnaawa Waththa Junction', time: '08:20 AM' },
                { name: 'Tholangamuwa', time: '08:25 AM' },
                { name: 'Mahena', time: '08:30 AM' },
                { name: 'Ambepussa', time: '08:35 AM' },
                { name: 'Warakapola', time: '08:40 AM' },
                { name: 'Dummaladoniya', time: '08:45 AM' },
                { name: 'Wewel Deniya', time: '08:50 AM' },
                { name: 'Radhawadunna', time: '08:55 AM' },
                { name: 'Kaju Gama', time: '09:00 AM' },
                { name: 'Paswala', time: '09:05 AM' },
                { name: 'Kalalpitiya', time: '09:10 AM' },
                { name: 'Nittambuwa', time: '09:15 AM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '09:20 AM' },
                { name: 'Thihariya', time: '09:25 AM' },
                { name: 'Kalagedihena', time: '09:30 AM' },
                { name: 'Aluthgama', time: '09:35 AM' },
                { name: 'Yakkala', time: '09:40 AM' },
                { name: 'Miriswatta', time: '09:45 AM' },
                { name: 'Mudungoda', time: '09:50 AM' },
                { name: 'Trackmo Junction', time: '09:55 AM' },
                { name: 'Kirillawala', time: '10:00 AM' },
                { name: 'Indigama Junction', time: '10:05 AM' },
                { name: 'Gonahena Junction', time: '10:10 AM' },
                { name: 'Kadawatha', time: '10:15 AM' },
                { name: 'Maharagama Junction', time: '10:20 AM' },
                { name: 'Kiribathgoda', time: '10:25 AM' },
                { name: 'Kelaniya University', time: '10:30 AM' },
                { name: 'Thorana Junction', time: '10:35 AM' },
                { name: '4th Canal / Biyagama Road', time: '10:40 AM' },
                { name: 'Kelani thissa', time: '10:45 AM' },
                { name: 'Maligawatta', time: '10:50 AM' },
                { name: 'Colombo', time: '10:55 AM' }
            ],
            coffeeBreak: '08:45 AM',
            fare: { 'Kandy(මහනුවර)-Colombo': '450.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Reclining',
                route: 'ExpressWay',
                noOfSeats: 40,
                availability: 10,
                routeNumber: '16/91',
                rating: 4.8
            }
        },
        {
            company: 'Royal Express',
            class: 'Semi-Luxury',
            service: 'REX',
            amenities: 'A/C',
            image: 'images/SemiLuxuryBus.png',
            route: { direction: 'bus', start: 'Colombo', end: 'Kandy(මහනුවර)' },
            departure: { time: '12:00 PM', date: '08 Mar 2025', location: 'Colombo' },
            arrival: { time: '04:55 PM', date: '08 Mar 2025', location: 'Kandy(මහනුවර)' },
            stops: [
                { name: 'Colombo', time: '12:00 PM' },
                { name: 'Maligawatta', time: '12:05 PM' },
                { name: 'Kelani thissa', time: '12:10 PM' },
                { name: '4th Canal / Biyagama Road', time: '12:15 PM' },
                { name: 'Thorana Junction', time: '12:20 PM' },
                { name: 'Kelaniya University', time: '12:25 PM' },
                { name: 'Kiribathgoda', time: '12:30 PM' },
                { name: 'Maharagama Junction', time: '12:35 PM' },
                { name: 'Kadawatha', time: '12:40 PM' },
                { name: 'Gonahena Junction', time: '12:45 PM' },
                { name: 'Indigama Junction', time: '12:50 PM' },
                { name: 'Kirillawala', time: '12:55 PM' },
                { name: 'Trackmo Junction', time: '01:00 PM' },
                { name: 'Mudungoda', time: '01:05 PM' },
                { name: 'Miriswatta', time: '01:10 PM' },
                { name: 'Yakkala', time: '01:15 PM' },
                { name: 'Aluthgama', time: '01:20 PM' },
                { name: 'Kalagedihena', time: '01:25 PM' },
                { name: 'Thihariya', time: '01:30 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '01:35 PM' },
                { name: 'Nittambuwa', time: '01:40 PM' },
                { name: 'Kalalpitiya', time: '01:45 PM' },
                { name: 'Paswala', time: '01:50 PM' },
                { name: 'Kaju Gama', time: '01:55 PM' },
                { name: 'Radhawadunna', time: '02:00 PM' },
                { name: 'Wewel Deniya', time: '02:05 PM' },
                { name: 'Dummaladoniya', time: '02:10 PM' },
                { name: 'Warakapola', time: '02:15 PM' },
                { name: 'Ambepussa', time: '02:20 PM' },
                { name: 'Mahena', time: '02:25 PM' },
                { name: 'Tholangamuwa', time: '02:30 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '02:35 PM' },
                { name: 'Nelumdoniya', time: '02:40 PM' },
                { name: 'Batapothalla KandaUda', time: '02:45 PM' },
                { name: 'Siyambalapitiya', time: '02:50 PM' },
                { name: 'Balla-pana Junction', time: '02:55 PM' },
                { name: 'Galigamuwa', time: '03:00 PM' },
                { name: 'Ambanpitiya', time: '03:05 PM' },
                { name: 'Rangwala Junction', time: '03:10 PM' },
                { name: 'Kegalle', time: '03:15 PM' },
                { name: 'Meepitiya', time: '03:20 PM' },
                { name: 'Karangupona', time: '03:25 PM' },
                { name: 'Mologoda', time: '03:30 PM' },
                { name: 'Mangalgama', time: '03:35 PM' },
                { name: 'Uthuwankanda', time: '03:40 PM' },
                { name: 'Anwarama', time: '03:45 PM' },
                { name: 'Mawanella', time: '03:50 PM' },
                { name: 'Beligammana', time: '03:55 PM' },
                { name: 'Hubula', time: '04:00 PM' },
                { name: 'Gafanethenna', time: '04:05 PM' },
                { name: 'Pahala Kadugannawa', time: '04:10 PM' },
                { name: 'Kadugannawa', time: '04:15 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '04:20 PM' },
                { name: 'Pilimathalawa', time: '04:25 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '04:30 PM' },
                { name: 'Kiribathkumbura', time: '04:35 PM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '04:40 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '04:45 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '04:50 PM' },
                { name: 'Kandy(මහනුවර)', time: '04:55 PM' }
            ],
            coffeeBreak: '02:10 PM',
            fare: { 'Colombo-Kandy(මහනුවර)': '400.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Reclining',
                route: 'ExpressWay',
                noOfSeats: 45,
                availability: 12,
                routeNumber: '17/92',
                rating: 4.7
            }
        },
        {
            company: 'Swift Trans',
            class: 'Normal',
            service: 'STC',
            amenities: 'Non-A/C',
            image: 'images/SwiftBus.png',
            route: { direction: 'bus', start: 'Kandy(මහනුවර)', end: 'Colombo' },
            departure: { time: '02:00 PM', date: '10 Mar 2025', location: 'Kandy(මහනුවර)' },
            arrival: { time: '06:55 PM', date: '10 Mar 2025', location: 'Colombo' },
            stops: [
                { name: 'Kandy(මහනුවර)', time: '02:00 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '02:05 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '02:10 PM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '02:15 PM' },
                { name: 'Kiribathkumbura', time: '02:20 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '02:25 PM' },
                { name: 'Pilimathalawa', time: '02:30 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '02:35 PM' },
                { name: 'Kadugannawa', time: '02:40 PM' },
                { name: 'Pahala Kadugannawa', time: '02:45 PM' },
                { name: 'Gafanethenna', time: '02:50 PM' },
                { name: 'Hubula', time: '02:55 PM' },
                { name: 'Beligammana', time: '03:00 PM' },
                { name: 'Mawanella', time: '03:05 PM' },
                { name: 'Anwarama', time: '03:10 PM' },
                { name: 'Uthuwankanda', time: '03:15 PM' },
                { name: 'Mangalgama', time: '03:20 PM' },
                { name: 'Mologoda', time: '03:25 PM' },
                { name: 'Karangupona', time: '03:30 PM' },
                { name: 'Meepitiya', time: '03:35 PM' },
                { name: 'Kegalle', time: '03:40 PM' },
                { name: 'Rangwala Junction', time: '03:45 PM' },
                { name: 'Ambanpitiya', time: '03:50 PM' },
                { name: 'Galigamuwa', time: '03:55 PM' },
                { name: 'Balla-pana Junction', time: '04:00 PM' },
                { name: 'Siyambalapitiya', time: '04:05 PM' },
                { name: 'Batapothalla KandaUda', time: '04:10 PM' },
                { name: 'Nelumdoniya', time: '04:15 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '04:20 PM' },
                { name: 'Tholangamuwa', time: '04:25 PM' },
                { name: 'Mahena', time: '04:30 PM' },
                { name: 'Ambepussa', time: '04:35 PM' },
                { name: 'Warakapola', time: '04:40 PM' },
                { name: 'Dummaladoniya', time: '04:45 PM' },
                { name: 'Wewel Deniya', time: '04:50 PM' },
                { name: 'Radhawadunna', time: '04:55 PM' },
                { name: 'Kaju Gama', time: '05:00 PM' },
                { name: 'Paswala', time: '05:05 PM' },
                { name: 'Kalalpitiya', time: '05:10 PM' },
                { name: 'Nittambuwa', time: '05:15 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '05:20 PM' },
                { name: 'Thihariya', time: '05:25 PM' },
                { name: 'Kalagedihena', time: '05:30 PM' },
                { name: 'Aluthgama', time: '05:35 PM' },
                { name: 'Yakkala', time: '05:40 PM' },
                { name: 'Miriswatta', time: '05:45 PM' },
                { name: 'Mudungoda', time: '05:50 PM' },
                { name: 'Trackmo Junction', time: '05:55 PM' },
                { name: 'Kirillawala', time: '06:00 PM' },
                { name: 'Indigama Junction', time: '06:05 PM' },
                { name: 'Gonahena Junction', time: '06:10 PM' },
                { name: 'Kadawatha', time: '06:15 PM' },
                { name: 'Maharagama Junction', time: '06:20 PM' },
                { name: 'Kiribathgoda', time: '06:25 PM' },
                { name: 'Kelaniya University', time: '06:30 PM' },
                { name: 'Thorana Junction', time: '06:35 PM' },
                { name: '4th Canal / Biyagama Road', time: '06:40 PM' },
                { name: 'Kelani thissa', time: '06:45 PM' },
                { name: 'Maligawatta', time: '06:50 PM' },
                { name: 'Colombo', time: '06:55 PM' }
            ],
            coffeeBreak: '04:45 PM',
            fare: { 'Kandy(මහනුවර)-Colombo': '350.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Adjustable',
                route: 'ExpressWay',
                noOfSeats: 50,
                availability: 18,
                routeNumber: '18/93',
                rating: 4.4
            }
        },
        {
            company: 'Green Line',
            class: 'Luxury',
            service: 'GLN',
            amenities: 'A/C, Snacks',
            image: 'images/LuxuryBus2.png',
            route: { direction: 'bus', start: 'Colombo', end: 'Kandy(මහනුවර)' },
            departure: { time: '07:00 PM', date: '09 Mar 2025', location: 'Colombo' },
            arrival: { time: '11:55 PM', date: '09 Mar 2025', location: 'Kandy(මහනුවර)' },
            stops: [
                { name: 'Colombo', time: '07:00 PM' },
                { name: 'Maligawatta', time: '07:05 PM' },
                { name: 'Kelani thissa', time: '07:10 PM' },
                { name: '4th Canal / Biyagama Road', time: '07:15 PM' },
                { name: 'Thorana Junction', time: '07:20 PM' },
                { name: 'Kelaniya University', time: '07:25 PM' },
                { name: 'Kiribathgoda', time: '07:30 PM' },
                { name: 'Maharagama Junction', time: '07:35 PM' },
                { name: 'Kadawatha', time: '07:40 PM' },
                { name: 'Gonahena Junction', time: '07:45 PM' },
                { name: 'Indigama Junction', time: '07:50 PM' },
                { name: 'Kirillawala', time: '07:55 PM' },
                { name: 'Trackmo Junction', time: '08:00 PM' },
                { name: 'Mudungoda', time: '08:05 PM' },
                { name: 'Miriswatta', time: '08:10 PM' },
                { name: 'Yakkala', time: '08:15 PM' },
                { name: 'Aluthgama', time: '08:20 PM' },
                { name: 'Kalagedihena', time: '08:25 PM' },
                { name: 'Thihariya', time: '08:30 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '08:35 PM' },
                { name: 'Nittambuwa', time: '08:40 PM' },
                { name: 'Kalalpitiya', time: '08:45 PM' },
                { name: 'Paswala', time: '08:50 PM' },
                { name: 'Kaju Gama', time: '08:55 PM' },
                { name: 'Radhawadunna', time: '09:00 PM' },
                { name: 'Wewel Deniya', time: '09:05 PM' },
                { name: 'Dummaladoniya', time: '09:10 PM' },
                { name: 'Warakapola', time: '09:15 PM' },
                { name: 'Ambepussa', time: '09:20 PM' },
                { name: 'Mahena', time: '09:25 PM' },
                { name: 'Tholangamuwa', time: '09:30 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '09:35 PM' },
                { name: 'Nelumdoniya', time: '09:40 PM' },
                { name: 'Batapothalla KandaUda', time: '09:45 PM' },
                { name: 'Siyambalapitiya', time: '09:50 PM' },
                { name: 'Balla-pana Junction', time: '09:55 PM' },
                { name: 'Galigamuwa', time: '10:00 PM' },
                { name: 'Ambanpitiya', time: '10:05 PM' },
                { name: 'Rangwala Junction', time: '10:10 PM' },
                { name: 'Kegalle', time: '10:15 PM' },
                { name: 'Meepitiya', time: '10:20 PM' },
                { name: 'Karangupona', time: '10:25 PM' },
                { name: 'Mologoda', time: '10:30 PM' },
                { name: 'Mangalgama', time: '10:35 PM' },
                { name: 'Uthuwankanda', time: '10:40 PM' },
                { name: 'Anwarama', time: '10:45 PM' },
                { name: 'Mawanella', time: '10:50 PM' },
                { name: 'Beligammana', time: '10:55 PM' },
                { name: 'Hubula', time: '11:00 PM' },
                { name: 'Gafanethenna', time: '11:05 PM' },
                { name: 'Pahala Kadugannawa', time: '11:10 PM' },
                { name: 'Kadugannawa', time: '11:15 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '11:20 PM' },
                { name: 'Pilimathalawa', time: '11:25 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '11:30 PM' },
                { name: 'Kiribathkumbura', time: '11:35 PM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '11:40 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '11:45 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '11:50 PM' },
                { name: 'Kandy(මහනුවර)', time: '11:55 PM' }
            ],
            coffeeBreak: '09:10 PM',
            fare: { 'Colombo-Kandy(මහනුවර)': '450.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Reclining',
                route: 'ExpressWay',
                noOfSeats: 38,
                availability: 8,
                routeNumber: '19/94',
                rating: 4.9
            }
        },
        {
            company: 'City Link',
            class: 'Semi-Luxury',
            service: 'CLK',
            amenities: 'A/C',
            image: 'images/SemiLuxuryBus2.png',
            route: { direction: 'bus', start: 'Kandy(මහනුවර)', end: 'Colombo' },
            departure: { time: '09:00 AM', date: '11 Mar 2025', location: 'Kandy(මහනුවර)' },
            arrival: { time: '01:55 PM', date: '11 Mar 2025', location: 'Colombo' },
            stops: [
                { name: 'Kandy(මහනුවර)', time: '09:00 AM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '09:05 AM' },
                { name: 'Gatembe(ගැටඹේ)', time: '09:10 AM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '09:15 AM' },
                { name: 'Kiribathkumbura', time: '09:20 AM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '09:25 AM' },
                { name: 'Pilimathalawa', time: '09:30 AM' },
                { name: 'Henachavachala (Rehela Road)', time: '09:35 AM' },
                { name: 'Kadugannawa', time: '09:40 AM' },
                { name: 'Pahala Kadugannawa', time: '09:45 AM' },
                { name: 'Gafanethenna', time: '09:50 AM' },
                { name: 'Hubula', time: '09:55 AM' },
                { name: 'Beligammana', time: '10:00 AM' },
                { name: 'Mawanella', time: '10:05 AM' },
                { name: 'Anwarama', time: '10:10 AM' },
                { name: 'Uthuwankanda', time: '10:15 AM' },
                { name: 'Mangalgama', time: '10:20 AM' },
                { name: 'Mologoda', time: '10:25 AM' },
                { name: 'Karangupona', time: '10:30 AM' },
                { name: 'Meepitiya', time: '10:35 AM' },
                { name: 'Kegalle', time: '10:40 AM' },
                { name: 'Rangwala Junction', time: '10:45 AM' },
                { name: 'Ambanpitiya', time: '10:50 AM' },
                { name: 'Galigamuwa', time: '10:55 AM' },
                { name: 'Balla-pana Junction', time: '11:00 AM' },
                { name: 'Siyambalapitiya', time: '11:05 AM' },
                { name: 'Batapothalla KandaUda', time: '11:10 AM' },
                { name: 'Nelumdoniya', time: '11:15 AM' },
                { name: 'Gasnaawa Waththa Junction', time: '11:20 AM' },
                { name: 'Tholangamuwa', time: '11:25 AM' },
                { name: 'Mahena', time: '11:30 AM' },
                { name: 'Ambepussa', time: '11:35 AM' },
                { name: 'Warakapola', time: '11:40 AM' },
                { name: 'Dummaladoniya', time: '11:45 AM' },
                { name: 'Wewel Deniya', time: '11:50 AM' },
                { name: 'Radhawadunna', time: '11:55 AM' },
                { name: 'Kaju Gama', time: '12:00 PM' },
                { name: 'Paswala', time: '12:05 PM' },
                { name: 'Kalalpitiya', time: '12:10 PM' },
                { name: 'Nittambuwa', time: '12:15 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '12:20 PM' },
                { name: 'Thihariya', time: '12:25 PM' },
                { name: 'Kalagedihena', time: '12:30 PM' },
                { name: 'Aluthgama', time: '12:35 PM' },
                { name: 'Yakkala', time: '12:40 PM' },
                { name: 'Miriswatta', time: '12:45 PM' },
                { name: 'Mudungoda', time: '12:50 PM' },
                { name: 'Trackmo Junction', time: '12:55 PM' },
                { name: 'Kirillawala', time: '01:00 PM' },
                { name: 'Indigama Junction', time: '01:05 PM' },
                { name: 'Gonahena Junction', time: '01:10 PM' },
                { name: 'Kadawatha', time: '01:15 PM' },
                { name: 'Maharagama Junction', time: '01:20 PM' },
                { name: 'Kiribathgoda', time: '01:25 PM' },
                { name: 'Kelaniya University', time: '01:30 PM' },
                { name: 'Thorana Junction', time: '01:35 PM' },
                { name: '4th Canal / Biyagama Road', time: '01:40 PM' },
                { name: 'Kelani thissa', time: '01:45 PM' },
                { name: 'Maligawatta', time: '01:50 PM' },
                { name: 'Colombo', time: '01:55 PM' }
            ],
            coffeeBreak: '11:45 AM',
            fare: { 'Kandy(මහනුවර)-Colombo': '400.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Reclining',
                route: 'ExpressWay',
                noOfSeats: 42,
                availability: 15,
                routeNumber: '20/95',
                rating: 4.6
            }
        },
        {
            company: 'Blue Horizon',
            class: 'Normal',
            service: 'BHC',
            amenities: 'Non-A/C',
            image: 'images/BlueBus.png',
            route: { direction: 'bus', start: 'Colombo', end: 'Kandy(මහනුවර)' },
            departure: { time: '03:00 AM', date: '10 Mar 2025', location: 'Colombo' },
            arrival: { time: '07:55 AM', date: '10 Mar 2025', location: 'Kandy(මහනුවර)' },
            stops: [
                { name: 'Colombo', time: '03:00 AM' },
                { name: 'Maligawatta', time: '03:05 AM' },
                { name: 'Kelani thissa', time: '03:10 AM' },
                { name: '4th Canal / Biyagama Road', time: '03:15 AM' },
                { name: 'Thorana Junction', time: '03:20 AM' },
                { name: 'Kelaniya University', time: '03:25 AM' },
                { name: 'Kiribathgoda', time: '03:30 AM' },
                { name: 'Maharagama Junction', time: '03:35 AM' },
                { name: 'Kadawatha', time: '03:40 AM' },
                { name: 'Gonahena Junction', time: '03:45 AM' },
                { name: 'Indigama Junction', time: '03:50 AM' },
                { name: 'Kirillawala', time: '03:55 AM' },
                { name: 'Trackmo Junction', time: '04:00 AM' },
                { name: 'Mudungoda', time: '04:05 AM' },
                { name: 'Miriswatta', time: '04:10 AM' },
                { name: 'Yakkala', time: '04:15 AM' },
                { name: 'Aluthgama', time: '04:20 AM' },
                { name: 'Kalagedihena', time: '04:25 AM' },
                { name: 'Thihariya', time: '04:30 AM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '04:35 AM' },
                { name: 'Nittambuwa', time: '04:40 AM' },
                { name: 'Kalalpitiya', time: '04:45 AM' },
                { name: 'Paswala', time: '04:50 AM' },
                { name: 'Kaju Gama', time: '04:55 AM' },
                { name: 'Radhawadunna', time: '05:00 AM' },
                { name: 'Wewel Deniya', time: '05:05 AM' },
                { name: 'Dummaladoniya', time: '05:10 AM' },
                { name: 'Warakapola', time: '05:15 AM' },
                { name: 'Ambepussa', time: '05:20 AM' },
                { name: 'Mahena', time: '05:25 AM' },
                { name: 'Tholangamuwa', time: '05:30 AM' },
                { name: 'Gasnaawa Waththa Junction', time: '05:35 AM' },
                { name: 'Nelumdoniya', time: '05:40 AM' },
                { name: 'Batapothalla KandaUda', time: '05:45 AM' },
                { name: 'Siyambalapitiya', time: '05:50 AM' },
                { name: 'Balla-pana Junction', time: '05:55 AM' },
                { name: 'Galigamuwa', time: '06:00 AM' },
                { name: 'Ambanpitiya', time: '06:05 AM' },
                { name: 'Rangwala Junction', time: '06:10 AM' },
                { name: 'Kegalle', time: '06:15 AM' },
                { name: 'Meepitiya', time: '06:20 AM' },
                { name: 'Karangupona', time: '06:25 AM' },
                { name: 'Mologoda', time: '06:30 AM' },
                { name: 'Mangalgama', time: '06:35 AM' },
                { name: 'Uthuwankanda', time: '06:40 AM' },
                { name: 'Anwarama', time: '06:45 AM' },
                { name: 'Mawanella', time: '06:50 AM' },
                { name: 'Beligammana', time: '06:55 AM' },
                { name: 'Hubula', time: '07:00 AM' },
                { name: 'Gafanethenna', time: '07:05 AM' },
                { name: 'Pahala Kadugannawa', time: '07:10 AM' },
                { name: 'Kadugannawa', time: '07:15 AM' },
                { name: 'Henachavachala (Rehela Road)', time: '07:20 AM' },
                { name: 'Pilimathalawa', time: '07:25 AM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '07:30 AM' },
                { name: 'Kiribathkumbura', time: '07:35 AM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '07:40 AM' },
                { name: 'Gatembe(ගැටඹේ)', time: '07:45 AM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '07:50 AM' },
                { name: 'Kandy(මහනුවර)', time: '07:55 AM' }
            ],
            coffeeBreak: '05:10 AM',
            fare: { 'Colombo-Kandy(මහනුවර)': '300.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Fixed',
                route: 'ExpressWay',
                noOfSeats: 55,
                availability: 25,
                routeNumber: '21/96',
                rating: 4.3
            }
        },
        {
            company: 'Peak Riders',
            class: 'Semi-Luxury',
            service: 'PRD',
            amenities: 'A/C',
            image: 'images/SemiLuxuryBus3.png',
            route: { direction: 'bus', start: 'Kandy(මහනුවර)', end: 'Colombo' },
            departure: { time: '04:00 PM', date: '11 Mar 2025', location: 'Kandy(මහනුවර)' },
            arrival: { time: '08:55 PM', date: '11 Mar 2025', location: 'Colombo' },
            stops: [
                { name: 'Kandy(මහනුවර)', time: '04:00 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '04:05 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '04:10 PM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '04:15 PM' },
                { name: 'Kiribathkumbura', time: '04:20 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '04:25 PM' },
                { name: 'Pilimathalawa', time: '04:30 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '04:35 PM' },
                { name: 'Kadugannawa', time: '04:40 PM' },
                { name: 'Pahala Kadugannawa', time: '04:45 PM' },
                { name: 'Gafanethenna', time: '04:50 PM' },
                { name: 'Hubula', time: '04:55 PM' },
                { name: 'Beligammana', time: '05:00 PM' },
                { name: 'Mawanella', time: '05:05 PM' },
                { name: 'Anwarama', time: '05:10 PM' },
                { name: 'Uthuwankanda', time: '05:15 PM' },
                { name: 'Mangalgama', time: '05:20 PM' },
                { name: 'Mologoda', time: '05:25 PM' },
                { name: 'Karangupona', time: '05:30 PM' },
                { name: 'Meepitiya', time: '05:35 PM' },
                { name: 'Kegalle', time: '05:40 PM' },
                { name: 'Rangwala Junction', time: '05:45 PM' },
                { name: 'Ambanpitiya', time: '05:50 PM' },
                { name: 'Galigamuwa', time: '05:55 PM' },
                { name: 'Balla-pana Junction', time: '06:00 PM' },
                { name: 'Siyambalapitiya', time: '06:05 PM' },
                { name: 'Batapothalla KandaUda', time: '06:10 PM' },
                { name: 'Nelumdoniya', time: '06:15 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '06:20 PM' },
                { name: 'Tholangamuwa', time: '06:25 PM' },
                { name: 'Mahena', time: '06:30 PM' },
                { name: 'Ambepussa', time: '06:35 PM' },
                { name: 'Warakapola', time: '06:40 PM' },
                { name: 'Dummaladoniya', time: '06:45 PM' },
                { name: 'Wewel Deniya', time: '06:50 PM' },
                { name: 'Radhawadunna', time: '06:55 PM' },
                { name: 'Kaju Gama', time: '07:00 PM' },
                { name: 'Paswala', time: '07:05 PM' },
                { name: 'Kalalpitiya', time: '07:10 PM' },
                { name: 'Nittambuwa', time: '07:15 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '07:20 PM' },
                { name: 'Thihariya', time: '07:25 PM' },
                { name: 'Kalagedihena', time: '07:30 PM' },
                { name: 'Aluthgama', time: '07:35 PM' },
                { name: 'Yakkala', time: '07:40 PM' },
                { name: 'Miriswatta', time: '07:45 PM' },
                { name: 'Mudungoda', time: '07:50 PM' },
                { name: 'Trackmo Junction', time: '07:55 PM' },
                { name: 'Kirillawala', time: '08:00 PM' },
                { name: 'Indigama Junction', time: '08:05 PM' },
                { name: 'Gonahena Junction', time: '08:10 PM' },
                { name: 'Kadawatha', time: '08:15 PM' },
                { name: 'Maharagama Junction', time: '08:20 PM' },
                { name: 'Kiribathgoda', time: '08:25 PM' },
                { name: 'Kelaniya University', time: '08:30 PM' },
                { name: 'Thorana Junction', time: '08:35 PM' },
                { name: '4th Canal / Biyagama Road', time: '08:40 PM' },
                { name: 'Kelani thissa', time: '08:45 PM' },
                { name: 'Maligawatta', time: '08:50 PM' },
                { name: 'Colombo', time: '08:55 PM' }
            ],
            coffeeBreak: '06:45 PM',
            fare: { 'Kandy(මහනුවර)-Colombo': '400.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Reclining',
                route: 'ExpressWay',
                noOfSeats: 48,
                availability: 14,
                routeNumber: '22/97',
                rating: 4.5
            }
        },
        {
            company: 'Silver Star',
            class: 'Luxury',
            service: 'SSC',
            amenities: 'A/C, Wi-Fi, Snacks',
            image: 'images/LuxuryBus3.png',
            route: { direction: 'bus', start: 'Colombo', end: 'Kandy(මහනුවර)' },
            departure: { time: '10:00 AM', date: '12 Mar 2025', location: 'Colombo' },
            arrival: { time: '02:55 PM', date: '12 Mar 2025', location: 'Kandy(මහනුවර)' },
            stops: [
                { name: 'Colombo', time: '10:00 AM' },
                { name: 'Maligawatta', time: '10:05 AM' },
                { name: 'Kelani thissa', time: '10:10 AM' },
                { name: '4th Canal / Biyagama Road', time: '10:15 AM' },
                { name: 'Thorana Junction', time: '10:20 AM' },
                { name: 'Kelaniya University', time: '10:25 AM' },
                { name: 'Kiribathgoda', time: '10:30 AM' },
                { name: 'Maharagama Junction', time: '10:35 AM' },
                { name: 'Kadawatha', time: '10:40 AM' },
                { name: 'Gonahena Junction', time: '10:45 AM' },
                { name: 'Indigama Junction', time: '10:50 AM' },
                { name: 'Kirillawala', time: '10:55 AM' },
                { name: 'Trackmo Junction', time: '11:00 AM' },
                { name: 'Mudungoda', time: '11:05 AM' },
                { name: 'Miriswatta', time: '11:10 AM' },
                { name: 'Yakkala', time: '11:15 AM' },
                { name: 'Aluthgama', time: '11:20 AM' },
                { name: 'Kalagedihena', time: '11:25 AM' },
                { name: 'Thihariya', time: '11:30 AM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '11:35 AM' },
                { name: 'Nittambuwa', time: '11:40 AM' },
                { name: 'Kalalpitiya', time: '11:45 AM' },
                { name: 'Paswala', time: '11:50 AM' },
                { name: 'Kaju Gama', time: '11:55 AM' },
                { name: 'Radhawadunna', time: '12:00 PM' },
                { name: 'Wewel Deniya', time: '12:05 PM' },
                { name: 'Dummaladoniya', time: '12:10 PM' },
                { name: 'Warakapola', time: '12:15 PM' },
                { name: 'Ambepussa', time: '12:20 PM' },
                { name: 'Mahena', time: '12:25 PM' },
                { name: 'Tholangamuwa', time: '12:30 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '12:35 PM' },
                { name: 'Nelumdoniya', time: '12:40 PM' },
                { name: 'Batapothalla KandaUda', time: '12:45 PM' },
                { name: 'Siyambalapitiya', time: '12:50 PM' },
                { name: 'Balla-pana Junction', time: '12:55 PM' },
                { name: 'Galigamuwa', time: '01:00 PM' },
                { name: 'Ambanpitiya', time: '01:05 PM' },
                { name: 'Rangwala Junction', time: '01:10 PM' },
                { name: 'Kegalle', time: '01:15 PM' },
                { name: 'Meepitiya', time: '01:20 PM' },
                { name: 'Karangupona', time: '01:25 PM' },
                { name: 'Mologoda', time: '01:30 PM' },
                { name: 'Mangalgama', time: '01:35 PM' },
                { name: 'Uthuwankanda', time: '01:40 PM' },
                { name: 'Anwarama', time: '01:45 PM' },
                { name: 'Mawanella', time: '01:50 PM' },
                { name: 'Beligammana', time: '01:55 PM' },
                { name: 'Hubula', time: '02:00 PM' },
                { name: 'Gafanethenna', time: '02:05 PM' },
                { name: 'Pahala Kadugannawa', time: '02:10 PM' },
                { name: 'Kadugannawa', time: '02:15 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '02:20 PM' },
                { name: 'Pilimathalawa', time: '02:25 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '02:30 PM' },
                { name: 'Kiribathkumbura', time: '02:35 PM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '02:40 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '02:45 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '02:50 PM' },
                { name: 'Kandy(මහනුවර)', time: '02:55 PM' }
            ],
            coffeeBreak: '12:10 PM',
            fare: { 'Colombo-Kandy(මහනුවර)': '450.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Reclining',
                route: 'ExpressWay',
                noOfSeats: 36,
                availability: 6,
                routeNumber: '23/98',
                rating: 4.8
            }
        },
        {
            company: 'Red Eagle',
            class: 'Normal',
            service: 'REC',
            amenities: 'Non-A/C',
            image: 'images/RedBus.png',
            route: { direction: 'bus', start: 'Kandy(මහනුවර)', end: 'Colombo' },
            departure: { time: '08:00 PM', date: '12 Mar 2025', location: 'Kandy(මහනුවර)' },
            arrival: { time: '12:55 AM', date: '13 Mar 2025', location: 'Colombo' },
            stops: [
                { name: 'Kandy(මහනුවර)', time: '08:00 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '08:05 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '08:10 PM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '08:15 PM' },
                { name: 'Kiribathkumbura', time: '08:20 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '08:25 PM' },
                { name: 'Pilimathalawa', time: '08:30 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '08:35 PM' },
                { name: 'Kadugannawa', time: '08:40 PM' },
                { name: 'Pahala Kadugannawa', time: '08:45 PM' },
                { name: 'Gafanethenna', time: '08:50 PM' },
                { name: 'Hubula', time: '08:55 PM' },
                { name: 'Beligammana', time: '09:00 PM' },
                { name: 'Mawanella', time: '09:05 PM' },
                { name: 'Anwarama', time: '09:10 PM' },
                { name: 'Uthuwankanda', time: '09:15 PM' },
                { name: 'Mangalgama', time: '09:20 PM' },
                { name: 'Mologoda', time: '09:25 PM' },
                { name: 'Karangupona', time: '09:30 PM' },
                { name: 'Meepitiya', time: '09:35 PM' },
                { name: 'Kegalle', time: '09:40 PM' },
                { name: 'Rangwala Junction', time: '09:45 PM' },
                { name: 'Ambanpitiya', time: '09:50 PM' },
                { name: 'Galigamuwa', time: '09:55 PM' },
                { name: 'Balla-pana Junction', time: '10:00 PM' },
                { name: 'Siyambalapitiya', time: '10:05 PM' },
                { name: 'Batapothalla KandaUda', time: '10:10 PM' },
                { name: 'Nelumdoniya', time: '10:15 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '10:20 PM' },
                { name: 'Tholangamuwa', time: '10:25 PM' },
                { name: 'Mahena', time: '10:30 PM' },
                { name: 'Ambepussa', time: '10:35 PM' },
                { name: 'Warakapola', time: '10:40 PM' },
                { name: 'Dummaladoniya', time: '10:45 PM' },
                { name: 'Wewel Deniya', time: '10:50 PM' },
                { name: 'Radhawadunna', time: '10:55 PM' },
                { name: 'Kaju Gama', time: '11:00 PM' },
                { name: 'Paswala', time: '11:05 PM' },
                { name: 'Kalalpitiya', time: '11:10 PM' },
                { name: 'Nittambuwa', time: '11:15 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '11:20 PM' },
                { name: 'Thihariya', time: '11:25 PM' },
                { name: 'Kalagedihena', time: '11:30 PM' },
                { name: 'Aluthgama', time: '11:35 PM' },
                { name: 'Yakkala', time: '11:40 PM' },
                { name: 'Miriswatta', time: '11:45 PM' },
                { name: 'Mudungoda', time: '11:50 PM' },
                { name: 'Trackmo Junction', time: '11:55 PM' },
                { name: 'Kirillawala', time: '12:00 AM' },
                { name: 'Indigama Junction', time: '12:05 AM' },
                { name: 'Gonahena Junction', time: '12:10 AM' },
                { name: 'Kadawatha', time: '12:15 AM' },
                { name: 'Maharagama Junction', time: '12:20 AM' },
                { name: 'Kiribathgoda', time: '12:25 AM' },
                { name: 'Kelaniya University', time: '12:30 AM' },
                { name: 'Thorana Junction', time: '12:35 AM' },
                { name: '4th Canal / Biyagama Road', time: '12:40 AM' },
                { name: 'Kelani thissa', time: '12:45 AM' },
                { name: 'Maligawatta', time: '12:50 AM' },
                { name: 'Colombo', time: '12:55 AM' }
            ],
            coffeeBreak: '10:45 PM',
            fare: { 'Kandy(මහනුවර)-Colombo': '300.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Fixed',
                route: 'ExpressWay',
                noOfSeats: 52,
                availability: 22,
                routeNumber: '24/99',
                rating: 4.2
            }
        },
        {
            company: 'Diamond Coach',
            class: 'Luxury',
            service: 'DMC',
            amenities: 'A/C, Wi-Fi',
            image: 'images/LuxuryBus4.png',
            route: { direction: 'bus', start: 'Colombo', end: 'Kandy(මහනුවර)' },
            departure: { time: '01:00 PM', date: '08 Mar 2025', location: 'Colombo' },
            arrival: { time: '05:55 PM', date: '08 Mar 2025', location: 'Kandy(මහනුවර)' },
            stops: [
                { name: 'Colombo', time: '01:00 PM' },
                { name: 'Maligawatta', time: '01:05 PM' },
                { name: 'Kelani thissa', time: '01:10 PM' },
                { name: '4th Canal / Biyagama Road', time: '01:15 PM' },
                { name: 'Thorana Junction', time: '01:20 PM' },
                { name: 'Kelaniya University', time: '01:25 PM' },
                { name: 'Kiribathgoda', time: '01:30 PM' },
                { name: 'Maharagama Junction', time: '01:35 PM' },
                { name: 'Kadawatha', time: '01:40 PM' },
                { name: 'Gonahena Junction', time: '01:45 PM' },
                { name: 'Indigama Junction', time: '01:50 PM' },
                { name: 'Kirillawala', time: '01:55 PM' },
                { name: 'Trackmo Junction', time: '02:00 PM' },
                { name: 'Mudungoda', time: '02:05 PM' },
                { name: 'Miriswatta', time: '02:10 PM' },
                { name: 'Yakkala', time: '02:15 PM' },
                { name: 'Aluthgama', time: '02:20 PM' },
                { name: 'Kalagedihena', time: '02:25 PM' },
                { name: 'Thihariya', time: '02:30 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '02:35 PM' },
                { name: 'Nittambuwa', time: '02:40 PM' },
                { name: 'Kalalpitiya', time: '02:45 PM' },
                { name: 'Paswala', time: '02:50 PM' },
                { name: 'Kaju Gama', time: '02:55 PM' },
                { name: 'Radhawadunna', time: '03:00 PM' },
                { name: 'Wewel Deniya', time: '03:05 PM' },
                { name: 'Dummaladoniya', time: '03:10 PM' },
                { name: 'Warakapola', time: '03:15 PM' },
                { name: 'Ambepussa', time: '03:20 PM' },
                { name: 'Mahena', time: '03:25 PM' },
                { name: 'Tholangamuwa', time: '03:30 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '03:35 PM' },
                { name: 'Nelumdoniya', time: '03:40 PM' },
                { name: 'Batapothalla KandaUda', time: '03:45 PM' },
                { name: 'Siyambalapitiya', time: '03:50 PM' },
                { name: 'Balla-pana Junction', time: '03:55 PM' },
                { name: 'Galigamuwa', time: '04:00 PM' },
                { name: 'Ambanpitiya', time: '04:05 PM' },
                { name: 'Rangwala Junction', time: '04:10 PM' },
                { name: 'Kegalle', time: '04:15 PM' },
                { name: 'Meepitiya', time: '04:20 PM' },
                { name: 'Karangupona', time: '04:25 PM' },
                { name: 'Mologoda', time: '04:30 PM' },
                { name: 'Mangalgama', time: '04:35 PM' },
                { name: 'Uthuwankanda', time: '04:40 PM' },
                { name: 'Anwarama', time: '04:45 PM' },
                { name: 'Mawanella', time: '04:50 PM' },
                { name: 'Beligammana', time: '04:55 PM' },
                { name: 'Hubula', time: '05:00 PM' },
                { name: 'Gafanethenna', time: '05:05 PM' },
                { name: 'Pahala Kadugannawa', time: '05:10 PM' },
                { name: 'Kadugannawa', time: '05:15 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '05:20 PM' },
                { name: 'Pilimathalawa', time: '05:25 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '05:30 PM' },
                { name: 'Kiribathkumbura', time: '05:35 PM' },
                { name: 'Peradeniya(පේරාදෙණිය)', time: '05:40 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '05:45 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '05:50 PM' },
                { name: 'Kandy(මහනුවර)', time: '05:55 PM' }
            ],
            coffeeBreak: '03:10 PM',
            fare: { 'Colombo-Kandy(මහනුවර)': '450.00 LKR' },
            additionalInfo: {
                typeOfSeat: 'Reclining',
                route: 'ExpressWay',
                noOfSeats: 35,
                availability: 5,
                routeNumber: '25/100',
                rating: 4.7
            }
        }
    ];

    // DOM Elements
    const fromLocation = document.getElementById('from-location');
    const fromAutocomplete = document.getElementById('from-autocomplete');
    const toLocation = document.getElementById('to-location');
    const toAutocomplete = document.getElementById('to-autocomplete');
    const travelDate = document.getElementById('travel-date');
    const travelTime = document.getElementById('travel-time');
    const searchResults = document.getElementById('search-results');
    const classOptions = document.querySelectorAll('.class-option');
    const modeOptions = document.querySelectorAll('.mode-option');
    const additionalSearchBtn = document.getElementById('additional-search-btn');
    const advancedMenu = document.getElementById('advanced-menu');
    const searchButton = document.getElementById('search-button');
    const directionArrow = document.querySelector('.direction-arrow');

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    travelDate.value = today;

    // Class and Mode selection
let selectedClass = null;
let selectedMode = 'bus'; // Default to 'bus' since it's active by default

classOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Check if the clicked option is already selected
        const isSelected = this.classList.contains('selected');
        
        // Remove 'selected' from all options
        classOptions.forEach(opt => opt.classList.remove('selected'));
        
        if (!isSelected) {
            // If not selected, select the clicked option
            this.classList.add('selected');
            selectedClass = this.getAttribute('data-class');
        } else {
            // If already selected, deselect it
            selectedClass = null;
        }
        
        console.log('Selected Class:', selectedClass);
        performSearch();
    });
});

modeOptions.forEach(option => {
    option.addEventListener('click', function() {
        modeOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        selectedMode = this.getAttribute('data-mode');
        console.log('Selected Mode:', selectedMode);
        performSearch();
    });
});

// Toggle advanced menu via Additional Search button
additionalSearchBtn.addEventListener('click', function() {
    const isActive = advancedMenu.classList.toggle('active');
    this.classList.toggle('active');
    if (isActive) {
        advancedMenu.style.maxHeight = `${advancedMenu.scrollHeight}px`;
    } else {
        advancedMenu.style.maxHeight = '0';
    }
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!advancedMenu.contains(e.target) && !additionalSearchBtn.contains(e.target)) {
        advancedMenu.classList.remove('active');
        advancedMenu.style.maxHeight = '0';
        additionalSearchBtn.classList.remove('active');
    }
});

    // Autocomplete function
    function showAutocomplete(input, autocompleteList, locations) {
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            autocompleteList.innerHTML = '';
            if (value) {
                const suggestions = locations.filter(loc => loc.toLowerCase().includes(value));
                suggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.textContent = suggestion;
                    div.addEventListener('click', function() {
                        input.value = suggestion;
                        autocompleteList.style.display = 'none';
                        performSearch();
                    });
                    autocompleteList.appendChild(div);
                });
                autocompleteList.style.display = suggestions.length > 0 ? 'block' : 'none';
            } else {
                autocompleteList.style.display = 'none';
                performSearch();
            }
        });

        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !autocompleteList.contains(e.target)) {
                autocompleteList.style.display = 'none';
            }
        });
    }

    // Initialize autocomplete for both inputs
    showAutocomplete(fromLocation, fromAutocomplete, locations);
    showAutocomplete(toLocation, toAutocomplete, locations);

    // Direction Arrow Switch Functionality
    directionArrow.addEventListener('click', function() {
        const fromValue = fromLocation.value;
        const toValue = toLocation.value;

        // Swap the values
        fromLocation.value = toValue;
        toLocation.value = fromValue;

        // Toggle arrow direction (rotate 180 degrees)
        directionArrow.classList.toggle('reversed');

        // Trigger search with new direction
        performSearch();
    });

    // Search Function
    function performSearch() {
        const from = fromLocation.value.trim();
        const to = toLocation.value.trim();
        const date = travelDate.value;
        const time = travelTime.value;

        console.log('Search Inputs:', { from, to, date, time, selectedClass, selectedMode });

        searchResults.innerHTML = '';
        searchResults.style.display = 'none';

        // Only proceed if all main fields (From, To, Date) are filled
        if (!from || !to || !date) {
            searchResults.innerHTML = '<p>Please fill in all required fields (From, To, Date).</p>';
            searchResults.style.display = 'block';
            return;
        }

        const formattedDate = formatDate(date);
        const searchTime = convertTo24Hour(time);

        let locationFailed = true;
        let dateFailed = true;
        let timeFailed = true;
        let classFailed = selectedClass ? true : false;
        let modeFailed = true;

        const filteredBuses = buses.map(bus => {
            const stopNames = bus.stops.map(stop => stop.name);
            const fromIndex = stopNames.indexOf(from);
            const toIndex = stopNames.indexOf(to);

            const matchesLocation = fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
            const matchesDate = bus.departure.date === formattedDate;
            const matchesClass = !selectedClass || (selectedClass && bus.class === selectedClass);
            const matchesMode = bus.route.direction === selectedMode;
            const busDepartureTime = convertTo24Hour(bus.departure.time);
            const matchesTime = !time || compareTimes(searchTime, busDepartureTime) <= 0;

            if (matchesLocation) locationFailed = false;
            if (matchesDate) dateFailed = false;
            if (matchesTime) timeFailed = false;
            if (matchesClass) classFailed = false;
            if (matchesMode) modeFailed = false;

            console.log('Bus:', bus.company, {
                matchesLocation,
                matchesDate,
                matchesTime,
                matchesClass,
                matchesMode,
                fromIndex,
                toIndex,
                busDepartureTime,
                searchTime
            });

            if (matchesLocation && matchesDate && matchesTime && matchesClass && matchesMode) {
                const relevantStops = bus.stops.slice(fromIndex, toIndex + 1);
                const fareKey = `${from}-${to}`;
                return {
                    company: bus.company,
                    class: bus.class,
                    service: bus.service,
                    amenities: bus.amenities,
                    image: bus.image,
                    departure: { time: relevantStops[0].time, date: bus.departure.date, location: from },
                    arrival: { time: relevantStops[relevantStops.length - 1].time, date: bus.arrival.date, location: to },
                    stops: relevantStops,
                    allStops: bus.stops,
                    additionalInfo: bus.additionalInfo,
                    coffeeBreak: bus.coffeeBreak,
                    fare: bus.fare[fareKey] || 'Fare not available'
                };
            }
            return null;
        }).filter(bus => bus !== null);

        console.log('Filtered Buses:', filteredBuses);
        console.log('Failure Flags:', { locationFailed, dateFailed, timeFailed, classFailed, modeFailed });

        if (filteredBuses.length > 0) {
            filteredBuses.forEach(bus => {
                const busItem = createBusItem(bus);
                searchResults.appendChild(busItem);
            });
            searchResults.style.display = 'block';
        } else {
            let errorMessage = 'No buses found';
            const failureReasons = [];

            if (locationFailed) failureReasons.push('in specific location');
            if (dateFailed) failureReasons.push('for the selected date');
            if (timeFailed) failureReasons.push('at the selected time');
            if (classFailed && selectedClass) failureReasons.push('for the selected class');
            if (modeFailed) failureReasons.push('for the selected mode');

            if (failureReasons.length === 0) {
                errorMessage = 'No buses found matching your criteria.';
            } else if (failureReasons.length === 1) {
                errorMessage = `${errorMessage} ${failureReasons[0]}.`;
            } else if (failureReasons.length === 2) {
                errorMessage = `${errorMessage} ${failureReasons[0]} and ${failureReasons[1]}.`;
            } else {
                errorMessage = 'No buses for selected city, date, time, class, and mode.';
            }

            searchResults.innerHTML = `<p>${errorMessage}</p>`;
            searchResults.style.display = 'block';
        }
    }

    // Add event listener for search button
    searchButton.addEventListener('click', performSearch);

    // Helper functions
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    function convertTo24Hour(timeStr) {
        if (!timeStr) return '00:00:00'; // Default to midnight if no time is provided
        if (!timeStr.includes(' ')) {
            const [hours, minutes] = timeStr.split(':');
            return `${hours}:${minutes}:00`;
        }
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return `${String(hours).padStart(2, '0')}:${minutes}:00`;
    }

    function compareTimes(time1, time2) {
        const [h1, m1] = time1.split(':').map(Number);
        const [h2, m2] = time2.split(':').map(Number);
        if (h1 !== h2) return h1 - h2;
        return m1 - m2;
    }

    function createBusItem(bus) {
        const busItem = document.createElement('div');
        busItem.className = 'bus-item';
        
        busItem.innerHTML = `
            <div class="main-content">
                <div class="bus-details">
                    <div class="bus-company">${bus.company}</div>
                    <div class="bus-type">${bus.class}</div>
                    <div class="bus-service">${bus.service}</div>
                    <div class="bus-amenities">${bus.amenities}</div>
                </div>
                
                <div class="bus-image">
                    <img src="${bus.image}" alt="Bus Image">
                </div>
                
                <div class="departure-info">
                    <img src="images/arrrowgreen.png" alt="Departure Arrow">
                    <div class="time">${bus.departure.time}</div>
                    <div class="date">${bus.departure.date}</div>
                    <div class="location">${bus.departure.location}</div>
                </div>
                
                <div class="journey-route">
                    <div class="route-line">
                        ${bus.stops
                            .filter((_, index) => index === 0 || index === bus.stops.length - 1)
                            .map((_, index) => `
                                <div class="stop-point ${index === 0 ? 'start-point' : 'end-point'}"></div>
                            `).join('')}
                    </div>
                    
                    <div class="coffee-break">
                        <i class="fa-solid fa-mug-hot"></i>
                        <div class="coffee-time">${bus.coffeeBreak}</div>
                    </div>
                    
                    ${bus.stops
                        .filter((_, index) => index === 0 || index === bus.stops.length - 1)
                        .map((stop, index) => `
                            <div class="stop-label ${index === 0 ? 'start-label' : 'end-label'}">
                                <div class="stop-name">${stop.name}</div>
                                <div class="stop-time">${stop.time}</div>
                            </div>
                        `).join('')}
                </div>
                
                <div class="arrival-info">
                    <img src="images/arrowred.png" alt="Arrival Arrow">
                    <div class="time">${bus.arrival.time}</div>
                    <div class="date">${bus.arrival.date}</div>
                    <div class="location">${bus.arrival.location}</div>
                </div>
                
                <div class="price-details">
                    <div class="price">${bus.fare}</div>
                    <div class="action-buttons">
                        <button class="send-info">
                            <i class="fa-brands fa-whatsapp"></i>
                            Send Info
                        </button>
                        <button class="book-now">
                            <i class="fa-solid fa-ticket"></i>
                            Book Now
                        </button>
                    </div>
                    <div class="additional-info">
                        <span>Additional Info</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                </div>
            </div>
            
            <div class="additional-info-panel">
                <div class="additional-info-content">
                    <!-- General Information -->
                    <div class="general-info">
                        <div class="info-item">Type of Seat: <span>${bus.additionalInfo.typeOfSeat}</span></div>
                        <div class="info-item">Route: <span>${bus.additionalInfo.route}</span></div>
                        <div class="info-item">No of Seats: <span>${bus.additionalInfo.noOfSeats}</span></div>
                        <div class="info-item">Availability: <span>${bus.additionalInfo.availability}</span></div>
                        <div class="info-item">Route Number: <span>${bus.additionalInfo.routeNumber}</span></div>
                    </div>
                    
                    <!-- Boardings -->
                    <div class="boardings">
                        <h4>Boardings</h4>
                        <div class="boardings-list">
                            ${bus.allStops.map((stop, index) => {
                                const row = Math.floor(index / 5);
                                const col = index % 5;
                                return `
                                    <div class="boarding-item" style="grid-row: ${row + 1}; grid-column: ${col + 1};">
                                        <div class="boarding-dot ${
                                            index === 0 ? 'departure' : 
                                            index === bus.allStops.length - 1 ? 'arrival' : 
                                            'intermediate'
                                        }"></div>
                                        <span class="stop-name">${stop.name}</span>
                                        <span class="stop-time">${stop.time}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const additionalInfoBtn = busItem.querySelector('.additional-info');
        const additionalInfoPanel = busItem.querySelector('.additional-info-panel');
    
        // Toggle on "Additional Info" button click (remains functional)
        additionalInfoBtn.addEventListener('click', () => {
            additionalInfoPanel.classList.toggle('active');
            additionalInfoBtn.classList.toggle('active');
    
            if (additionalInfoPanel.classList.contains('active')) {
                additionalInfoPanel.style.maxHeight = `${additionalInfoPanel.scrollHeight}px`;
            } else {
                additionalInfoPanel.style.maxHeight = '0';
            }
        });
    
        // Toggle on entire card click (except buttons)
        busItem.addEventListener('click', (e) => {
            // Prevent toggle if clicking on "Send Info" or "Book Now" buttons
            if (e.target.closest('.send-info') || e.target.closest('.book-now')) {
                return;
            }
    
            // Toggle the panel if not clicking the buttons
            additionalInfoPanel.classList.toggle('active');
            additionalInfoBtn.classList.toggle('active');
    
            if (additionalInfoPanel.classList.contains('active')) {
                additionalInfoPanel.style.maxHeight = `${additionalInfoPanel.scrollHeight}px`;
            } else {
                additionalInfoPanel.style.maxHeight = '0';
            }
        });
    
        const sendInfoBtn = busItem.querySelector('.send-info');
        sendInfoBtn.addEventListener('click', () => alert('Info would be sent via WhatsApp'));
    
        const bookNowBtn = busItem.querySelector('.book-now');
        bookNowBtn.addEventListener('click', () => alert('Booking process would start here'));
    
        return busItem;
    }

    // Initial search to handle default values
    performSearch();
});