import React, { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";

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
        <div className="min-h-screen flex">


            <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center flex-col p-10">
                <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
                <p className="text-lg opacity-90 text-center max-w-md">
                    Manage your experiences, bookings and users easily from the admin panel.
                </p>
            </div>


            <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Admin Login
                    </h2>

                    {error && (
                        <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">


                        <div>
                            <label className="text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>


                        <div>
                            <label className="text-sm text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-sm text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>


                    <p className="text-center text-sm text-gray-500 mt-6">
                        Admin Panel Access Only
                    </p>

                </div>
            </div>

        </div>
    );
};

export default Login;