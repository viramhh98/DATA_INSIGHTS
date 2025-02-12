import React, { useState, useEffect } from 'react';
import Sidepannel from '../mainpages/Sidepannel';
import Navbar from '../mainpages/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import axios from 'axios';
import Footer from '../mainpages/Footer';
const OverAllAnalysis = () => {
    const [formData, setFormData] = useState({
        district: '',
        reason: '',
        caste: '',
        gender: '',
        standard: '',
    });

    const [districts, setDistricts] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [reasons, setReasons] = useState([]);
    const [genders, setGenders] = useState([]);
    const [standards] = useState(['5', '6', '7', '8', '9', '10', '11', '12']);

    // Fetch student data
    const fetchStudentData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/addInActiveStudent/');
            setStudentsData(response.data);
            filterData(response.data, formData);
        } catch (error) {
            console.error('Failed to fetch student data', error);
        }
    };

    // Fetch initial data (districts)
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_state_district_taluka_data/');
                console.log('Initial data response:', response.data);
                const { total_districts } = response.data;
                setDistricts(total_districts || []);
                setFilteredDistricts(total_districts || []);
                setReasons([
                    'Academic Challenges',
                    'Financial Issues',
                    'Family Issues',
                    'Health Problems',
                    'Lack of Interest',
                    'Poor School Environment',
                    'Employment',
                    'Educational Opportunities',
                    'Transportation Issues',
                    'Personal Issues',
                    'Relocation',
                    'Bullying',
                    'Inadequate Infrastructure',
                    'Cultural or Religious Reasons',
                    'Language Barriers',
                    'Legal Issues',
                    'Substance Abuse',
                    'Safety Concerns',
                    'Academic Performance Pressure',
                    'Lack of Parental Support',
                    'School Fees',
                    'None'
                ]);
                setGenders([
                    'Male',
                    'Female',
                    'Other'
                ]);
            } catch (err) {
                console.log('Failed to fetch data', err);
            }
        };

        fetchInitialData();
        fetchStudentData();
    }, []);

    // Format data for the bar chart class wise
    const formatChartData = (data) => {
        const stdCountMap = {};
        data.forEach((student) => {
            const std = student.School_std;
            if (stdCountMap[std]) {
                stdCountMap[std]++;
            } else {
                stdCountMap[std] = 1;
            }
        });

        return standards.map((std) => ({
            School_std: std,
            count: stdCountMap[std] || 0,
        }));
    };

    // Calculate gender wise
    const calculateGenderProportions = (data) => {
        const genderCount = data.reduce((acc, student) => {
            acc[student.gender] = (acc[student.gender] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(genderCount).map(gender => ({
            name: gender,
            value: genderCount[gender]
        }));
    };

    // Filter data based on multiple criteria
    const filterData = (studentsData, filters) => {
        let filtered = studentsData;

        if (filters.district) {
            filtered = filtered.filter((student) => student.district === parseInt(filters.district));
        }

        if (filters.reason) {
            filtered = filtered.filter((student) => student.reason === filters.reason);
        }

        if (filters.caste) {
            filtered = filtered.filter((student) => student.Cast === filters.caste);
        }

        if (filters.gender) {
            filtered = filtered.filter((student) => student.gender === filters.gender);
        }

        if (filters.standard) {
            filtered = filtered.filter((student) => student.School_std === filters.standard);
        }

        setFilteredData(formatChartData(filtered));
        setGenderData(calculateGenderProportions(filtered));
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        filterData(studentsData, { ...formData, [name]: value });
    };

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex flex-1 overflow-hidden mt-16">
                    <div className="w-1/4 p-0 bg-white-100">
                        <Sidepannel />
                    </div>
                    <div className="flex-1 p-4 bg-white-100 overflow-hidden">
                        <div className="flex flex-row mb-4 space-x-4">
                            {/* District Filter */}
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">District</label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="">All district</option>
                                    {filteredDistricts.map((district) => (
                                        <option key={district.id} value={district.id}>{district.district}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Reason Filter */}
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Reason</label>
                                <select
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="">All reason</option>
                                    {reasons.map((reason) => (
                                        <option key={reason} value={reason}>{reason}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Caste Filter */}
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Caste</label>
                                <select
                                    name="caste"
                                    value={formData.caste}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="">All Caste</option>
                                    <option value="General">General</option>
                                    <option value="OBC">Other Backward Classes (OBC)</option>
                                    <option value="SC">Scheduled Castes (SC)</option>
                                    <option value="ST">Scheduled Tribes (ST)</option>
                                    <option value="EWS">Economically Weaker Sections (EWS)</option>
                                </select>
                            </div>
                            {/* Gender Filter */}
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="">All gender</option>
                                    {genders.map((gender) => (
                                        <option key={gender} value={gender}>{gender}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Standard Filter */}
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-2">Standard</label>
                                <select
                                    name="standard"
                                    value={formData.standard}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    <option value="">All standard</option>
                                    {standards.map((std) => (
                                        <option key={std} value={std}>{std}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center bg-transparent p-40 pt-0 pl-10 pb-0 rounded-md shadow-none">
                            <h2 className="text-xl text-black mb-4">Standard wise Dropout Analysis</h2>
                            <BarChart width={800} height={250} data={filteredData}>
                                <CartesianGrid stroke="none" />
                                <XAxis
                                    dataKey="School_std"
                                    tick={{ fontSize: 10, fill: '#666' }}
                                    tickLine={false}
                                    axisLine={true}
                                    tickFormatter={(value) => `Standard ${value}`}
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
                            <h2 className="text-xl text-black mt-3">Gender Proportion</h2>
                            
                            <PieChart width={300} height={200}>
                                <Pie
                                    data={genderData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={75}
                                    innerRadius={45}
                                    label
                                    labelLine={false}
                                >
                                    {genderData.map((entry, index) => {
                                        let fillColor;
                                        if (entry.name == 'Male') {
                                            fillColor = '#fbbf24'; // Yellow
                                        } else if (entry.name =='Female') {
                                            fillColor = '#3b82f6'; // Blue
                                        } else {
                                            fillColor = '#34d399'; // Green
                                        }
                                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                                    })}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    layout="vertical"
                                    verticalAlign="middle"
                                    align="right"
                                    formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
                                />
                            </PieChart>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OverAllAnalysis;
