import React, { useState } from 'react';
import data from './car/carData.json';

function ChooseSelector({ handleChange1 }) {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
        setSelectedModel(''); // Reset selected model when brand changes
        handleChange1("hangXe", event.target.value)
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
        handleChange1("mauXe", event.target.value)
    };

    return (
        <>
            <div className="flex-col flex w-[calc(50%-30px)]">
                <label htmlFor="brand">Hãng xe</label>
                <select id="brand" value={selectedBrand} onChange={handleBrandChange} className='p-2 border mt-2 rounded-md cursor-pointer'>
                    <option value="">Chọn hãng xe</option>
                    {data.hangXe.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            <div className="flex-col flex w-[calc(50%-30px)]">
                <label htmlFor="model">Mẫu xe</label>
                <select id="model" value={selectedModel} onChange={handleModelChange} className='p-2 border mt-2 rounded-md cursor-pointer'>
                    <option value="">Chọn mẫu xe</option>
                    {selectedBrand && (
                        data.xe[selectedBrand].map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))
                    )}
                </select>
            </div>


            {/* {selectedBrand && selectedModel && (
                <div>
                    <p>You selected: {selectedBrand} - {selectedModel}</p>
                </div>
            )} */}

        </>
    );
}

export default ChooseSelector;
