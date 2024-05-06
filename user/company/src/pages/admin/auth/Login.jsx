import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import adminBg from "../../../assets/admin_bg.png"; // Import the image
import { Checkbox } from '@nextui-org/react'; 
import Logo from "../../../assets/header.png";
import { apiRequest } from "../../../utils";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Access the navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiRequest({
                method: "POST",
                url: "/auth/admin/login",
                data: formData
            });
            navigate("/AdminDashboard");
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    return (
        <>
            <style>{`
                body {
                    overflow-y: hidden; /* Make the page not scrollable */
                }
                .login-container {
                    background-color: rgba(255, 255, 255, 0.95); 
                    border-radius: 10px; 
                    padding: 20px; 
                    margin-top: 0px; 
                    margin-right: 40px; 
                }
                .form-background {
                    background-color: rgba(255, 255, 255, 0.8); /* Add color to the form */
                    padding: 20px; /* Add padding to the form */
                    border-radius: 10px; /* Add border radius to the form */
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); /* Add shadow with darker color */
                }
            `}</style>
            <main>
                <section className="relative w-full h-full py-10 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: `url(${adminBg})`, // Use the imported image
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full login-container"> {/* Add login-container class */}
                        <div className="flex items-start"> {/* Align items to start (left side) */}
                            <div className="w-full lg:w-5/12 px-6">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg bg-blueGray-200 border-0 form-background"> {/* Add form-background class */}
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="h-16 w-30 mx-auto my-4 justify-items-center" // Adjust logo size and margin
                                    />
                                    <h2 className="text-center text-xl font-bold mb-6 uppercase">Sign In as Admin</h2>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form onSubmit={handleSubmit}>
                                            <div className="relative w-full mb-4"> {/* Reduce margin bottom */}
                                                <label
                                                    className="text-left block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Email"
                                                />
                                            </div>

                                            <div className="relative w-full mb-4"> {/* Reduce margin bottom */}
                                                <label
                                                    className="text-left block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <div className="flex items-center mb-4"> {/* Reduce margin bottom */}
                                                <Checkbox
                                                    defaultChecked={false}
                                                    onChange={(event) => console.log(event.target.checked)}
                                                    color="success"
                                                >
                                                    Remember me
                                                </Checkbox>

                                                <Link to="/forgot-password" className="ml-auto text-sm text-green-600 hover:text-green-500">
                                                    Forgot your password?
                                                </Link>
                                            </div>

                                            <div className="text-center">
                                                <button
                                                    className="rounded-md bg-[#14532d] px-8 py-2 text-sm font-medium text-white outline-none hover:bg-[#C1E1C1] hover:text-[#14532d]"
                                                    type="submit"
                                                >
                                                    Sign In
                                                </button>
                                                <p className="mt-4 mb-2 text-sm text-green-700">
                                                    Don't have an account?{" "}
                                                </p>
                                                <p className="text-sm text-green-700">
                                                    <Link to="/auth/register" className="text-green-700 hover:underline">Create Account</Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
