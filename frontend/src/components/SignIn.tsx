import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../reducers/AuthContext";

function SignIn() {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await API.post("/experiences/signin", { email, password });

            const user = res.data.user; // {id, email, role, userId}
            const token = res.data.token;

            // Store token and role in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role)
            localStorage.setItem("userId", user.id);
            localStorage.setItem("email", user.email);
            localStorage.setItem("userId", res.data.user.userId)

            // Update context
            dispatch({
                type: "LOGIN",
                payload: {
                    id: res.data.id,
                    email: res.data.email,
                    role: res.data.role,
                    token: res.data.token
                }
            });

            navigate("/");

        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* Left Image */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e)"
                }}
            />

            {/* Login Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
                <div className="w-full max-w-md px-8">
                    <h2 className="text-3xl font-bold mb-6">Sign In</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-3 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-3 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm mt-4">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;