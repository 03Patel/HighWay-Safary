
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const { experience, booking } = location.state || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  if (!experience || !booking) {
    return (
      <div className="text-center py-20">
        No booking details found. Please go back.
      </div>
    );
  }

  const subtotal = experience.price * booking.quantity;
  const tax = 59;
  const total = subtotal + tax - discount;


  const handleApplyPromo = async () => {
    if (!promoCode) return setMessage("Please enter a promo code.");
    setPromoLoading(true);
    setMessage("");

    try {
      const res = await API.post("/promo/validate", {
        promoCode: promoCode.trim().toUpperCase(),
        total: subtotal + tax,
      });

      if (res.data.success) {
        setDiscount(res.data.discount);
        setPromoApplied(true);
        setMessage(res.data.message);
      }
    } catch (err:any) {
      console.error(err);
      setDiscount(0);
      setPromoApplied(false);
      setMessage(err.response?.data?.message || "Invalid promo code.");
    } finally {
      setPromoLoading(false);
    }
  };


  const handleBooking = async () => {
    if (!agree || !name || !email) {
      alert("Please fill all fields and agree to the terms.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/bookings", {
        experienceId: experience._id,
        name,
        email,
        date: booking.date,
        time: booking.time,
        seats: booking.quantity,
        promoCode,
        discount,
        total,
      });

      if (res.data.success) {
        navigate("/checkout", { state: { booking: res.data.booking } });
      }
    } catch (err:any) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-3 gap-10">
     
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-semibold mb-5">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Full name"
            className="border rounded-md px-3 py-2 text-sm w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded-md px-3 py-2 text-sm w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

      
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Promo code"
            className="border rounded-md px-3 py-2 text-sm flex-1 uppercase"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            disabled={promoApplied}
          />
          <button
            onClick={handleApplyPromo}
            disabled={promoLoading || promoApplied}
            className={`${
              promoApplied
                ? "bg-green-500 text-white"
                : "bg-black text-white hover:bg-gray-800"
            } px-4 py-2 text-sm rounded-md`}
          >
            {promoLoading ? "Checking..." : promoApplied ? "Applied" : "Apply"}
          </button>
        </div>

        {message && (
          <p
            className={`text-sm mb-4 ${
              promoApplied ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <label className="flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
          />
          <span>I agree to the terms and safety policy</span>
        </label>
      </div>

      
      <div className="border rounded-xl bg-white shadow-sm p-6 h-fit">
        <h2 className="font-semibold mb-4 text-lg">Booking Summary</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Experience</span>
            <span className="font-medium">{experience.title}</span>
          </div>
          <div className="flex justify-between">
            <span>Date</span>
            <span>{booking.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Time</span>
            <span>{booking.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Seats</span>
            <span>{booking.quantity}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹{tax}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className={`w-full mt-6 py-2 rounded-md font-medium ${
            loading
              ? "bg-gray-300 text-gray-600"
              : "bg-yellow-400 hover:bg-yellow-500 text-black"
          }`}
        >
          {loading ? "Processing..." : "Pay and Confirm"}
        </button>
      </div>
    </div>
  );
}

export default Booking;
