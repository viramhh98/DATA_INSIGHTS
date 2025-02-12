
// import Sidepannel from '../mainpages/Sidepannel';
// import Navbar from '../mainpages/Navbar';
// import React, { useEffect, useState } from 'react';
// import GujaratMap from '../Maps/Maps';
// import axios from 'axios';
// import Footer from '../mainpages/Footer';

// const StateMap = () => {
//     const [districtData, setDistrictData] = useState([]);
//     const [districtIdToName, setDistrictIdToName] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const studentResponse = await axios.get('http://127.0.0.1:8000/addInActiveStudent/');
//                 const studentData = studentResponse.data;

//                 const districtResponse = await axios.get('http://127.0.0.1:8000/get_state_district_taluka_data/');
//                 const districtData = districtResponse.data.total_districts;

//                 const idToNameMap = {};
//                 districtData.forEach(district => {
//                     idToNameMap[district.id] = district.district;
//                 });
//                 setDistrictIdToName(idToNameMap);
                
//                 const districtCount = {};
//                 studentData.forEach(student => {
//                     if (student.reason !== "None") {
//                         const districtId = student.district; // Ensure this is the correct field
//                         const districtName = idToNameMap[districtId];

//                         if (districtName) {
//                             if (!districtCount[districtName]) {
//                                 districtCount[districtName] = 0;
//                             }
//                             districtCount[districtName]++;
//                         } else {
//                             console.warn(`District ID ${districtId} not found in map`);
//                         }
//                     }
//                 });

//                 const sortedDistricts = Object.entries(districtCount)
//                     .map(([district, count]) => ({ district, count }))
//                     .sort((a, b) => b.count - a.count);

//                 const topDistricts = sortedDistricts.slice(0, 3).map((item, index) => ({
//                     district: item.district,
//                     color: index === 0 ? '#ff0000' : (index === 1 ? '#ffcccc' : '#ffe5e5'),
//                     count: item.count // Add the dropout count here
//                 }));

//                 setDistrictData(topDistricts);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <>
//             <div className="flex">
//                 <div className="w-1/4">
//                     <Sidepannel />
//                 </div>
//                 <Navbar />
//                 <div className="pt-20">
//                     <GujaratMap data={districtData} />
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default StateMap;


import Sidepannel from '../mainpages/Sidepannel';
import Navbar from '../mainpages/Navbar';
import React, { useEffect, useState } from 'react';
import GujaratMap from '../Maps/Maps';
import axios from 'axios';
import Footer from '../mainpages/Footer';

const StateMap = () => {
    const [districtData, setDistrictData] = useState([]);
    // Removed the unused districtIdToName variable

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentResponse = await axios.get('http://127.0.0.1:8000/addInActiveStudent/');
                const studentData = studentResponse.data;

                const districtResponse = await axios.get('http://127.0.0.1:8000/get_state_district_taluka_data/');
                const districtData = districtResponse.data.total_districts;

                const idToNameMap = {};
                districtData.forEach(district => {
                    idToNameMap[district.id] = district.district;
                });
                
                const districtCount = {};
                studentData.forEach(student => {
                    if (student.reason !== "None") {
                        const districtId = student.district; // Ensure this is the correct field
                        const districtName = idToNameMap[districtId];

                        if (districtName) {
                            if (!districtCount[districtName]) {
                                districtCount[districtName] = 0;
                            }
                            districtCount[districtName]++;
                        } else {
                            console.warn(`District ID ${districtId} not found in map`);
                        }
                    }
                });

                const sortedDistricts = Object.entries(districtCount)
                    .map(([district, count]) => ({ district, count }))
                    .sort((a, b) => b.count - a.count);

                const topDistricts = sortedDistricts.slice(0, 3).map((item, index) => ({
                    district: item.district,
                    color: index === 0 ? '#C62828' : (index === 1 ? '#FF0000' : '#FFCCBC'),
                    count: item.count // Add the dropout count here
                }));

                setDistrictData(topDistricts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="flex">
                <div className="w-1/4">
                    <Sidepannel />
                </div>
                <Navbar />
                <div className="pt-20">
                    <GujaratMap data={districtData} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default StateMap;
