// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Sample locations (expandable to 60+ stops when provided)
    const locations = [
        'Colombo', 'Kadugannawa', 'Peradeniya', 'Kandy', 'Gampola',
        'Pettah', 'Jaffna', 'Matara', 'Galle', 'Kurunegala'
        // Add more locations here when you provide the full list
    ];

    // Sample bus data
    const buses = [
        {
            company: 'GAMAN',
            class: 'Normal',
            service: 'NTC',
            amenities: 'Non-A/C',
            image: 'images/normal.png',
            route: { direction: 'forward', start: 'Colombo', end: 'Kandy' },
            departure: { time: '05:00 PM', date: '07 Mar 2025', location: 'Colombo' },
            arrival: { time: '06:00 PM', date: '07 Mar 2025', location: 'Kandy' },
            stops: [
                { name: 'Colombo', time: '05:00 PM' },
                { name: 'Kadugannawa', time: '05:30 PM' },
                { name: 'Peradeniya', time: '05:45 PM' },
                { name: 'Kandy', time: '06:00 PM' }
            ],
            coffeeBreak: '05:45 PM',
            fare: { 'Colombo-Kandy': '350.00 LKR', 'Colombo-Kadugannawa': '200.00 LKR', 'Kadugannawa-Kandy': '150.00 LKR' }
        },
        {
            company: 'GAMAN',
            class: 'Normal',
            service: 'NTC',
            amenities: 'Non-A/C',
            image: 'images/normal.png',
            route: { direction: 'reverse', start: 'Kandy', end: 'Colombo' },
            departure: { time: '06:00 PM', date: '07 Mar 2025', location: 'Kandy' },
            arrival: { time: '07:00 PM', date: '07 Mar 2025', location: 'Colombo' },
            stops: [
                { name: 'Kandy', time: '06:00 PM' },
                { name: 'Peradeniya', time: '06:15 PM' },
                { name: 'Kadugannawa', time: '06:30 PM' },
                { name: 'Colombo', time: '07:00 PM' }
            ],
            coffeeBreak: '06:30 PM',
            fare: { 'Kandy-Colombo': '350.00 LKR', 'Kandy-Peradeniya': '50.00 LKR', 'Peradeniya-Colombo': '300.00 LKR' }
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