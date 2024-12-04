// MapHandler.js
import { OlaMaps } from '../../OlaMapsWebSDK/dist/olamaps-js-sdk.es';

// Global variables to store the map and OlaMaps instances
export let globalMap = null;
export let globalOlaMaps = null;

// Function to initialize the map
export function initializeMap(containerId, center, zoom) {
    // Create OlaMaps instance
    const olaMapsInstance = new OlaMaps({
        apiKey: 'LAGydV3iTAvNppYgiIXUHA1PV6kAfJFwb76reivs',
    });

    // Store the OlaMaps instance globally
    globalOlaMaps = olaMapsInstance;

    // Initialize the map
    const mapInstance = olaMapsInstance.init({
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: containerId,
        center: center,
        zoom: zoom
    });

    // Store the map instance globally
    globalMap = mapInstance;

    return mapInstance;
}

// Function to add marker to the map
export function addMarkerToMap(coordinates, offset = [0, 0], anchor = 'center') {
    if (!globalMap) {
        console.error('Map is not initialized');
        return;
    }

    if (!globalOlaMaps) {
        console.error('OlaMaps is not initialized');
        return;
    }

    if (!coordinates || coordinates.lat == null || coordinates.lng == null) {
        console.error('Invalid coordinates', coordinates);
        return;
    }

    try {
        const marker = globalOlaMaps
            .addMarker({ 
                offset, 
                anchor 
            })
            .setLngLat([coordinates.lng, coordinates.lat])
            .addTo(globalMap);
        
        console.log('Marker added successfully', marker);
        return marker;
    } catch (error) {
        console.error('Error adding marker:', error);
    }
}