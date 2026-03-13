import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import API from "../api/axios";

function SignUp() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {


            const res = await API.post("/experiences/signup", form);

            alert(res.data.message || "Account created successfully");

            navigate("/signin");

        } catch (err: any) {

            alert(err.response?.data?.message || "Signup failed");

        }
    };

    return (
        <div className="min-h-screen flex">

            {/* Left Image */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)"
                }}
            />

            {/* Form */}
            <div className="flex w-full md:w-1/2 items-center justify-center bg-white">

                <div className="w-full max-w-md px-8">

                    <h2 className="text-3xl font-bold mb-6">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="relative">
                            <User size={18} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="w-full border p-3 pl-10 rounded-md"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full border p-3 pl-10 rounded-md"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full border p-3 pl-10 rounded-md"
                                onChange={handleChange}
                            />
                        </div>

                        <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                            Sign Up
                        </button>

                    </form>

                    <p className="text-sm mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500">
                            Sign In
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default SignUp;