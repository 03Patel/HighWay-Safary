import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Details from "./pages/Details";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import AddItem from "./pages/AddItem";
import BookingList from "./components/BookingList";
import AdminPage from "./pages/AdminPage"
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyBookings from "./pages/MyBooking";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/bookingdetails" element={<BookingList />} />
        <Route path="/AdminPage/:id" element={<AdminPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
