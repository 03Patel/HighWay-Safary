import React, { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await API.post("/experiences/login", {
                email,
                password,
            });

            console.log(res.data); // debug

            const admin = res.data.admin;
            const token = res.data.token;

            if (!admin) {
                throw new Error("Admin data not found");
            }

            // save auth info
            localStorage.setItem("token", token);
            localStorage.setItem("role", admin.role);
            localStorage.setItem("email", admin.email);
            localStorage.setItem("userId", admin.id);

            // update context
            dispatch({
                type: "LOGIN",
                payload: {
                    id: admin.id,
                    email: admin.email,
                    role: admin.role,
                },
            });

            navigate("/");
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">

            {/* Left Side */}
            <div className="hidden md:flex w-1/2 items-center justify-center text-white p-12">
                <div>
                    <h1 className="text-5xl font-bold mb-4">Highway Safary</h1>
                    <p className="text-lg opacity-90">
                        Admin dashboard to manage bookings, users and experiences.
                    </p>
                </div>
            </div>

            {/* Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Admin Login
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
                                <Mail size={18} className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    className="w-full outline-none text-sm"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-gray-600">Password</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
                                <Lock size={18} className="text-gray-400 mr-2" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full outline-none text-sm"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} className="text-gray-500" />
                                    ) : (
                                        <Eye size={18} className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    <p className="text-xs text-gray-400 text-center mt-6">
                        Admin access only
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;