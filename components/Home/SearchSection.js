"use client";
import React, { useState } from 'react';
import InputItem from './InputItem';
import { addMarkerToMap } from './MapHandler';

function SearchSection() {
    const [source, setSource] = useState({
        description: '',
        coordinates: { lat: null, lng: null }
    });
    const [destination, setDestination] = useState({
        description: '',
        coordinates: { lat: null, lng: null }
    });

    const handleSelectLocation = (location, type) => {
        console.log("Selected location:", location);

        // Extract coordinates from the location object
        const coordinates = {
            lat: location.structured_formatting?.location_lat ||
                location.geometry?.location?.lat ||
                location.lat,
            lng: location.structured_formatting?.location_lng ||
                location.geometry?.location?.lng ||
                location.lng
        };

        console.log("Extracted coordinates:", coordinates);

        if (type === 'source') {
            setSource({
                description: location.description || location.formatted_address,
                coordinates: coordinates
            });
        } else {
            setDestination({
                description: location.description || location.formatted_address,
                coordinates: coordinates
            });
        }
    };

    const handleSearch = () => {
        // Ensure both source and destination have valid coordinates
        if (source.coordinates.lat && source.coordinates.lng) {
            console.log("Adding source marker:", source.coordinates);
            addMarkerToMap(source.coordinates);
        }

        if (destination.coordinates.lat && destination.coordinates.lng) {
            console.log("Adding destination marker:", destination.coordinates);
            addMarkerToMap(destination.coordinates);
        }
    };

    return (
        <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
            <p className='text-[20px] font-bold'>Get a ride</p>
            <InputItem
                type="source"
                onSelect={(location) => handleSelectLocation(location, 'source')}
                isClearable={true}
            />
            <InputItem
                type="destination"
                onSelect={(location) => handleSelectLocation(location, 'destination')}
                isClearable={true}
            />
            <button
                className='p-3 bg-black w-full mt-5 text-white rounded-lg'
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}

export default SearchSection;