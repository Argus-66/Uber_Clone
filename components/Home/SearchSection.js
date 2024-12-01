"use client";

import React, { useState } from 'react';
import InputItem from './InputItem';

function SearchSection() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    const handleSelectLocation = (location, type) => {
        if (type === 'source') {
            setSource(location.description);
        } else {
            setDestination(location.description);
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

            <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
        </div>
    );
}

export default SearchSection;
