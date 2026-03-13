import React, { useEffect, useState } from "react";
import API from "../api/axios";

type Booking = {
    _id: string;
    refId: string;
    name: string;
    status: string;
    image?: string;
};

function MyBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const userId = localStorage.getItem("userId");

                console.log("UserId:", userId);

                if (!userId) {
                    console.log("UserId not found in localStorage");
                    setLoading(false);
                    return;
                }

                const res = await API.get(`/bookings/user/${userId}`);

                console.log("API Response:", res.data);

                setBookings(res.data);
            } catch (err) {
                console.log("API ERROR:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <p className="p-6">Loading bookings...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

            {bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((b) => (
                        <div
                            key={b._id}
                            className="bg-white rounded-xl shadow overflow-hidden"
                        >
                            <img
                                src={b.image || "https://via.placeholder.com/300x180"}
                                alt={b.name}
                                className="w-full h-40 object-cover"
                            />

                            <div className="p-4">
                                <h2 className="font-semibold text-lg">{b.name}</h2>

                                <p className="text-sm text-gray-500">
                                    Ref ID: {b.refId}
                                </p>

                                <p className="text-sm text-gray-500">
                                    title: {b.title}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Date: {b.date} <br />
                                    Time:{b.time}
                                </p>

                                <p className="mt-2 text-sm">
                                    Status:
                                    <span className="ml-2 px-2 py-1 bg-gray-100 rounded">
                                        {b.status}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;