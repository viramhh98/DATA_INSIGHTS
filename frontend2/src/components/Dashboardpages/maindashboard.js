import Sidepannel from '../mainpages/Sidepannel';
import Navbar from '../mainpages/Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../mainpages/Footer';
function Maindashboard() {
    const [data, setData] = useState({
        total_states: 0,
        total_districts: 0,
        total_talukas: 0,
        total_students: 0,
        total_female_students: 0,
        total_male_students: 0,
        total_other_students: 0,
        total_active_students: 0,
        total_inactive_students: 0,
        dropout_without_reason: 0,
        dropout_with_reason: 0,
        total_schools: 0,
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/dashboard/');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="flex min-h-screen bg-gray-100 pb-8">
                <div className="w-1/4 bg-white ">
                    <Sidepannel />
                </div>
                <div className="w-3/4">
                    <Navbar />
                    <div className="p-6 mt-16 bg-white">
                        <section className="text-gray-600 body-font">
                            <div className="container mx-auto">
                                <div className="flex flex-wrap -m-4">
                                    {[
                                        { title: "Total States", value: data.total_states },
                                        { title: "Total Districts", value: data.total_districts },
                                        { title: "Total Talukas", value: data.total_talukas },
                                        { title: "Total Students", value: data.total_students },
                                        { title: "Total Female Students", value: data.total_female_students },
                                        { title: "Total Male Students", value: data.total_male_students },
                                        { title: "Total Other Students", value: data.total_other_students },
                                        { title: "Total Active Students", value: data.total_active_students },
                                        { title: "Total Inactive Students", value: data.total_inactive_students },
                                        { title: "Dropout without Reason", value: data.dropout_without_reason },
                                        { title: "Dropout with Reason", value: data.dropout_with_reason },
                                        { title: "Total Schools", value: data.total_schools },
                                    ].map((item, index) => (
                                        <div key={index} className="xl:w-1/3 md:w-1/2 p-4">
                                            <div className="bg-gray-100 border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="w-6 h-6"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>

                                                    </svg>
                                                </div>
                                                <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">{item.title}</h2>
                                                <p className="leading-relaxed text-xl text-gray-800 font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                    
                </div>
            </div>
                            <Footer />
        </>
    );
}


export default Maindashboard;
