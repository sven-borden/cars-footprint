// Scale: 1mm = 0.04px
const SCALE = 0.04;

// Get all checkboxes and overlay container
const checkboxes = document.querySelectorAll('.vehicle-option input[type="checkbox"]');
const overlayContainer = document.getElementById('overlay-container');

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

    // If no vehicles selected, show empty state
    if (selectedVehicles.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'Select vehicles from the left to compare their footprints';
        overlayContainer.appendChild(emptyState);
        return;
    }

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
        vehicleDiv.style.backgroundColor = vehicle.color;

        // Center the vehicle using transform
        vehicleDiv.style.left = '50%';
        vehicleDiv.style.top = '50%';
        vehicleDiv.style.transform = 'translate(-50%, -50%)';

        // Add label
        const label = document.createElement('div');
        label.className = 'vehicle-label';
        label.innerHTML = `
            <span class="name">${vehicle.name}</span>
            <span class="dimension">${vehicle.length.toLocaleString()}mm × ${vehicle.width.toLocaleString()}mm</span>
        `;

        vehicleDiv.appendChild(label);
        overlayContainer.appendChild(vehicleDiv);
    });
}

// Add event listeners to all checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateOverlay);
});

// Initialize the view
updateOverlay();
