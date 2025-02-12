import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidepannel from '../mainpages/Sidepannel';

const DropoutStudents = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        gender: '',
        state: '',
        district: '',
        taluka: '',
        City_type: '',
        School_name: '',
        School_medium: '',
        School_std: '',
        ParentOccupation: '',
        ParentMaritalStatus: '',
        Family_income: '',
        Cast: '',
        Disabled: '',
        reason:'None',
        hasReason: 'No'
    });

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [school, setschools] = useState([]);

    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [filteredTalukas, setFilteredTalukas] = useState([]);
    const [filteredschools, setFilteredschools] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_state_district_taluka_data/');
                const { total_states, total_districts, total_talukas } = response.data;

                setStates(total_states);
                setDistricts(total_districts);
                setTalukas(total_talukas);
                setFilteredDistricts(total_districts);
                setFilteredTalukas(total_talukas);
            } catch (err) {
                console.log('Failed to fetch data');
            }
        };
        const fetchSchoolData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/addschool/');
                setschools(response.data);
                setFilteredschools(response.data)
                // console.log(response.data)


            } catch (err) {
                console.log('Failed to fetch data');
            }
        }
        fetchSchoolData();
        fetchData();
    }, []);

    const handleStateChange = (e) => {
        const selectedStateId = e.target.value;
        const filteredDistricts = districts.filter(district => district.state.id === parseInt(selectedStateId));

        setFilteredDistricts(filteredDistricts);
        setFormData({ ...formData, state: selectedStateId, district: '', taluka: '' });
        filterSchools(selectedStateId, formData.district, formData.taluka);
    };

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        const filteredTalukas = talukas.filter(taluka => taluka.district.id === parseInt(selectedDistrictId));

        setFilteredTalukas(filteredTalukas);
        setFormData({ ...formData, district: selectedDistrictId, taluka: '' });
        filterSchools(formData.state, selectedDistrictId, formData.taluka);
    };

    const handleTalukaChange = (e) => {
        const selectedTalukaId = e.target.value;
        setFormData({ ...formData, taluka: selectedTalukaId });
        filterSchools(formData.state, formData.district, selectedTalukaId);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:8000/addInActiveStudent/', formData);
            console.log('Student added successfully:', response.data);
            setFormData({
                studentName: '',
                gender: '',
                state: '',
                district: '',
                taluka: '',
                City_type: '',
                School_name: '',
                School_medium: '',
                School_std: '',
                ParentOccupation: '',
                ParentMaritalStatus: '',
                Family_income: '',
                Cast: '',
                Disabled: '',
                reason:'None',
                hasReason: 'No'
            });
        } catch (error) {
            if (error.response) {
                // The server responded with a status code other than 2xx
                console.error('Server response error:', error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('Request made but no response:', error.request);
            } else {
                // Something happened in setting up the request
                console.error('Error setting up request:', error.message);
            }
        }
        
    };

    const handleHasReasonChange = (e) => {
        setFormData({
            ...formData,
            hasReason: e.target.value,
            reason: e.target.value === 'Yes' ? formData.reason : 'None' // Reset reason if "No"
        });
    };

    const filterSchools = (stateId, districtId, talukaId) => {
        let filtered = school;

        if (stateId) {
            filtered = filtered.filter(school => school.state === parseInt(stateId));
        }
        if (districtId) {
            filtered = filtered.filter(school => school.district === parseInt(districtId));
        }
        if (talukaId) {
            filtered = filtered.filter(school => school.taluka === parseInt(talukaId));
        }

        setFilteredschools(filtered);
    };

    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <div className="w-1/4">
                    <Sidepannel />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add Student</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-6">

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">State</label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleStateChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select state</option>
                                        {states.map(state => (
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
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select district</option>
                                        {filteredDistricts.map(district => (
                                            <option key={district.id} value={district.id}>{district.district}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Taluka</label>
                                    <select
                                        name="taluka"
                                        value={formData.taluka}
                                        onChange={handleTalukaChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select taluka</option>
                                        {filteredTalukas.map(taluka => (
                                            <option key={taluka.id} value={taluka.id}>{taluka.taluka}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">City Type</label>
                                    <select
                                        name="City_type"
                                        value={formData.City_type}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select City Type</option>
                                        <option value="Rural">Rural</option>
                                        <option value="Urban">Urban</option>
                                        <option value="Metropolitan">Metropolitan</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">School Name</label>
                                    <select
                                        name="School_name"
                                        value={formData.School_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select School Name</option>
                                        {filteredschools.map(school => (
                                            <option key={school.schoolName} value={school.schoolName}>
                                                {school.schoolName}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">School Medium</label>
                                    <select
                                        name="School_medium"
                                        value={formData.School_medium}
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


                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Student Name</label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="Enter student name"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">School Standard</label>
                                    <select
                                        name="School_std"
                                        value={formData.School_std}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select school standard</option>
                                        {[...Array(8).keys()].map((num) => (
                                            <option key={num + 5} value={num + 5}>
                                                {num + 5}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Parent Occupation</label>
                                    <input
                                        type="text"
                                        name="ParentOccupation"
                                        value={formData.ParentOccupation}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="Enter parent occupation"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Parent Marital Status</label>
                                    <select
                                        name="ParentMaritalStatus"
                                        value={formData.ParentMaritalStatus}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select marital status</option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                </div>


                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Family Income</label>
                                    <select
                                        name="Family_income"
                                        value={formData.Family_income}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select Family Income</option>
                                        <option value="<2.5">Less than 2.5 Lakhs</option>
                                        <option value="2.5-5">2.5 - 5 Lakhs</option>
                                        <option value="5-7.5">5 - 7.5 Lakhs</option>
                                        <option value="7.5-10">7.5 - 10 Lakhs</option>
                                        <option value="10-12.5">10 - 12.5 Lakhs</option>
                                        <option value="12.5-15">12.5 - 15 Lakhs</option>
                                        <option value="15-20">15 - 20 Lakhs</option>
                                        <option value=">20">Above 20 Lakhs</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Caste</label>
                                    <select
                                        name="Cast"
                                        value={formData.Cast}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select Caste</option>
                                        <option value="General">General</option>
                                        <option value="OBC">Other Backward Classes (OBC)</option>
                                        <option value="SC">Scheduled Castes (SC)</option>
                                        <option value="ST">Scheduled Tribes (ST)</option>
                                        <option value="EWS">Economically Weaker Sections (EWS)</option>
                                    </select>
                                </div>


                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Disabled</label>

                                    <select
                                        name="Disabled"
                                        value={formData.Disabled}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select Disability Status</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="Unknown">Unknown</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>


                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Is there a reason for dropout?</label>
                                    <select
                                        name="hasReason"
                                        value={formData.hasReason}
                                        onChange={handleHasReasonChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>

                                {formData.hasReason === 'Yes' && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">Reason for Dropout</label>
                                    <select
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        required
                                    >
                                        <option value="">Select reason</option>
                                        <option value="Academic Challenges">Academic Challenges</option>
                                        <option value="Financial Issues">Financial Issues</option>
                                        <option value="Family Issues">Family Issues</option>
                                        <option value="Health Problems">Health Problems</option>
                                        <option value="Lack of Interest">Lack of Interest</option>
                                        <option value="Poor School Environment">Poor School Environment</option>
                                        <option value="Employment">Employment</option>
                                        <option value="Educational Opportunities">Educational Opportunities</option>
                                        <option value="Transportation Issues">Transportation Issues</option>
                                        <option value="Personal Issues">Personal Issues</option>
                                        <option value="Relocation">Relocation</option>
                                        <option value="Bullying">Bullying</option>
                                        <option value="Inadequate Infrastructure">Inadequate Infrastructure</option>
                                        <option value="Cultural or Religious Reasons">Cultural or Religious Reasons</option>
                                        <option value="Language Barriers">Language Barriers</option>
                                        <option value="Legal Issues">Legal Issues</option>
                                        <option value="Substance Abuse">Substance Abuse</option>
                                        <option value="Safety Concerns">Safety Concerns</option>
                                        <option value="Academic Performance Pressure">Academic Performance Pressure</option>
                                        <option value="Lack of Parental Support">Lack of Parental Support</option>
                                        <option value="School Fees">School Fees</option>
                                    </select>
                                </div>
                            )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Add Student
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DropoutStudents;
