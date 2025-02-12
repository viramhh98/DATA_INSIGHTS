// const Signup=()=>{
//     return(
//         <h1>Signup page</h1>
//     );
// }
// export default Signup
import React, { useState } from 'react';
import axios from 'axios';
import Loginimg from '../images/education.png'
import {Link } from "react-router-dom";

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userUsername, setUserUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/signup/', {
                user_name: userName,
                user_email: userEmail,
                user_username: userUsername,
                user_password: userPassword,
            });
            setMessage(response.data.message);
            setError(null);
        } catch (err) {
            setError(err.response.data.message);
            setMessage('');
        }
    };
    return (
        <>
            <>
                <div className='h-screen '>
                    <section className="h-full  text-gray-600 bg-sky-400 body-font">
                        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                                <h1 className="title-font font-medium text-6xl text-gray-900 pb-10">Data Insights</h1>
                                {<img src={Loginimg} alt="symbol" />}
                            </div>
                            <div className=" lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg pt-8 pb-8 pl-10 pr-10 flex flex-col md:ml-30 w-full mt-10 md:mt-20 bg-white">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h2 className="text-black text-lg text-center font-medium title-font mb-5">SignUp To DataInsights</h2>

                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={userUsername}
                                        onChange={(e) => setUserUsername(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign up</button>
                                    <p className="text-xs text-gray-500 mt-3">Already have an account? <span className='text-sky-600'><Link to="/" >Login</Link></span></p>

                                    {error && <p className="text-red-600">{error}</p>}
                                    {message && <p className="text-green-600">{message}</p>}
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </>
        </>

    );
};

export default Signup;
