"use client";

import React, { useEffect } from 'react'
import '../../OlaMapsWebSDK/dist/style.css';
import { initializeMap } from './MapHandler';

function OlaMapSection() {
    useEffect(() => {
        // Initialize the map with default center and zoom
        initializeMap('map', [77.709701, 13.200663], 15);
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '500px' }}>
            {/* Map will be rendered here */}
        </div>
    );
}

export default OlaMapSection;