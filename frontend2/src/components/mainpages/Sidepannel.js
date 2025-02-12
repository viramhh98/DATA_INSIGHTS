// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Logo from '../images/logo.jpg';

// function Sidepannel() {
//   const location = useLocation();
//   const username = localStorage.getItem('username');

//   return (
//     <div className="flex flex-col h-screen w-72 fixed top-0 left-0 border-e bg-white overflow-y-auto">
//       <div className="px-4 py-2">
//         <div className="h-48 w-68">
//           <img src={Logo} className="h-full w-full object-contain" alt="symbol" />
//         </div>
//         <ul className="mt-6 space-y-1">
//           <li>
//             <Link
//               to="/dashboard"
//               className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/dashboard' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/statemap"
//               className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/statemap' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
//             >
//               State map
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/overallAnalysis"
//               className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/overallAnalysis' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
//             >
//               Overall Analysis
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/dropOutAnalysis"
//               className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/dropOutAnalysis' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
//             >
//               Dropout Analysis
//             </Link>
//           </li>
//           <li>
//             <details className="group">
//               <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
//                 <span className="text-sm font-medium">Redimies Resources</span>
//                 <span className="shrink-0 transition duration-300 group-open:-rotate-180">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="size-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </summary>
//               <ul className="mt-2 space-y-1 px-4">
//                 <li>
//                   <Link
//                     to="/remidies"
//                     className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//                   >
//                     Remidies
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/scholarship"
//                     className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//                   >
//                     Scholarship details
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>
//           <li>
//             <details className="group">
//               <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
//                 <span className="text-sm font-medium">Add Details</span>
//                 <span className="shrink-0 transition duration-300 group-open:-rotate-180">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="size-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </summary>
//               <ul className="mt-2 space-y-1 px-4">
//                 <li>
//                   <Link
//                     to="/addactivestudents"
//                     className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//                   >
//                     Add Active Students Details
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/dropoutstudent"
//                     className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//                   >
//                     Add Dropout Student Details
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/addschool"
//                     className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
//                   >
//                     Add School Details
//                   </Link>
//                 </li>
//               </ul>
//             </details>
//           </li>
//         </ul>
//       </div>

//       <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">

//         <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-12 h-12"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="7" r="4" fill="rgba(0, 0, 0, 0.7)" /> {/* Light black fill for the head */}
//             <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
//           </svg>



//           <div>
//             <p className="text-xs">
//               <strong className="block font-medium text-xl">{username}</strong>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidepannel;












import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../images/logo.jpg';

function Sidepannel() {
  const location = useLocation();
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role'); // Fetching the role from local storage

  return (
    <div className="flex flex-col h-screen w-72 fixed top-0 left-0 border-e bg-white overflow-y-auto">
      <div className="px-4 py-2">
        <div className="h-48 w-68">
          <img src={Logo} className="h-full w-full object-contain" alt="symbol" />
        </div>
        <ul className="mt-6 space-y-1">
          <li>
            <Link
              to="/dashboard"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/dashboard' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/statemap"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/statemap' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
            >
              State map
            </Link>
          </li>
          <li>
            <Link
              to="/overallAnalysis"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/overallAnalysis' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
            >
              Overall Analysis
            </Link>
          </li>
          <li>
            <Link
              to="/dropOutAnalysis"
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${location.pathname === '/dropOutAnalysis' ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
            >
              Dropout Analysis
            </Link>
          </li>

          {/* Show "Add Details" section for admin and volunteer */}
          {(role === 'admin' || role === 'volunteer') && (
            <li>
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium">Add Details</span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <Link
                      to="/addactivestudents"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Add Active Students Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dropoutstudent"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Add Dropout Student Details
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/addschool"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Add School Details
                    </Link>
                  </li>
                 
                </ul>
              </details>
            </li>
          )}

          <li>
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium">Remedies Resources</span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    to="/remidies"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Remedies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/scholarship"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Scholarship details
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="7" r="4" fill="rgba(0, 0, 0, 0.7)" /> {/* Light black fill for the head */}
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          </svg>

          <div>
            <p className="text-xs">
              <strong className="block font-medium text-xl">{username}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidepannel;



