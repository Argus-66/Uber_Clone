// RouteHandler.js
import { globalMap, globalOlaMaps } from './MapHandler';

// Function to draw a route on the map
export async function drawRoute(map, source, destination) {
    if (!map || !globalOlaMaps) {
        console.error('Map or OlaMaps is not initialized');
        return;
    }

    try {
        console.log('Drawing route from source:', source, 'to destination:', destination);

        // Construct the API URL and request options
        const url = 'https://api.olamaps.io/routing/v1/directions';
        const params = new URLSearchParams({
            origin: `${source.lat},${source.lng}`,
            destination: `${destination.lat},${destination.lng}`,
            api_key: 'LAGydV3iTAvNppYgiIXUHA1PV6kAfJFwb76reivs'
        }).toString();

        console.log('Request URL:', url);
        console.log('Request Params:', params);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Request-Id': 'XXX'
            },
            body: JSON.stringify({ params })
        });

        console.log('Response:', response);

        const data = await response.json();

        console.log('Route API response:', data);

        if (data.routes && data.routes.length > 0) {
            const route = data.routes[0];

            console.log('Route found:', route);

            // Create a GeoJSON source with the route data
            if (map.getSource('route')) {
                map.removeLayer('route');
                map.removeSource('route');
            }

            map.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: route.geometry
                }
            });

            console.log('Route source added');

            // Add a layer to display the route
            map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });

            console.log('Route layer added successfully');
        } else {
            console.error('No route found in API response');
        }
    } catch (error) {
        console.error('Error drawing route:', error);
    }
}
