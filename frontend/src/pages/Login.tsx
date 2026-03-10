import React, { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await API.post("/experiences/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            dispatch({ type: "LOGIN", payload: { token: response.data.token } });

            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">

            {/* Left Panel */}
            <div className="hidden md:flex w-1/2 text-white items-center justify-center flex-col p-12">
                <h1 className="text-5xl font-bold mb-4">Highway Safary</h1>
                <p className="text-lg opacity-90 max-w-md text-center">
                    Admin dashboard to manage bookings, experiences and users easily.
                </p>
            </div>

            {/* Login Card */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="w-full max-w-md backdrop-blur-lg bg-white/90 rounded-2xl shadow-2xl p-8">

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Admin Login
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-600">Email</label>

                            <div className="flex items-center border rounded-lg mt-1 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                                <Mail size={18} className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-gray-600">Password</label>

                            <div className="flex items-center border rounded-lg mt-1 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                                <Lock size={18} className="text-gray-400 mr-2" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full outline-none text-sm"
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

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition flex justify-center items-center"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Admin access only
                    </p>

                </div>
            </div>

        </div>
    );
};

export default Login;