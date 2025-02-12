import Sidepannel from '../mainpages/Sidepannel';
import Navbar from '../mainpages/Navbar';
import React from 'react';

const remedies = {
    "Academic Challenges": "Tutoring, study groups, personalized learning plans.",
    "Financial Issues": "Scholarships, financial aid, fee waivers.",
    "Family Issues": "Counseling, support groups, flexible schedules.",
    "Health Problems": "Medical care access, wellness programs.",
    "Lack of Interest": "Curriculum redesign, career counseling.",
    "Poor School Environment": "Infrastructure improvement, staff training.",
    "Employment": "Work-study programs, flexible schedules.",
    "Educational Opportunities": "Scholarships, internships.",
    "Transportation Issues": "School transportation, travel subsidies.",
    "Personal Issues": "Counseling, mentorship, flexible timelines.",
    "Relocation": "Transfer-friendly policies, online courses.",
    "Bullying": "Anti-bullying programs, counseling, strict policies.",
    "Inadequate Infrastructure": "Funding for improvements, community partnerships.",
    "Cultural or Religious Reasons": "Inclusive curriculum, sensitivity training.",
    "Language Barriers": "Bilingual education, peer tutoring.",
    "Legal Issues": "Legal aid, advocacy programs.",
    "Substance Abuse": "Rehabilitation programs, awareness campaigns.",
    "Safety Concerns": "Improved security, anti-violence education.",
    "Academic Performance Pressure": "Stress management workshops, balanced grading.",
    "Lack of Parental Support": "Parent engagement programs, mentorship.",
    "School Fees": "Scholarships, payment plans.",
};
const RemediesList = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100"> {/* Center container and full screen height */}
            <div className="w-full max-w-4xl px-4 py-8 bg-white shadow-lg rounded-lg"> {/* Centered box with rounded corners */}
                <h2 className="text-2xl font-bold mb-6 text-center">Remedies for Common Student Reasons</h2>
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border text-left">Problem</th>
                            <th className="py-2 px-4 border text-left">Remedy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(remedies).map(([problem, remedy], index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border">{problem}</td>
                                <td className="py-2 px-4 border">{remedy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Remidies = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100"> {/* Full screen height and background */}
                <div className="w-1/4">
                    <Sidepannel />
                </div>
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <div className="flex-1 flex justify-center items-center pt-20"> {/* Center RemediesList */}
                        <RemediesList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Remidies;
