// Scale: 1mm = 0.04px
const SCALE = 0.04;

// Get all checkboxes, overlay container, and legend elements
const checkboxes = document.querySelectorAll('.vehicle-option input[type="checkbox"]');
const overlayContainer = document.getElementById('overlay-container');
const legend = document.getElementById('legend');
const legendList = document.getElementById('legend-list');

// Vehicle name mapping
const vehicleNames = {
    'skoda-citigo': 'Skoda Citigo',
    'tesla-model3': 'Tesla Model 3 2024',
    'ioniq5': 'Hyundai Ioniq 5',
    'tesla-modely': 'Tesla Model Y Juniper',
    'tesla-models': 'Tesla Model S 2024',
    'tesla-modelx': 'Tesla Model X'
};

// Function to update the overlay view
function updateOverlay() {
    // Get all selected vehicles
    const selectedVehicles = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => ({
            id: checkbox.value,
            name: vehicleNames[checkbox.value],
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

    // Create overlay for each selected vehicle
    selectedVehicles.forEach(vehicle => {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.className = 'overlay-vehicle';
        vehicleDiv.id = `overlay-${vehicle.id}`;

        // Calculate dimensions with scale
        const width = vehicle.length * SCALE;
        const height = vehicle.width * SCALE;

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

// Add event listeners to all checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateOverlay);
});

// Initialize the view
updateOverlay();
