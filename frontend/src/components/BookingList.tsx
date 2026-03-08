import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../reducers/AuthContext";

type Booking = {
    _id: string;
    refId: string;
    name: string;
    status: string;
};

function BookingList() {

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [search, setSearch] = useState("");
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


    const filteredBookings = bookings.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.refId.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="max-w-6xl mx-auto py-10 px-4">

            <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
                Booking Management
            </h1>


            <div className="mb-6 flex justify-center">

                <input
                    type="text"
                    placeholder="Search by Name or Ref ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />

            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">

                <table className="w-full text-left">

                    <thead className="bg-indigo-600 text-white">

                        <tr>

                            <th className="p-4">Ref ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Status</th>

                            {state.isAuthenticated && (
                                <th className="p-4 text-center">Actions</th>
                            )}

                        </tr>

                    </thead>

                    <tbody>

                        {filteredBookings.map((b) => (

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
                                            className={`px-3 py-1 rounded-full text-sm font-medium
                        ${b.status === "confirmed"
                                                    ? "bg-green-100 text-green-700"
                                                    : b.status === "cancelled"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >

                                            {b.status}

                                        </span>

                                    )}

                                </td>

                                {/* ACTIONS */}

                                {state.isAuthenticated && (

                                    <td className="p-4 flex gap-2 justify-center">

                                        <button
                                            onClick={() => saveStatus(b._id)}
                                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-lg"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => deleteBooking(b._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                )}

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default BookingList;