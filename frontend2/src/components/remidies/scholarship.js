import Sidepannel from '../mainpages/Sidepannel';
import Navbar from '../mainpages/Navbar';
import React from 'react';

const scholarships = [
    {
        name: "Prime Minister's Scholarship Scheme",
        description: "Supports students from economically weaker sections pursuing higher education.",
        eligibility: "Family income below ₹6,00,000 per annum",
        amount: "Up to ₹50,000 per year",
        applicationLink: "https://www.myscheme.gov.in/schemes/pmss"
    },
    {
        name: "National Means-cum-Merit Scholarship",
        description: "For students from economically weaker sections who excel academically.",
        eligibility: "Must have scored at least 55% in Class 8",
        amount: "₹12,000 per year",
        applicationLink: "https://www.youthforseva.org/"
    },
    {
        name: "Post-Matric Scholarship for SC/ST Students",
        description: "Financial assistance for SC/ST students pursuing post-matric education.",
        eligibility: "Annual family income below ₹2,50,000",
        amount: "Varies by course",
        applicationLink: "https://socialjustice.gov.in/"
    },
    {
        name: "Indira Gandhi Scholarship for Single Girl Child",
        description: "Supports single girl children pursuing higher education.",
        eligibility: "Girl students up to the age of 30",
        amount: "₹36,200 per annum",
        applicationLink: "https://www.ugc.gov.in/Home"
    },
    {
        name: "National Scholarship for Students with Disabilities",
        description: "Supports students with disabilities pursuing higher education.",
        eligibility: "Disability certificate required",
        amount: "Varies based on course and institution",
        applicationLink: "https://depwd.gov.in/"
    }
];

function ScholarshipPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-1/4 bg-white">
                <Sidepannel />
            </div>
            <div className="w-3/4">
                <Navbar />
                <div className="p-6 mt-16 bg-white">
                    <section className="text-gray-600 body-font">
                        <div className="container mx-auto">
                            <h2 className="text-2xl font-bold mb-6 text-center">Available Scholarships</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border-collapse">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-3 px-4 text-left text-gray-700">Name</th>
                                            <th className="py-3 px-4 text-left text-gray-700">Description</th>
                                            <th className="py-3 px-4 text-left text-gray-700">Eligibility</th>
                                            <th className="py-3 px-4 text-left text-gray-700">Amount</th>
                                            <th className="py-3 px-4 text-left text-gray-700">Apply</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scholarships.map((scholarship, index) => (
                                            <tr key={index} className="hover:bg-gray-100 transition-colors duration-300">
                                                <td className="py-4 px-4">{scholarship.name}</td>
                                                <td className="py-4 px-4">{scholarship.description}</td>
                                                <td className="py-4 px-4">{scholarship.eligibility}</td>
                                                <td className="py-4 px-4">{scholarship.amount}</td>
                                                <td className="py-4 px-4">
                                                    <a 
                                                        href={scholarship.applicationLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="text-indigo-500 hover:text-indigo-700 transition-colors duration-300"
                                                    >
                                                        Apply Now
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ScholarshipPage;
