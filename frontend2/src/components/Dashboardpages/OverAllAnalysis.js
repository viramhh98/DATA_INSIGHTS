import React, { useState, useEffect } from 'react';
import Sidepannel from '../mainpages/Sidepannel';
import Navbar from '../mainpages/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';
import Footer from '../mainpages/Footer';

const OverAllAnalysis = () => {
    const [formData, setFormData] = useState({
        state: '',
        district: '',
        taluka: '',
    });

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredTalukas, setFilteredTalukas] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const standards = ['5', '6', '7', '8', '9', '10', '11', '12'];

    // Fetch student data
    const fetchStudentData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/addActiveStudent/');
            setStudentsData(response.data);
            filterData(response.data, formData);
        } catch (error) {
            console.error('Failed to fetch student data', error);
        }
    };

    // Format data for the bar chart
    const formatChartData = (data) => {
        const stdCountMap = {};
        data.forEach((student) => {
            const std = student.School_std;
            stdCountMap[std] = (stdCountMap[std] || 0) + 1;
        });

        return standards.map((std) => ({
            School_std: std,
            count: stdCountMap[std] || 0,
        }));
    };

    const fetchInitialData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get_state_district_taluka_data/');
            const { total_states, total_districts, total_talukas } = response.data;

            setStates(total_states);
            setDistricts(total_districts);
            setTalukas(total_talukas);
        } catch (err) {
            console.log('Failed to fetch data');
        }
    };

    // Fetch initial data (states, districts, talukas) only once on mount
    useEffect(() => {
        fetchInitialData();
        fetchStudentData();
    }, []); // Empty array ensures this runs only once

    // Filter data based on state, district, taluka
    const filterData = (studentsData, filters) => {
        let filtered = studentsData;

        if (filters.state) {
            filtered = filtered.filter((student) => student.state === parseInt(filters.state));
        }

        if (filters.district) {
            filtered = filtered.filter((student) => student.district === parseInt(filters.district));
        }

        if (filters.taluka) {
            filtered = filtered.filter((student) => student.taluka === parseInt(filters.taluka));
        }

        setFilteredData(formatChartData(filtered));
    };

    // Handle state change and auto-filter
    const handleStateChange = (e) => {
        const selectedStateId = e.target.value;
        setFormData((prev) => ({ ...prev, state: selectedStateId, district: '', taluka: '' }));

        // Filter districts and reset talukas
        const filteredDistricts = districts.filter((district) => district.state.id === parseInt(selectedStateId));
        setFilteredDistricts(filteredDistricts);
        setFilteredTalukas([]);

        // Auto-filter data
        filterData(studentsData, { ...formData, state: selectedStateId, district: '', taluka: '' });
    };

    // Handle district change and auto-filter
    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        setFormData((prev) => ({ ...prev, district: selectedDistrictId, taluka: '' }));

        // Filter talukas
        const filteredTalukas = talukas.filter((taluka) => taluka.district.id === parseInt(selectedDistrictId));
        setFilteredTalukas(filteredTalukas);

        // Auto-filter data
        filterData(studentsData, { ...formData, district: selectedDistrictId, taluka: '' });
    };

    // Handle taluka change and auto-filter
    const handleTalukaChange = (e) => {
        const selectedTalukaId = e.target.value;
        setFormData((prev) => ({ ...prev, taluka: selectedTalukaId }));

        // Auto-filter data
        filterData(studentsData, { ...formData, taluka: selectedTalukaId });
    };
    return (
        <>
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden mt-16">
                <div className="w-1/4 p-0 bg-white-100 ">
                    <Sidepannel />
                </div>
                <div className="flex-1 p-4 bg-white-100 overflow-hidden">
                    <div className="flex flex-row mb-4 space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-2">State</label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleStateChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select state</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>{state.state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-2">District</label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleDistrictChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select district</option>
                                {filteredDistricts.map((district) => (
                                    <option key={district.id} value={district.id}>{district.district}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-2">Taluka</label>
                            <select
                                name="taluka"
                                value={formData.taluka}
                                onChange={handleTalukaChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="" >Select taluka</option>
                                {filteredTalukas.map((taluka) => (
                                    <option key={taluka.id} value={taluka.id}>{taluka.taluka}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center bg-transparent p-40 pt-23 pl-10 pb-0 rounded-md shadow-none">
                        {/* <h2 className="text-2xl text-gray-800 mb-4">Overall Analysis</h2> */}
                        <BarChart width={800} height={300} data={filteredData}>
                            <CartesianGrid stroke="none" />
                            <XAxis
                                dataKey="School_std"
                                tick={{ fontSize: 14, fill: '#666' }}
                                tickLine={false}
                                axisLine={true}
                                label={{ value: 'School Standard', position: 'bottom', offset: -8, fill: '#666' }}
                            />
                            <YAxis
                                label={{ value: 'No of students', angle: -90, position: 'insideLeft', offset: 10, fill: '#666' }}
                                tick={{ fontSize: 14, fill: '#666' }}
                                tickLine={false}
                                axisLine={true}
                                allowDecimals={false} // Ensures only integer values are shown
                                domain={[0, 'dataMax + 10']} // Starts Y-axis from 0 and goes slightly beyond max
                                tickFormatter={(value) => Number.isInteger(value) ? value : Math.round(value)} // Ensure integer values
                            />

                            <Tooltip />
                            <Bar
                                dataKey="count"
                                fill="#4f46e5" // Tailwind's bg-indigo-600 color
                                barSize={50}
                            />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default OverAllAnalysis;
