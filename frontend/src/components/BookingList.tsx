import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../reducers/AuthContext";
import { Search, Trash2, Save } from "lucide-react";

type Booking = {
    _id: string;
    refId: string;
    name: string;
    status: string;
};

function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [search, setSearch] = useState("");
    const [updatedStatus, setUpdatedStatus] = useState<{ [key: string]: string }>(
        {}
    );

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
        try {
            await API.put(`/bookings/update-status/${id}`, {
                status: updatedStatus[id],
            });

            alert("Status updated and email sent to user");
            fetchBookings();
        } catch (err) {
            console.log(err);
            alert("Failed to update booking");
        }
    };

    const deleteBooking = async (id: string) => {
        try {
            await API.delete(`/bookings/${id}`);
            fetchBookings();
        } catch (err) {
            console.log(err);
            alert("Failed to delete booking");
        }
    };

    const filteredBookings = bookings.filter(
        (b) =>
            b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.refId.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusStyle = (status: string) => {
        if (status === "confirmed")
            return "bg-green-100 text-green-700 border-green-200";
        if (status === "cancelled")
            return "bg-red-100 text-red-700 border-red-200";
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                    <h1 className="text-2xl font-bold">Booking Management</h1>
                    <p className="text-sm opacity-90">
                        Manage customer bookings and update status
                    </p>
                </div>

                {/* Search */}
                <div className="p-6 flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full max-w-sm">
                        <Search size={18} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by Name or Ref ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none w-full text-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-gray-600 font-semibold">Ref ID</th>
                                <th className="p-4 text-gray-600 font-semibold">Name</th>
                                <th className="p-4 text-gray-600 font-semibold">Status</th>

                                {state.isAuthenticated && (
                                    <th className="p-4 text-center text-gray-600 font-semibold">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="text-center py-8 text-gray-400"
                                    >
                                        No bookings found
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((b) => (
                                    <tr
                                        key={b._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4 font-mono text-indigo-600">
                                            {b.refId}
                                        </td>

                                        <td className="p-4 font-medium text-gray-700">
                                            {b.name}
                                        </td>

                                        <td className="p-4">
                                            {state.isAuthenticated ? (
                                                <select
                                                    value={updatedStatus[b._id] || b.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(b._id, e.target.value)
                                                    }
                                                    className="border px-3 py-1 rounded-lg focus:ring-2 focus:ring-indigo-400"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            ) : (
                                                <span
                                                    className={`px-3 py-1 text-sm rounded-full border font-medium ${getStatusStyle(
                                                        b.status
                                                    )}`}
                                                >
                                                    {b.status}
                                                </span>
                                            )}
                                        </td>

                                        {state.isAuthenticated && (
                                            <td className="p-4 flex justify-center gap-3">

                                                <button
                                                    onClick={() => saveStatus(b._id)}
                                                    className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                                                >
                                                    <Save size={16} />
                                                    Save
                                                </button>

                                                <button
                                                    onClick={() => deleteBooking(b._id)}
                                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>

                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BookingList;