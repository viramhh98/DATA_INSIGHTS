import React from 'react';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const onlogout=()=>{
    localStorage.removeItem('username'); 
    localStorage.removeItem('role'); 
    navigate('/')
  }

  return (
    <div className="fixed top-0 left-72 w-[calc(100%-18rem)] bg-blue-700 text-white h-16 flex items-center justify-between px-4 shadow-md z-50">
      <div className="text-lg font-semibold">
        DATA INSIGHTS
      </div>
      <button className="bg-white hover:bg-gray-200 text-blue-500 font-semibold py-2 px-4 rounded"onClick={onlogout}>
        LogOut
      </button>
    </div>
  );
}

export default Navbar;
