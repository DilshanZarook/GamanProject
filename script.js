document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements with null checks
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

    // Log if any element is missing
    if (!fromLocation) console.error('from-location not found');
    if (!fromAutocomplete) console.error('from-autocomplete not found');
    if (!toLocation) console.error('to-location not found');
    if (!toAutocomplete) console.error('to-autocomplete not found');
    if (!travelDate) console.error('travel-date not found');
    if (!travelTime) console.error('travel-time not found');
    if (!searchResults) console.error('search-results not found');
    if (!additionalSearchBtn) console.error('additional-search-btn not found');
    if (!advancedMenu) console.error('advanced-menu not found');
    if (!searchButton) console.error('search-button not found');
    if (!directionArrow) console.error('direction-arrow not found');

    // Proceed only if essential elements exist
    if (!fromLocation || !toLocation || !travelDate || !searchResults) {
        console.error('Essential elements missing, script halted');
        return;
    }

    // Fetch locations and buses from the backend
    let locations = [];
    let buses = [];

    // Fetch locations for autocomplete
    fetch('api_locations.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error fetching locations:', data.error);
                return;
            }
            locations = data;
            showAutocomplete(fromLocation, fromAutocomplete, locations);
            showAutocomplete(toLocation, toAutocomplete, locations);
        })
        .catch(error => console.error('Error fetching locations:', error));

    // Fetch buses data
    fetch('api.php')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched buses data:', data);
            if (data.error) {
                console.error('Error fetching buses:', data.error);
                return;
            }
            buses = data;
            performSearch();
        })
        .catch(error => console.error('Error fetching buses:', error));

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    travelDate.value = today;

    // Class and Mode selection
    let selectedClass = null;
    let selectedMode = 'bus';

    if (classOptions.length > 0) {
        classOptions.forEach(option => {
            option.addEventListener('click', function() {
                const isSelected = this.classList.contains('selected');
                classOptions.forEach(opt => opt.classList.remove('selected'));
                if (!isSelected) {
                    this.classList.add('selected');
                    selectedClass = this.getAttribute('data-class');
                } else {
                    selectedClass = null;
                }
                performSearch();
            });
        });
    }

    if (modeOptions.length > 0) {
        modeOptions.forEach(option => {
            option.addEventListener('click', function() {
                modeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                selectedMode = this.getAttribute('data-mode');
                performSearch();
            });
        });
    }

    if (additionalSearchBtn) {
        additionalSearchBtn.addEventListener('click', function() {
            const isActive = advancedMenu.classList.toggle('active');
            this.classList.toggle('active');
            if (isActive) {
                advancedMenu.style.maxHeight = `${advancedMenu.scrollHeight}px`;
            } else {
                advancedMenu.style.maxHeight = '0';
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (!advancedMenu.contains(e.target) && !additionalSearchBtn.contains(e.target)) {
            advancedMenu.classList.remove('active');
            advancedMenu.style.maxHeight = '0';
            additionalSearchBtn.classList.remove('active');
        }
    });

    // Autocomplete function
    function showAutocomplete(input, autocompleteList, locations) {
        if (!input || !autocompleteList) return;
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

    if (directionArrow) {
        directionArrow.addEventListener('click', function() {
            const fromValue = fromLocation.value;
            const toValue = toLocation.value;
            fromLocation.value = toValue;
            toLocation.value = fromValue;
            directionArrow.classList.toggle('reversed');
            performSearch();
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    // Search Function
    function performSearch() {
        const from = fromLocation.value.trim().toLowerCase();
        const to = toLocation.value.trim().toLowerCase();
        const date = travelDate.value;
        const time = travelTime ? travelTime.value || '' : '';

        searchResults.innerHTML = '';
        searchResults.style.display = 'none';

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
            const stopNames = bus.stops && Array.isArray(bus.stops) ? bus.stops.map(stop => stop.name.toLowerCase()) : [];
            const fromIndex = stopNames.indexOf(from);
            const toIndex = stopNames.indexOf(to);

            const matchesLocation = fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
            const matchesDate = bus.departure && bus.departure.date === formattedDate;
            const matchesClass = !selectedClass || (selectedClass && bus.class === selectedClass);
            const matchesMode = bus.route && bus.route.direction === selectedMode;
            const busDepartureTime = bus.departure && bus.departure.time ? convertTo24Hour(bus.departure.time) : '00:00:00';
            const matchesTime = !time || compareTimes(searchTime, busDepartureTime) <= 0;

            console.log(`Bus: ${bus.company || 'Unknown'}, Departure Date: ${bus.departure?.date}, Formatted Date: ${formattedDate}`);
            console.log(`Bus: ${bus.company || 'Unknown'}, Stops: ${stopNames.join(', ')}`);
            console.log(`From Index: ${fromIndex}, To Index: ${toIndex}`);
            console.log(`Matches - Location: ${matchesLocation}, Date: ${matchesDate}, Time: ${matchesTime}, Class: ${matchesClass}, Mode: ${matchesMode}`);

            if (matchesLocation) locationFailed = false;
            if (matchesDate) dateFailed = false;
            if (matchesTime) timeFailed = false;
            if (matchesClass) classFailed = false;
            if (matchesMode) modeFailed = false;

            if (matchesLocation && matchesDate && matchesTime && matchesClass && matchesMode) {
                const relevantStops = bus.stops.slice(fromIndex, toIndex + 1);
                const fareKey = `${from}-${to}`;
                return {
                    company: bus.company || 'Unknown',
                    class: bus.class || 'N/A',
                    service: bus.service || 'N/A',
                    amenities: bus.amenities || 'N/A',
                    image: bus.image || '',
                    departure: { time: relevantStops[0].time, date: bus.departure.date, location: from },
                    arrival: { time: relevantStops[relevantStops.length - 1].time, date: bus.arrival.date, location: to },
                    stops: relevantStops,
                    allStops: bus.stops || [],
                    additionalInfo: bus.additionalInfo || {},
                    coffeeBreak: bus.coffeeBreak || 'N/A',
                    fare: bus.fare && bus.fare[fareKey] ? bus.fare[fareKey] : 'Fare not available'
                };
            }
            return null;
        }).filter(bus => bus !== null);

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
            console.log(`Search failed: ${errorMessage}, Reasons: ${failureReasons.join(', ')}`);
        }
    }

    // Helper functions
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' }); // Outputs "Mar"
        const year = date.getFullYear();
        return `${day} ${month} ${year}`; // Outputs "11 Mar 2025"
    }

    function convertTo24Hour(timeStr) {
        if (!timeStr) return '00:00:00';
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
                    <div class="location">
                        ${bus.departure.location.match(/\((.*?)\)/)?.[1] || bus.departure.location}
                    </div>
                </div>

                
               <div class="journey-route">
                    <div class="route-line">
                        ${(() => {
                            const fromIndex = bus.allStops.findIndex(stop => 
                                stop.name.toLowerCase() === bus.departure.location.toLowerCase());
                            const toIndex = bus.allStops.findIndex(stop => 
                                stop.name.toLowerCase() === bus.arrival.location.toLowerCase());

                            // Calculate two middle points
                            const middleIndex1 = Math.floor(fromIndex + (toIndex - fromIndex) / 3);
                            const middleIndex2 = Math.floor(fromIndex + 2 * (toIndex - fromIndex) / 3);

                            return `
                                <div class="stop-point start-point"></div>
                                <div class="stop-point middle-point1" style="left: 33%;"></div>
                                <div class="stop-point middle-point2" style="left: 66%;"></div>
                                <div class="stop-point end-point"></div>
                            `;
                        })()}
                    </div>
                    
                    <div class="coffee-break">
                        <i class="fa-solid fa-mug-hot"></i>
                        <div class="coffee-time">${bus.coffeeBreak}</div>
                    </div>
                    
                    ${(() => {
                        const fromIndex = bus.allStops.findIndex(stop => 
                            stop.name.toLowerCase() === bus.departure.location.toLowerCase());
                        const toIndex = bus.allStops.findIndex(stop => 
                            stop.name.toLowerCase() === bus.arrival.location.toLowerCase());

                        // Calculate two middle points
                        const middleIndex1 = Math.floor(fromIndex + (toIndex - fromIndex) / 3);
                        const middleIndex2 = Math.floor(fromIndex + 2 * (toIndex - fromIndex) / 3);

                        const startStop = bus.allStops[fromIndex];
                        const middleStop1 = bus.allStops[middleIndex1];
                        const middleStop2 = bus.allStops[middleIndex2];
                        const endStop = bus.allStops[toIndex];

                        const getEnglishName = (stop) => stop.name.match(/\((.*?)\)/)?.[1] || stop.name;

                        return `
                            <div class="stop-label start-label" style="color: green;">
                                <div class="stop-name">${getEnglishName(startStop)}</div>
                                <div class="stop-time">${startStop.time}</div>
                            </div>
                            
                            <div class="stop-label middle-label1" style="left: 33%; transform: translateX(-50%); top: 40px;">
                                <div class="stop-name">${getEnglishName(middleStop1)}</div>
                                <div class="stop-time">${middleStop1.time}</div>
                            </div>

                            <div class="stop-label middle-label2" style="left: 66%; transform: translateX(-50%); top: 40px;">
                                <div class="stop-name">${getEnglishName(middleStop2)}</div>
                                <div class="stop-time">${middleStop2.time}</div>
                            </div>

                            <div class="stop-label end-label" style="color: red;">
                                <div class="stop-name">${getEnglishName(endStop)}</div>
                                <div class="stop-time">${endStop.time}</div>
                            </div>
                        `;
                    })()}
                </div>


                
                <div class="arrival-info">
                    <img src="images/arrowred.png" alt="Arrival Arrow">
                    <div class="time">${bus.arrival.time}</div>
                    <div class="date">${bus.arrival.date}</div>
                    <div class="location">
                        ${bus.arrival.location.match(/\((.*?)\)/)?.[1] || bus.arrival.location}
                    </div>
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
                    <div class="general-info">
                        <div class="info-item">Type of Seat: <span>${bus.additionalInfo.typeOfSeat || 'N/A'}</span></div>
                        <div class="info-item">Route: <span>${bus.additionalInfo.route || 'N/A'}</span></div>
                        <div class="info-item">No of Seats: <span>${bus.additionalInfo.noOfSeats || 'N/A'}</span></div>
                        <div class="info-item">Availability: <span>${bus.additionalInfo.availability || 'N/A'}</span></div>
                        <div class="info-item">Route Number: <span>${bus.additionalInfo.routeNumber || 'N/A'}</span></div>
                    </div>
                    
                    <div class="boardings-list">
                        ${bus.allStops.map((stop, index) => {
                            const row = Math.floor(index / 4);
                            const col = index % 4;
                            const stopName = stop.name.toLowerCase();
                            const fromLocation = bus.departure.location.toLowerCase();
                            const toLocation = bus.arrival.location.toLowerCase();
                            
                            // Determine stop type based on from/to locations
                            let stopType = 'intermediate';
                            let textStyle = '';
                            
                            if (stopName === fromLocation) {
                                stopType = 'departure';
                                textStyle = 'font-size: 11px; font-weight: bold;';
                            } else if (stopName === toLocation) {
                                stopType = 'arrival';
                                textStyle = 'font-size: 11px; font-weight: bold;';
                            }
                            
                            return `
                                <div class="boarding-item" style="grid-row: ${row + 1}; grid-column: ${col + 1};">
                                    <div class="boarding-dot ${stopType}"></div>
                                    <span class="stop-name" style="${textStyle}">${stop.name}</span>
                                    <span class="stop-time" style="${textStyle}">${stop.time}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        
        const additionalInfoBtn = busItem.querySelector('.additional-info');
        const additionalInfoPanel = busItem.querySelector('.additional-info-panel');

        if (additionalInfoBtn && additionalInfoPanel) {
            additionalInfoBtn.addEventListener('click', () => {
                additionalInfoPanel.classList.toggle('active');
                additionalInfoBtn.classList.toggle('active');

                if (additionalInfoPanel.classList.contains('active')) {
                    additionalInfoPanel.style.maxHeight = `${additionalInfoPanel.scrollHeight}px`;
                } else {
                    additionalInfoPanel.style.maxHeight = '0';
                }
            });

            busItem.addEventListener('click', (e) => {
                if (e.target.closest('.send-info') || e.target.closest('.book-now')) {
                    return;
                }
                additionalInfoPanel.classList.toggle('active');
                additionalInfoBtn.classList.toggle('active');

                if (additionalInfoPanel.classList.contains('active')) {
                    additionalInfoPanel.style.maxHeight = `${additionalInfoPanel.scrollHeight}px`;
                } else {
                    additionalInfoPanel.style.maxHeight = '0';
                }
            });

            const sendInfoBtn = busItem.querySelector('.send-info');
            if (sendInfoBtn) {
                sendInfoBtn.addEventListener('click', () => alert('Info would be sent via WhatsApp'));
            }

            const bookNowBtn = busItem.querySelector('.book-now');
            if (bookNowBtn) {
                bookNowBtn.addEventListener('click', () => alert('Booking process would start here'));
            }
        }

        return busItem;
    }
});