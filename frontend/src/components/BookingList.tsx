import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../reducers/AuthContext";
import { Trash2, Save } from "lucide-react";

type Booking = {
    _id: string;
    refId: string;
    name: string;
    status: string;
    image?: string;
};

function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [updatedStatus, setUpdatedStatus] = useState<{ [key: string]: string }>({});

    const { state } = useContext(AuthContext);

    const fetchBookings = async () => {
        try {
            const res = await API.get("/bookings");
            setBookings(res.data.bookings);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = (id: string, status: string) => {
        setUpdatedStatus({ ...updatedStatus, [id]: status });
    };

    const saveStatus = async (id: string) => {
        await API.put(`/bookings/update-status/${id}`, {
            status: updatedStatus[id],
        });
        fetchBookings();
    };

    const deleteBooking = async (id: string) => {
        await API.delete(`/bookings/${id}`);
        fetchBookings();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-2xl font-bold mb-6">Bookings</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {bookings.map((b) => (
                    <div
                        key={b._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                    >

                        {/* Image */}
                        <img
                            src={b.image || "https://via.placeholder.com/300x180"}
                            alt=""
                            className="w-full h-40 object-cover"
                        />

                        {/* Content */}
                        <div className="p-4">

                            <h2 className="font-semibold text-lg">{b.name}</h2>
                            <p className="text-sm text-gray-500 mb-2">
                                Ref ID: {b.refId}
                            </p>

                            {/* Status */}
                            {state.isAuthenticated ? (
                                <select
                                    value={updatedStatus[b._id] || b.status}
                                    onChange={(e) =>
                                        handleStatusChange(b._id, e.target.value)
                                    }
                                    className="border rounded px-3 py-1 w-full mb-3"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            ) : (
                                <span className="inline-block bg-gray-100 px-3 py-1 rounded text-sm mb-3">
                                    {b.status}
                                </span>
                            )}

                            {/* Actions */}
                            {state.isAuthenticated && (
                                <div className="flex justify-between">

                                    <button
                                        onClick={() => saveStatus(b._id)}
                                        className="flex items-center gap-1 bg-indigo-500 text-white px-3 py-1.5 rounded"
                                    >
                                        <Save size={16} />
                                        Save
                                    </button>

                                    <button
                                        onClick={() => deleteBooking(b._id)}
                                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>

                                </div>
                            )}

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default BookingList;