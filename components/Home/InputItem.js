"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function InputItem({ type, onSelect, isClearable = false }) {
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);

    // Function to fetch autocomplete results from Ola Maps API
    const fetchSuggestions = async (query) => {
        if (query.length > 2) { // Start searching after 3 characters
            const response = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=${query}&api_key=LAGydV3iTAvNppYgiIXUHA1PV6kAfJFwb76reivs`);

            const data = await response.json();
            setResults(data.predictions || []);
        } else {
            setResults([]); // Clear results when input is short
        }
    };

    useEffect(() => {
        if (inputValue) {
            fetchSuggestions(inputValue);
        }
    }, [inputValue]);

    const handleSelect = (result) => {
        setInputValue(result.description);
        onSelect(result);
        console.log(`Selected place: ${result.description}`);
        console.log(`Type: ${type}`);
        if (result.geometry && result.geometry.location) {
            console.log(`Latitude: ${result.geometry.location.lat}, Longitude: ${result.geometry.location.lng}`);
        } else {
            console.error("No geometry information available.");
        }
        setResults([]); // Clear results after selection
    };

    const clearInput = () => {
        setInputValue('');
        setResults([]);
    };

    return (
        <div className='relative bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
            <Image
                src={type === 'source' ? '/source.png' : '/dest.png'}
                width={15}
                height={15}
                alt='source'
            />
            <input
                type='text'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={type === 'source' ? 'Pickup Location' : 'DropOff Location'}
                className='bg-transparent w-full outline-none'
            />
            {isClearable && inputValue && (
                <button onClick={clearInput} className="ml-2 bg-red-500 text-white rounded-full px-2 py-1">
                    Clear
                </button>
            )}
            {results.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto z-50">
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className="p-3 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(result)}
                        >
                            <p>{result.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default InputItem;
