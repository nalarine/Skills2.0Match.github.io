import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import adminBg from "../../../assets/admin_bg.png";
import Logo from "../../../assets/header.png";
import { apiRequest } from "../../../utils";


export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
    const navigate = useNavigate();

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
                url: "/auth/admin/register",
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
                .login-container {
                    background-color: rgba(255, 255, 255, 0.95); 
                    border-radius: 10px; 
                    padding: 20px; 
                    margin-top: -20px; 
                    margin-right: 40px; 
                }
                .form-background {
                    background-color: rgba(255, 255, 255, 0.8); 
                    padding: 20px; 
                    border-radius: 10px; 
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); 
                }
            `}</style>
            <main>
                <section className="relative w-full h-full py-10 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: `url(${adminBg})`,
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full login-container">
                        <div className="flex items-start">
                            <div className="w-full lg:w-5/12 px-6">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg bg-blueGray-200 border-0 form-background">
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="h-16 w-30 mx-auto my-4 justify-items-center"
                                    />
                                    <h2 className="text-center text-xl font-bold mb-6 uppercase">Create Admin Account</h2>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <form onSubmit={handleSubmit}>
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="text-left block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                                    htmlFor="firstName"
                                                >
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="First Name"
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="text-left block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                                    htmlFor="lastName"
                                                >
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Last Name"
                                                />
                                            </div>

                                            <div className="relative w-full mb-3">
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

                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="text-left block uppercase text-blueGray-600 text-sm font-bold mb-2"
                                                    htmlFor="password"
                                                >
                                                    Password
                                                </label>
                                                <Input.Password
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    placeholder="Password"
                                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} // Custom icon render for password visibility toggle
                                                />
                                            </div>

                                            <div className="text-center mt-6">
                                                <button
                                                    className="rounded-md bg-[#14532d] px-8 py-2 text-sm font-medium text-white outline-none hover:bg-[#C1E1C1] hover:text-[#14532d]"
                                                    type="submit"
                                                >
                                                    Create Account
                                                </button>
                                                <p className="mt-4 text-sm text-green-700">
                                                    Already have an account?{" "}
                                                </p>
                                                <p className="text-sm text-green-700">
                                                    <Link to="/auth/login" className="text-green-700 hover:underline">Sign In</Link>
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
