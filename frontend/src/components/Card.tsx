import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import API from "../api/axios";
import { Experience } from "../types";
import { MapPin, Trash2 } from "lucide-react";

type Props = {
  experience: Experience;
  onDelete: (id: string) => void;
};

function Card({ experience, onDelete }: Props) {

  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleDelete = async () => {
    try {

      await API.delete(`/experiences/${experience._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item deleted successfully");

      onDelete(experience._id);

    } catch (error) {

      console.error("Delete failed:", error);
      alert("Failed to delete experience");

    }
  };

  return (

    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
          ₹{experience.price}
        </div>

      </div>


      {/* Content */}
      <div className="p-5 space-y-3">

        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {experience.title}
        </h3>

        <div className="flex items-center text-sm text-gray-500 gap-1">

          <MapPin size={16} />

          <span>{experience.location}</span>

        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {(experience.description ?? "No description available")}
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">

          {!state.isAuthenticated ? (

            <button
              onClick={() => navigate(`/details/${experience._id}`)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              View Details
            </button>

          ) : (

            <button
              onClick={() => navigate(`/details/${experience._id}`)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Manage
            </button>

          )}

          {state.isAuthenticated && role === "admin" && (

            <button
              onClick={handleDelete}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-lg transition"
            >
              <Trash2 size={16} />
            </button>

          )}

        </div>

      </div>

    </div>

  );
}

export default Card;