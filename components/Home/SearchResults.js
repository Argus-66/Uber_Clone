import React from 'react';

function SearchResults({ results, onSelect }) {
    return (
        <div className="mt-4">
            {results.map((result, index) => (
                <div
                    key={index}
                    className="bg-slate-200 p-3 rounded-lg cursor-pointer hover:bg-slate-300"
                    onClick={() => onSelect(result)}
                >
                    <p>{result.displayName}</p>
                    <p className="text-gray-500">{result.address}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;