// OlaMapSection.js
"use client";

import React, { useEffect, useState } from "react";
import "../../OlaMapsWebSDK/dist/style.css";
import { initializeMap } from "./MapHandler";
import { drawRoute } from "./RouteHandler";

function OlaMapSection({ source, destination }) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        // Initialize the map
        const initializedMap = initializeMap("map", [77.709701, 13.200663], 15);
        setMap(initializedMap);

        return () => {
            // Cleanup map resources
            if (initializedMap) {
                initializedMap.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (
            map &&
            source?.coordinates?.lat &&
            source?.coordinates?.lng &&
            destination?.coordinates?.lat &&
            destination?.coordinates?.lng
        ) {
            console.log('Source coordinates:', source.coordinates);
            console.log('Destination coordinates:', destination.coordinates);
            drawRoute(map, source.coordinates, destination.coordinates);
        }
    }, [map, source, destination]);

    return (
        <div id="map" style={{ width: "100%", height: "500px" }}>
            {/* Map will be rendered here */}
        </div>
    );
}

export default OlaMapSection;
