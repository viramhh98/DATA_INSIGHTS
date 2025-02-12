import React, { useState, useEffect } from 'react';
import Sidepannel from '../mainpages/Sidepannel';
import axios from 'axios';

const AddSchool = () => {
    const [formData, setFormData] = useState({
        state: '',
        district: '',
        taluka: '',
        schoolName: '',
        schoolType: '',
        schoolMedium: ''
    });

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredTalukas, setFilteredTalukas] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_state_district_taluka_data/');
                const { total_states, total_districts, total_talukas } = response.data;

                setStates(total_states);
                setFilteredDistricts(total_districts);
                setDistricts(total_districts);
                setFilteredTalukas(total_talukas);
                setTalukas(total_talukas);
            } catch (err) {
                console.log('Failed to fetch data')
            }
        };

        fetchData();
    }, []);

    // Handle state change
    const handleStateChange = (e) => {
        const selectedStateId = e.target.value;
        setSelectedState(selectedStateId);

        // Filter districts based on the selected state ID
        const filteredDistricts = districts.filter(district => district.state.id === parseInt(selectedStateId));
        setFilteredDistricts(filteredDistricts);
        setSelectedDistrict('');  // Reset district selection

        // Reset talukas when state changes
        const filteredTalukas = talukas.filter(taluka => 
            taluka.state.id === parseInt(selectedStateId) &&
            filteredDistricts.some(district => district.id === taluka.district.id)
        );
        setFilteredTalukas(filteredTalukas);

        // Update formData to reset district and taluka
        setFormData(prevFormData => ({
            ...prevFormData,
            state: selectedStateId,
            district: '',
            taluka: ''
        }));
    };
    
    // Handle district change
    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        setSelectedDistrict(selectedDistrictId);

        // Filter talukas based on the selected district ID
        const filteredTalukas = talukas.filter(taluka => taluka.district.id === parseInt(selectedDistrictId));
        setFilteredTalukas(filteredTalukas);

        // Update formData to reset taluka
        setFormData(prevFormData => ({
            ...prevFormData,
            district: selectedDistrictId,
            taluka: ''
        }));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/addschool/', formData);
            console.log('School added successfully:', response.data);

            setFormData({
                state: '',
                district: '',
                taluka: '',
                schoolName: '',
                schoolType: '',
                schoolMedium: ''
            });
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error:', error.request);
            } else {
                // Something went wrong in setting up the request
                console.error('Error:', error.message);
            }
        }
    };

    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <div className="w-1/4">
                    <Sidepannel />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col items-center justify-center p-8">
                        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add School</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">State</label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleStateChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="" >Select state</option>
                                        {states.map((state) => (
                                            <option key={state.id} value={state.id}>{state.state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">District</label>
                                    <select
                                        name="district"
                                        value={formData.district}
                                        onChange={handleDistrictChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="" >Select district</option>
                                        {filteredDistricts.map((district) => (
                                            <option key={district.id} value={district.id}>{district.district}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Taluka</label>
                                    <select
                                        name="taluka"
                                        value={formData.taluka}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="" disabled>Select taluka</option>
                                        {filteredTalukas.map((taluka) => (
                                            <option key={taluka.id} value={taluka.id}>{taluka.taluka}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">School Name</label>
                                    <input
                                        type="text"
                                        name="schoolName"
                                        value={formData.schoolName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter school name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">School Type</label>
                                    <select
                                        name="schoolType"
                                        value={formData.schoolType}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select school type</option>
                                        <option value="Government School">Government School</option>
                                        <option value="Private School">Private School</option>
                                        <option value="International School">International School</option>
                                        <option value="Public School">Public School</option>
                                    </select>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">School Medium</label>
                                    <select
                                        name="schoolMedium"
                                        value={formData.schoolMedium}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select school medium</option>
                                        <option value="English Medium">English Medium</option>
                                        <option value="Gujarati Medium">Gujarati Medium</option>
                                        <option value="Hindi Medium">Hindi Medium</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                                >
                                    Add School
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )};

    export default AddSchool