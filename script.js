// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Sample bus data
    const buses = [
        {
            company: 'RATHNA TRAVELS',
            type: 'Super Luxury (XL)',
            service: 'NTC',
            amenities: 'Air Condition : A/C',
            image: 'images/Rathna(XL).png',
            departure: {
                time: '9:00 AM',
                date: '06 Mar 2025', // Updated to match today's date
                location: 'Colombo'
            },
            arrival: {
                time: '5:00 PM',
                date: '06 Mar 2025',
                location: 'Jaffna'
            },
            stops: [
                {
                    name: 'Pettah',
                    time: '9:30 AM'
                }
            ],
            coffeeBreak: '12:30 PM',
            price: '3,600.00 LKR'
        },
        {
            company: 'RATHNA TRAVELS',
            type: 'Normal (N)',
            service: 'NTC',
            amenities: 'Air Condition : Non-A/C',
            image: '/Users/amanjanee/GamanProject/images/rathnanormal.png',
            departure: {
                time: '10:00 AM',
                date: '06 Mar 2025', // Updated to match today's date
                location: 'Colombo'
            },
            arrival: {
                time: '6:00 PM',
                date: '06 Mar 2025',
                location: 'Jaffna'
            },
            stops: [
                {
                    name: 'Pettah',
                    time: '10:30 AM'
                }
            ],
            coffeeBreak: '1:00 PM',
            price: '2,000.00 LKR'
        },
        {
            company: 'RATHNA TRAVELS',
            type: 'Semi-Luxury (S)',
            service: 'NTC',
            amenities: 'Air Condition : A/C',
            image: 'images/CTB.png',
            departure: {
                time: '11:00 AM',
                date: '06 Mar 2025', // Updated to match today's date
                location: 'Colombo'
            },
            arrival: {
                time: '7:00 PM',
                date: '06 Mar 2025',
                location: 'Jaffna'
            },
            stops: [
                {
                    name: 'Pettah',
                    time: '11:30 AM'
                }
            ],
            coffeeBreak: '2:00 PM',
            price: '2,500.00 LKR'
        },
    ];

    // DOM Elements
    const fromLocation = document.getElementById('from-location');
    const toLocation = document.getElementById('to-location');
    const travelDate = document.getElementById('travel-date');
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
            console.log('Selected Class:', selectedClass); // Debugging
        });
    });

    // Search function
    searchButton.addEventListener('click', function() {
        const from = fromLocation.value;
        const to = toLocation.value;
        const date = travelDate.value;
        const mode = 'bus'; // Static as per requirement

        // Log the input values for debugging
        console.log('Search Inputs:', { from, to, date, selectedClass });

        // Clear previous results
        searchResults.innerHTML = '';

        // Format the selected date
        const formattedDate = formatDate(date);
        console.log('Formatted Date:', formattedDate);

        // Track failure reasons
        let locationFailed = true;
        let dateFailed = true;
        let classFailed = selectedClass ? true : false; // Only track class failure if a class is selected

        // Filter buses based on selections
        const filteredBuses = buses.filter(bus => {
            const matchesLocation = bus.departure.location === from && bus.arrival.location === to;
            const matchesDate = bus.departure.date === formattedDate;
            const matchesClass = selectedClass ? bus.type.includes(`(${selectedClass})`) : true;

            // Update failure flags based on each bus
            if (matchesLocation) locationFailed = false;
            if (matchesDate) dateFailed = false;
            if (matchesClass) classFailed = false;

            // Log each bus's comparison results
            console.log('Bus:', bus.company, {
                matchesLocation,
                matchesDate,
                matchesClass,
                busDate: bus.departure.date,
                formattedDate,
                busType: bus.type
            });

            return matchesLocation && matchesDate && matchesClass;
        });

        console.log('Filtered Buses:', filteredBuses);
        console.log('Failure Flags:', { locationFailed, dateFailed, classFailed });

        // Display results
        if (filteredBuses.length > 0) {
            filteredBuses.forEach(bus => {
                const busItem = createBusItem(bus);
                searchResults.appendChild(busItem);
            });
            searchResults.style.display = 'block';
        } else {
            // Construct specific error message based on failure reasons
            let errorMessage = 'No buses found';
            const failureReasons = [];

            if (locationFailed) {
                failureReasons.push('in specific location');
            }
            if (dateFailed) {
                failureReasons.push('for the selected date');
            }
            if (classFailed && selectedClass) {
                failureReasons.push('for the selected class');
            }

            if (failureReasons.length === 0) {
                errorMessage = 'No buses found matching your hello world.';
            } else if (failureReasons.length === 1) {
                errorMessage = `${errorMessage} ${failureReasons[0]}.`;
            } else if (failureReasons.length === 2) {
                errorMessage = `${errorMessage} ${failureReasons[0]} and ${failureReasons[1]}.`;
            } else {
                // All three failed
                errorMessage = 'No buses for selected city, date, and class.';
            }

            searchResults.innerHTML = `<p>${errorMessage}</p>`;
            searchResults.style.display = 'block';
        }
    });

    // Helper function to format date to match 'DD MMM YYYY' (e.g., '06 Mar 2025')
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits (e.g., '06')
        const month = date.toLocaleString('en-US', { month: 'short' }); // e.g., 'Mar'
        const year = date.getFullYear();
        return `${day} ${month} ${year}`; // e.g., '06 Mar 2025'
    }

    // Create bus item element
    function createBusItem(bus) {
        const busItem = document.createElement('div');
        busItem.className = 'bus-item';
        
        busItem.innerHTML = `
            <div class="bus-details">
                <div class="bus-company">${bus.company}</div>
                <div class="bus-type">${bus.type}</div>
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
                    <div class="stop-point start-point"></div>
                    <div class="stop-point middle-point"></div>
                    <div class="stop-point end-point"></div>
                </div>
                
                <div class="coffee-break">
                    <i class="fa-solid fa-mug-hot"></i>
                    <div class="coffee-time">${bus.coffeeBreak}</div>
                </div>
                
                <div class="stop-label start-label">
                    <div class="stop-time">${bus.departure.time}</div>
                </div>
                
                <div class="stop-label middle-label">
                    <div class="stop-name">${bus.stops[0].name}</div>
                    <div class="stop-time">${bus.stops[0].time}</div>
                </div>
                
                <div class="stop-label end-label">
                    <div class="stop-name">${bus.arrival.location}</div>
                    <div class="stop-time">${bus.arrival.time}</div>
                </div>
            </div>
            
            <div class="arrival-info">
                <div class="time">${bus.arrival.time}</div>
                <div class="date">${bus.arrival.date}</div>
                <div class="location">${bus.arrival.location}</div>
            </div>
            
            <div class="price-details">
                <div class="price">${bus.price}</div>
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
        
        // Add event listeners for buttons
        const additionalInfoBtn = busItem.querySelector('.additional-info');
        additionalInfoBtn.addEventListener('click', function() {
            alert('Additional info would show here');
        });
        
        const sendInfoBtn = busItem.querySelector('.send-info');
        sendInfoBtn.addEventListener('click', function() {
            alert('Info would be sent via WhatsApp');
        });
        
        const bookNowBtn = busItem.querySelector('.book-now');
        bookNowBtn.addEventListener('click', function() {
            alert('Booking process would start here');
        });
        
        return busItem;
    }
});