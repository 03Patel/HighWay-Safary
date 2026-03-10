import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

interface TimeSlot {
    time: string;
    capacity: number;
    booked: number;
}

interface Slot {
    date: string;
    times: TimeSlot[];
}

interface Experience {
    _id?: string;
    title: string;
    slug: string;
    location: string;
    price: number;
    duration: string;
    description: string;
    image: string;
    slots: Slot[];
}

function AdminPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [experience, setExperience] = useState<Experience | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        API.get(`/experiences/${id}`)
            .then((res) => setExperience(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return <div className="text-center py-20 text-lg">Loading...</div>;

    if (!experience)
        return <div className="text-center py-20 text-lg">Not Found</div>;

    const handleChange = (field: keyof Experience, value: any) => {
        setExperience({ ...experience, [field]: value });
    };

    const handleSave = async () => {
        await API.put(`/experiences/${experience._id}`, experience);
        alert("Experience Updated Successfully");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            {/* PAGE HEADER */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Edit Experience
                </h1>
                <p className="text-gray-500">
                    Update experience details, slots and pricing
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-10">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">

                    {/* BASIC INFO */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Basic Information
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <label className="text-sm text-gray-500">Title</label>
                                <input
                                    value={experience.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Location</label>
                                <input
                                    value={experience.location}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">Description</label>
                                <textarea
                                    rows={4}
                                    value={experience.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                                />
                            </div>

                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Experience Image
                        </h2>

                        <input
                            value={experience.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                            className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-yellow-400 outline-none"
                            placeholder="Image URL"
                        />

                        <img
                            src={experience.image}
                            className="w-full h-80 object-cover rounded-lg shadow"
                        />
                    </div>

                    {/* SLOTS */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Slot Management
                        </h2>

                        {experience.slots.map((slot, slotIndex) => (
                            <div
                                key={slotIndex}
                                className="border rounded-lg p-4 mb-4 bg-gray-50"
                            >

                                <label className="text-sm text-gray-500">
                                    Date
                                </label>

                                <input
                                    value={slot.date}
                                    onChange={(e) => {
                                        const updated = [...experience.slots];
                                        updated[slotIndex].date = e.target.value;
                                        handleChange("slots", updated);
                                    }}
                                    className="border rounded-lg p-2 w-full mt-1 mb-4"
                                />

                                {slot.times.map((time, timeIndex) => (
                                    <div
                                        key={timeIndex}
                                        className="flex gap-3 mb-3"
                                    >

                                        <input
                                            value={time.time}
                                            placeholder="Time"
                                            onChange={(e) => {
                                                const updated = [...experience.slots];
                                                updated[slotIndex].times[timeIndex].time =
                                                    e.target.value;
                                                handleChange("slots", updated);
                                            }}
                                            className="border p-2 rounded-lg w-40"
                                        />

                                        <input
                                            type="number"
                                            value={time.capacity}
                                            placeholder="Capacity"
                                            onChange={(e) => {
                                                const updated = [...experience.slots];
                                                updated[slotIndex].times[timeIndex].capacity =
                                                    Number(e.target.value);
                                                handleChange("slots", updated);
                                            }}
                                            className="border p-2 rounded-lg w-32"
                                        />

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>

                {/* RIGHT PANEL */}
                <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-24">

                    <h2 className="text-lg font-semibold mb-6 text-gray-700">
                        Pricing & Duration
                    </h2>

                    <div className="space-y-4">

                        <div>
                            <label className="text-sm text-gray-500">Price</label>
                            <input
                                type="number"
                                value={experience.price}
                                onChange={(e) =>
                                    handleChange("price", Number(e.target.value))
                                }
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Duration</label>
                            <input
                                value={experience.duration}
                                onChange={(e) =>
                                    handleChange("duration", e.target.value)
                                }
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>

                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full mt-6 py-3 bg-yellow-400 hover:bg-yellow-500 transition font-semibold rounded-lg shadow"
                    >
                        Save Changes
                    </button>

                </div>

            </div>
        </div>
    );
}

export default AdminPage;