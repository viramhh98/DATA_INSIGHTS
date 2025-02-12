import React, { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';
import Loginimg from '../images/education.png'

// const Login=()=>{
//     return(
//         <>
//         <h1>Login page</h1>
//         <Link to="/signup">signup </Link>
//         </>
//     );
// }


const Login = () => {
    const [userUsername, setUserUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [wrongpassword, wrongpasswordmethod] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/signup/`, {
                params: {
                    email_or_username: userUsername,
                    user_password: userPassword
                }
            });
    
            const userData = response.data; // This now includes the role
    
            if (userData.user_password === userPassword) {
                wrongpasswordmethod('');
                setMessage(response.data.message);
                setError(null);
                console.log(userData);
    
                // Storing username and role in localStorage
                localStorage.setItem('username', userData.user_username); // Now accessing userData fields directly
                localStorage.setItem('role', userData.role); // Storing role directly from userData
    
                navigate('/dashboard');
            } else {
                wrongpasswordmethod("Wrong password");
                setMessage('');
            }
        } catch (err) {
            wrongpasswordmethod('');
            setError(err.response.data.error);
            setMessage('');
        }
    };
    


    return (
        <>
        <div className='h-screen'>
        <section className="h-screen  text-gray-600 bg-sky-400  body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-6xl text-gray-900 pb-10">Data Insights</h1>
                    {<img src={Loginimg} alt="symbol" />}
                    </div>
                <div className=" lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg pt-20 pb-20 pl-10 pr-10 flex flex-col md:ml-30 w-full mt-10 md:mt-20 bg-white">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-black text-lg text-center font-medium title-font mb-5">Login To DataInsights</h2>
                    <div className="relative mb-4">
                        <input type="text" id="full-name"value={userUsername} onChange={(e) => setUserUsername(e.target.value)} placeholder="username or email"name="full-name" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                    </div>
                    <div className="relative mb-4">
                        <input type="password" id="password" placeholder="password" value={userPassword}onChange={(e) => setUserPassword(e.target.value)} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                    </div>
                    <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                    {wrongpassword && <p className="text-red-600">{wrongpassword}</p>}
                    <p className="text-xs text-gray-500 mt-3">Create a new account? <span className='text-sky-600'><Link to="/signup" >Sign up</Link></span></p>
                </form>
                </div>
                {error && <p className="text-red-600">{error}</p>}
                {message && <p className="text-green-600">{message}</p>}
            </div>
        </section>
        </div>
        </>
    );
};

export default Login;
