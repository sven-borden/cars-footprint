// Get overlay container and legend elements
const overlayContainer = document.getElementById('overlay-container');
const legend = document.getElementById('legend');
const legendList = document.getElementById('legend-list');
const vehicleListContainer = document.querySelector('.vehicle-list');

// Vehicle data will be loaded from CSV
let vehiclesData = [];

// Parse CSV text into array of objects
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });
}

// Load vehicles from CSV file
async function loadVehicles() {
    try {
        const response = await fetch('vehicles.csv');
        const csvText = await response.text();
        vehiclesData = parseCSV(csvText);
        populateVehicleList();
        initializeEventListeners();
    } catch (error) {
        console.error('Error loading vehicles:', error);
    }
}

// Populate the vehicle selection list
function populateVehicleList() {
    vehicleListContainer.innerHTML = '';

    vehiclesData.forEach(vehicle => {
        const label = document.createElement('label');
        label.className = 'vehicle-option';

        label.innerHTML = `
            <input type="checkbox" id="${vehicle.id}" value="${vehicle.id}"
                   data-length="${vehicle.length}" data-width="${vehicle.width}"
                   data-color="${vehicle.color}">
            <span class="color-indicator" style="background-color: ${vehicle.color};"></span>
            <span class="vehicle-name">${vehicle.name}</span>
            <span class="vehicle-dims">${parseInt(vehicle.length).toLocaleString()}mm × ${parseInt(vehicle.width).toLocaleString()}mm</span>
        `;

        vehicleListContainer.appendChild(label);
    });
}

// Initialize event listeners after loading vehicles
function initializeEventListeners() {
    const checkboxes = document.querySelectorAll('.vehicle-option input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateOverlay);
    });

    window.addEventListener('resize', () => {
        updateOverlay();
    });

    updateOverlay();
}

// Function to calculate dynamic scale based on selected vehicles and container size
function calculateScale(vehicles, containerWidth, containerHeight) {
    if (vehicles.length === 0) return 0.04;

    // Swiss parking spot dimensions (in mm)
    // Interior: 4800mm x 2320mm, White line: 120mm (12cm)
    const parkingSpotInteriorLength = 4800;
    const parkingSpotInteriorWidth = 2320;
    const whiteLineWidth = 120;

    // Total dimensions including white lines on both sides
    const parkingSpotTotalLength = parkingSpotInteriorLength + (whiteLineWidth * 2);
    const parkingSpotTotalWidth = parkingSpotInteriorWidth + (whiteLineWidth * 2);

    // Find the maximum dimensions among all selected vehicles and parking spot (total)
    const maxLength = Math.max(...vehicles.map(v => v.length), parkingSpotTotalLength);
    const maxWidth = Math.max(...vehicles.map(v => v.width), parkingSpotTotalWidth);

    // Use 70% of container space to leave margins
    const usableWidth = containerWidth * 0.7;
    const usableHeight = containerHeight * 0.7;

    // Calculate scale factors for both dimensions
    const scaleByLength = usableWidth / maxLength;
    const scaleByWidth = usableHeight / maxWidth;

    // Use the smaller scale to ensure everything fits
    return Math.min(scaleByLength, scaleByWidth);
}

// Function to update the overlay view
function updateOverlay() {
    // Get all selected vehicles
    const checkboxes = document.querySelectorAll('.vehicle-option input[type="checkbox"]');
    const selectedVehicles = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => ({
            id: checkbox.value,
            name: checkbox.parentElement.querySelector('.vehicle-name').textContent,
            length: parseInt(checkbox.dataset.length),
            width: parseInt(checkbox.dataset.width),
            color: checkbox.dataset.color
        }));

    // Clear the overlay container
    overlayContainer.innerHTML = '';

    // If no vehicles selected, show empty state and hide legend
    if (selectedVehicles.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'Select vehicles from the left to compare their footprints';
        overlayContainer.appendChild(emptyState);
        legend.style.display = 'none';
        return;
    }

    // Show legend
    legend.style.display = 'block';

    // Get container dimensions
    const containerWidth = overlayContainer.clientWidth;
    const containerHeight = overlayContainer.clientHeight;

    // Calculate dynamic scale
    const scale = calculateScale(selectedVehicles, containerWidth, containerHeight);

    // Draw parking spot (Swiss standard: interior 4800mm x 2320mm, white line 120mm)
    const parkingSpotInteriorLength = 4800;
    const parkingSpotInteriorWidth = 2320;
    const whiteLineWidth = 120;

    const parkingSpot = document.createElement('div');
    parkingSpot.className = 'parking-spot';
    parkingSpot.style.width = `${parkingSpotInteriorLength * scale}px`;
    parkingSpot.style.height = `${parkingSpotInteriorWidth * scale}px`;
    parkingSpot.style.borderWidth = `${whiteLineWidth * scale}px`;
    overlayContainer.appendChild(parkingSpot);

    // Create overlay for each selected vehicle
    selectedVehicles.forEach(vehicle => {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.className = 'overlay-vehicle';
        vehicleDiv.id = `overlay-${vehicle.id}`;

        // Calculate dimensions with dynamic scale
        const width = vehicle.length * scale;
        const height = vehicle.width * scale;

        // Set styles
        vehicleDiv.style.width = `${width}px`;
        vehicleDiv.style.height = `${height}px`;
        vehicleDiv.style.borderColor = vehicle.color;

        // Center the vehicle using transform
        vehicleDiv.style.left = '50%';
        vehicleDiv.style.top = '50%';
        vehicleDiv.style.transform = 'translate(-50%, -50%)';

        overlayContainer.appendChild(vehicleDiv);
    });

    // Update legend
    updateLegend(selectedVehicles);
}

// Function to update the legend
function updateLegend(vehicles) {
    legendList.innerHTML = '';

    vehicles.forEach(vehicle => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';

        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        colorBox.style.borderColor = vehicle.color;

        const textSpan = document.createElement('span');
        textSpan.className = 'legend-text';
        textSpan.textContent = vehicle.name;

        const dimsSpan = document.createElement('span');
        dimsSpan.className = 'legend-dims';
        dimsSpan.textContent = `${vehicle.length.toLocaleString()}mm × ${vehicle.width.toLocaleString()}mm`;

        legendItem.appendChild(colorBox);
        legendItem.appendChild(textSpan);
        legendItem.appendChild(dimsSpan);
        legendList.appendChild(legendItem);
    });
}

// Load vehicles from CSV and initialize the application
loadVehicles();
