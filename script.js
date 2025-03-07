// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Sample locations (expandable to 60+ stops when provided)
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
        'Ambilipitiya (Yatinuchara Sabha)', 'Kiribathkumbura', 'Peradeniya(පේරාදොණිය)', 'Gatembe(ගැටඹේ)', 
        'Mulgampola(මුල්ගම්පොල)', 'Kandy(මහනුවර)'
    ];
    

    // Sample bus data with 60 stops and fares between Colombo and Kandy (Translated)
    const buses = [
        {
            company: 'RATHNA Travel',
            class: 'Normal',
            service: 'NTC',
            amenities: 'Non-A/C',
            image: 'images/CTB.png',
            route: { direction: 'forward', start: 'Colombo', end: 'Kandy' },
            departure: { time: '05:00 PM', date: '07 Mar 2025', location: 'Colombo' },
            arrival: { time: '06:00 PM', date: '07 Mar 2025', location: 'Kandy' },
            stops: [
                { name: 'Colombo', time: '05:00 PM' },
                { name: 'Maligawatta', time: '05:05 PM' },
                { name: 'Kelani thissa', time: '05:10 PM' },
                { name: '4th Canal / Biyagama Road', time: '05:15 PM' },
                { name: 'Thorana Junction', time: '05:20 PM' },
                { name: 'Kelaniya University', time: '05:25 PM' },
                { name: 'Kiribathgoda', time: '05:30 PM' },
                { name: 'Maharagama Junction', time: '05:35 PM' },
                { name: 'Kadawatha', time: '05:40 PM' },
                { name: 'Gonahena Junction', time: '05:45 PM' },
                { name: 'Indigama Junction', time: '05:50 PM' },
                { name: 'Kirillawala', time: '05:55 PM' },
                { name: 'Trackmo Junction', time: '06:00 PM' },
                { name: 'Mudungoda', time: '06:05 PM' },
                { name: 'Miriswatta', time: '06:10 PM' },
                { name: 'Yakkala', time: '06:15 PM' },
                { name: 'Aluthgama', time: '06:20 PM' },
                { name: 'Kalagedihena', time: '06:25 PM' },
                { name: 'Thihariya', time: '06:30 PM' },
                { name: 'Nittambuwa Sanghabodhi Maha Vidyalaya', time: '06:35 PM' },
                { name: 'Nittambuwa', time: '06:40 PM' },
                { name: 'Kalalpitiya', time: '06:45 PM' },
                { name: 'Paswala', time: '06:50 PM' },
                { name: 'Kaju Gama', time: '06:55 PM' },
                { name: 'Radhawadunna', time: '07:00 PM' },
                { name: 'Wewel Deniya', time: '07:05 PM' },
                { name: 'Dummaladoniya', time: '07:10 PM' },
                { name: 'Warakapola', time: '07:15 PM' },
                { name: 'Ambepussa', time: '07:20 PM' },
                { name: 'Mahena', time: '07:25 PM' },
                { name: 'Tholangamuwa', time: '07:30 PM' },
                { name: 'Gasnaawa Waththa Junction', time: '07:35 PM' },
                { name: 'Nelumdoniya', time: '07:40 PM' },
                { name: 'Batapothalla KandaUda', time: '07:45 PM' },
                { name: 'Siyambalapitiya', time: '07:50 PM' },
                { name: 'Balla-pana Junction', time: '07:55 PM' },
                { name: 'Galigamuwa', time: '08:00 PM' },
                { name: 'Ambanpitiya', time: '08:05 PM' },
                { name: 'Rangwala Junction', time: '08:10 PM' },
                { name: 'Kegalle', time: '08:15 PM' },
                { name: 'Meepitiya', time: '08:20 PM' },
                { name: 'Karangupona', time: '08:25 PM' },
                { name: 'Mologoda', time: '08:30 PM' },
                { name: 'Mangalgama', time: '08:35 PM' },
                { name: 'Uthuwankanda', time: '08:40 PM' },
                { name: 'Anwarama', time: '08:45 PM' },
                { name: 'Mawanella', time: '08:50 PM' },
                { name: 'Beligammana', time: '08:55 PM' },
                { name: 'Hubula', time: '09:00 PM' },
                { name: 'Gafanethenna', time: '09:05 PM' },
                { name: 'Pahala Kadugannawa', time: '09:10 PM' },
                { name: 'Kadugannawa', time: '09:15 PM' },
                { name: 'Henachavachala (Rehela Road)', time: '09:20 PM' },
                { name: 'Pilimathalawa', time: '09:25 PM' },
                { name: 'Ambilipitiya (Yatinuchara Sabha)', time: '09:30 PM' },
                { name: 'Kiribathkumbura', time: '09:35 PM' },
                { name: 'Peradeniya(පේරාදොණිය)', time: '09:40 PM' },
                { name: 'Gatembe(ගැටඹේ)', time: '09:45 PM' },
                { name: 'Mulgampola(මුල්ගම්පොල)', time: '09:50 PM' },
                { name: 'Kandy(මහනුවර)', time: '09:55 PM' }
            ],
            coffeeBreak: '06:10 PM',
            fare: {
                'Colombo-Kandy(මහනුවර)': '350.00 LKR',
                'Colombo-Kalutara': '50.00 LKR',
                'Kalutara-Maharagama': '20.00 LKR',
                'Maharagama-Kadugannawa': '30.00 LKR',
                'Kadugannawa-Kandy': '100.00 LKR',
                // Fare for all segments between stops (example)
                'Colombo-Maligawatta': '10.00 LKR',
                'Maligawatta-Kelaniya': '15.00 LKR',
                'Kelaniya-Kiribathgoda': '20.00 LKR',
                'Kiribathgoda-Maharagama': '15.00 LKR',
                'Maharagama-Kadugannawa': '25.00 LKR',
                // Add fares for all other segments
                'Kadugannawa-Gehena': '15.00 LKR',
                'Gehena-Idigahamuwa': '20.00 LKR',
                'Idigahamuwa-Kandy': '50.00 LKR',
                // Continue fare data...
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
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const classOptions = document.querySelectorAll('.class-option');

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    travelDate.value = today;

    // Class selection
    let selectedClass = null;
    classOptions.forEach(option => {
        option.addEventListener('click', function() {
            classOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedClass = this.getAttribute('data-class');
            console.log('Selected Class:', selectedClass);
        });
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
                    });
                    autocompleteList.appendChild(div);
                });
                autocompleteList.style.display = suggestions.length > 0 ? 'block' : 'none';
            } else {
                autocompleteList.style.display = 'none';
            }
        });

        // Hide autocomplete when clicking outside
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !autocompleteList.contains(e.target)) {
                autocompleteList.style.display = 'none';
            }
        });
    }

    // Initialize autocomplete for both inputs
    showAutocomplete(fromLocation, fromAutocomplete, locations);
    showAutocomplete(toLocation, toAutocomplete, locations);

    // Search function
    searchButton.addEventListener('click', function() {
        const from = fromLocation.value;
        const to = toLocation.value;
        const date = travelDate.value;
        const time = travelTime.value;

        console.log('Search Inputs:', { from, to, date, time, selectedClass });

        searchResults.innerHTML = '';

        const formattedDate = formatDate(date);
        const searchTime = convertTo24Hour(time);

        let locationFailed = true;
        let dateFailed = true;
        let timeFailed = true;
        let classFailed = selectedClass ? true : false;

        const filteredBuses = buses.map(bus => {
            const stopNames = bus.stops.map(stop => stop.name);
            const fromIndex = stopNames.indexOf(from);
            const toIndex = stopNames.indexOf(to);

            const matchesLocation = fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
            const matchesDate = bus.departure.date === formattedDate;
            const matchesClass = selectedClass ? bus.class === selectedClass : true;
            const busDepartureTime = convertTo24Hour(bus.departure.time);
            const matchesTime = compareTimes(searchTime, busDepartureTime) <= 0;

            if (matchesLocation) locationFailed = false;
            if (matchesDate) dateFailed = false;
            if (matchesTime) timeFailed = false;
            if (matchesClass) classFailed = false;

            console.log('Bus:', bus.company, {
                matchesLocation,
                matchesDate,
                matchesTime,
                matchesClass,
                fromIndex,
                toIndex,
                busDepartureTime,
                searchTime
            });

            if (matchesLocation && matchesDate && matchesTime && matchesClass) {
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
                    coffeeBreak: bus.coffeeBreak,
                    fare: bus.fare[fareKey] || 'Fare not available'
                };
            }
            return null;
        }).filter(bus => bus !== null);

        console.log('Filtered Buses:', filteredBuses);
        console.log('Failure Flags:', { locationFailed, dateFailed, timeFailed, classFailed });

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

            if (failureReasons.length === 0) {
                errorMessage = 'No buses found matching your criteria.';
            } else if (failureReasons.length === 1) {
                errorMessage = `${errorMessage} ${failureReasons[0]}.`;
            } else if (failureReasons.length === 2) {
                errorMessage = `${errorMessage} ${failureReasons[0]} and ${failureReasons[1]}.`;
            } else {
                errorMessage = 'No buses for selected city, date, time, and class.';
            }

            searchResults.innerHTML = `<p>${errorMessage}</p>`;
            searchResults.style.display = 'block';
        }
    });

    // Helper functions
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    function convertTo24Hour(timeStr) {
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
                <div class="time">${bus.departure.time}</div>
                <div class="date">${bus.departure.date}</div>
                <div class="location">${bus.departure.location}</div>
            </div>
            
            <div class="journey-route">
                <div class="route-line">
                    ${bus.stops.map((_, index) => `
                        <div class="stop-point ${index === 0 ? 'start-point' : index === bus.stops.length - 1 ? 'end-point' : 'middle-point'}"></div>
                    `).join('')}
                </div>
                
                <div class="coffee-break">
                    <i class="fa-solid fa-mug-hot"></i>
                    <div class="coffee-time">${bus.coffeeBreak}</div>
                </div>
                
                ${bus.stops.map((stop, index) => `
                    <div class="stop-label ${index === 0 ? 'start-label' : index === bus.stops.length - 1 ? 'end-label' : 'middle-label'}">
                        <div class="stop-name">${stop.name}</div>
                        <div class="stop-time">${stop.time}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="arrival-info">
                <div class="time">${bus.arrival.time}</div>
                <div class="date">${bus.arrival.date}</div>
                <div class="location">${bus.arrival.location}</div>
            </div>
            
            <div class="price-details">
                <div class="price">${bus.fare}</div>
                <div class="additional-info">
                    <span>Additional Info</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
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
            </div>
        `;
        
        const additionalInfoBtn = busItem.querySelector('.additional-info');
        additionalInfoBtn.addEventListener('click', () => alert('Additional info would show here'));

        const sendInfoBtn = busItem.querySelector('.send-info');
        sendInfoBtn.addEventListener('click', () => alert('Info would be sent via WhatsApp'));

        const bookNowBtn = busItem.querySelector('.book-now');
        bookNowBtn.addEventListener('click', () => alert('Booking process would start here'));

        return busItem;
    }
});