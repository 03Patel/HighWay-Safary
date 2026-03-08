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

    if (loading) return <div className="text-center py-20 text-lg">Loading...</div>;
    if (!experience) return <div className="text-center py-20 text-lg">Not Found</div>;

    const handleChange = (field: keyof Experience, value: any) => {
        setExperience({ ...experience, [field]: value });
    };

    const handleSave = async () => {
        await API.put(`/experiences/${experience._id}`, experience);
        alert("Experience Updated Successfully");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">

            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">

                {/* LEFT SIDE */}
                <div className="md:col-span-2 space-y-8 bg-white p-6 rounded-xl shadow-lg">

                    <h1 className="text-2xl font-bold text-gray-700 border-b pb-3">
                        Edit Experience
                    </h1>

                    {/* IMAGE */}
                    <div className="space-y-3">
                        <label className="font-medium text-gray-600">Image URL</label>

                        <input
                            value={experience.image}
                            onChange={(e) => handleChange("image", e.target.value)}
                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />

                        <img
                            src={experience.image}
                            className="w-full h-72 object-cover rounded-xl shadow"
                        />
                    </div>

                    {/* TITLE */}
                    <div>
                        <label className="font-medium text-gray-600">Title</label>
                        <input
                            value={experience.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />
                    </div>

                    {/* LOCATION */}
                    <div>
                        <label className="font-medium text-gray-600">Location</label>
                        <input
                            value={experience.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="font-medium text-gray-600">Description</label>
                        <textarea
                            value={experience.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            rows={4}
                            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />
                    </div>

                    {/* SLOTS */}
                    <div>
                        <h2 className="font-semibold text-lg mb-4 text-gray-700">
                            Edit Slots
                        </h2>

                        {experience.slots.map((slot, slotIndex) => (

                            <div
                                key={slotIndex}
                                className="border rounded-lg p-4 mb-4 bg-gray-50 shadow-sm"
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
                                    className="border rounded-lg p-2 w-full mt-1 mb-3 focus:ring-2 focus:ring-yellow-400 outline-none"
                                />

                                {slot.times.map((time, timeIndex) => (

                                    <div
                                        key={timeIndex}
                                        className="flex gap-3 mb-3"
                                    >

                                        <input
                                            value={time.time}
                                            onChange={(e) => {
                                                const updated = [...experience.slots];
                                                updated[slotIndex].times[timeIndex].time = e.target.value;
                                                handleChange("slots", updated);
                                            }}
                                            className="border p-2 rounded-lg w-40 focus:ring-2 focus:ring-yellow-400 outline-none"
                                            placeholder="Time"
                                        />

                                        <input
                                            type="number"
                                            value={time.capacity}
                                            onChange={(e) => {
                                                const updated = [...experience.slots];
                                                updated[slotIndex].times[timeIndex].capacity = Number(e.target.value);
                                                handleChange("slots", updated);
                                            }}
                                            className="border p-2 rounded-lg w-32 focus:ring-2 focus:ring-yellow-400 outline-none"
                                            placeholder="Capacity"
                                        />

                                    </div>

                                ))}

                            </div>

                        ))}

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">

                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Pricing
                    </h2>

                    <div>
                        <label className="font-medium text-gray-600">
                            Price
                        </label>

                        <input
                            type="number"
                            value={experience.price}
                            onChange={(e) => handleChange("price", Number(e.target.value))}
                            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="font-medium text-gray-600">
                            Duration
                        </label>

                        <input
                            value={experience.duration}
                            onChange={(e) => handleChange("duration", e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full mt-6 py-3 bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold rounded-lg shadow"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AdminPage;