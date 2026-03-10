import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import { Search, LogOut, User } from "lucide-react";

function Navbar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value.trim());
  };

  return (
    <nav className="w-full bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          🚗 Highway <span className="text-yellow-500">Safary</span>
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-80 focus-within:ring-2 focus-within:ring-yellow-400">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search experiences..."
            className="bg-transparent w-full outline-none text-sm"
          />
        </div>

        {/* Menu */}
        <div className="flex items-center space-x-4">

          <Link
            to="/bookingdetails"
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition"
          >
            My Bookings
          </Link>

          {!state.isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center gap-1 px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-medium hover:bg-yellow-500 transition"
            >
              <User size={16} />
              Admin
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;