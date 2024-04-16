import React, { useState, useEffect } from 'react';

function AddressSelector() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');


    useEffect(() => {
        // Fetch provinces/cities data
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://vapi.vnappmob.com/api/province');
                const data = await response.json();
                setProvinces(data.results);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    const handleProvinceChange = async (provinceId) => {
        try {
            const response = await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
            const data = await response.json();
            setDistricts(data.results);
            setSelectedProvince(provinceId);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const handleDistrictChange = async (districtId) => {
        try {
            const response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
            const data = await response.json();
            setWards(data.results);
            setSelectedDistrict(districtId);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleWardChange = (wardId) => {
        setSelectedWard(wardId);
        console.log('Selected ward:', wardId);
    };

    return (
        <div className="flex space-x-4">
            <select onChange={(e) => handleProvinceChange(e.target.value)} className="block w-1/3 px-4 py-2 bg-white border rounded-md focus:outline-none">
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>{province.province_name}</option>
                ))}
            </select>
            <select onChange={(e) => handleDistrictChange(e.target.value)} className="block w-1/3 px-4 py-2 bg-white border rounded-md focus:outline-none">
                <option value="">Chọn quận/huyện</option>
                {districts.map((district) => (
                    <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
                ))}
            </select>
            <select onChange={(e) => handleWardChange(e.target.value)} className="block w-1/3 px-4 py-2 bg-white border rounded-md focus:outline-none">
                <option value="">Chọn phường/xã</option>
                {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
                ))}
            </select>
        </div>
    );
};

export default AddressSelector;
