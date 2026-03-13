import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import { LogOut, Menu, X } from "lucide-react";

function Navbar() {

  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");



  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <h1 className="text-lg font-semibold">Highway Safary</h1>

        <div className="hidden md:flex items-center gap-4">

          {/* USER NAVBAR */}
          {state.isAuthenticated && role === "user" && (
            <>
              <Link
                to="/mybookings"
                className="px-4 py-2 bg-white-400 border-2 rounded text-sm font-semibold hover:bg-black hover:text-white"
              >
                My Bookings
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 hover:text-white"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}

          {/* ADMIN NAVBAR */}
          {state.isAuthenticated && role === "admin" && (
            <>


              <Link
                to="/bookingdetails"
                className="px-4 py-2 bg-white-400 border-2 rounded text-sm font-semibold hover:bg-black hover:text-white"
              >
                Bookings
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 hover:text-white"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}

          {/* GUEST NAVBAR */}
          {!state.isAuthenticated && (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 bg-white-400 border-2 rounded text-sm font-semibold hover:bg-black hover:text-white"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-gray-800 text-white  rounded text-sm  hover:bg-white hover:text-black hover:border-2 hover:font-semibold"
              >
                Sign Up
              </Link>

            </>
          )}

        </div>
        {/* MOBILE SIDEBAR */}


        <div className="relative md:hidden">

          {/* TOP BAR */}

          <div className="bg-[#333] text-white flex justify-end px-4 py-3 h-10">
            <button onClick={() => setOpen(!open)}>
              {!open ? <Menu size={20} /> : ""}

            </button>
          </div>


          <div
            className={`fixed top-0 right-0 h-full w-[30%] bg-[#333] text-white z-50
                         transform transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}

          >
            <div className="bg-[#333] text-white flex justify-end px-4 py-3">
              <button onClick={() => setOpen(!open)}>
                {open ? <X size={24} /> : ""}

              </button>
            </div>

            <div className="flex flex-col mt-14   gap-2">
              {!state.isAuthenticated && (
                <>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gray-800 text-white  item-center rounded text-sm  hover:bg-white hover:text-black hover:border-2 hover:font-semibold w-50%"

                  >
                    Sign UP
                  </Link>

                  <Link
                    to="/signin"
                    className="px-4 py-2 bg-white-400 border-2 rounded text-sm font-semibold hover:bg-black hover:text-white"

                  >
                    Sign In
                  </Link>
                </>
              )}
              {state.isAuthenticated && role === "user" && (
                <>
                  <Link
                    to="/mybookings"
                    className="px-4 py-2 bg-white-400 border-2 rounded text-sm font-semibold hover:bg-black hover:text-white"
                  >
                    My Bookings
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              )}



            </div>
          </div>

        </div>

      </div>

    </nav >
  );
}

export default Navbar;