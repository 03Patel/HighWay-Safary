import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import API from "../api/axios";

type Experience = {
  _id: string;
  title: string;
  image: string;
  location: string;
  description: string;
  price: number;
};

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
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">

      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {experience.title}
          </h3>

          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
            {experience.location}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {experience.description.length > 80
            ? experience.description.slice(0, 80) + "..."
            : experience.description}
        </p>

        <div className="flex items-center justify-between">

          <p className="text-sm text-gray-700">
            From ₹{" "}
            <span className="text-lg font-bold text-gray-900">
              {experience.price}
            </span>
          </p>

          <div className="flex gap-2">
            {!state.isAuthenticated ?
              <button
                onClick={() => navigate(`/details/${experience._id}`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium px-4 py-2 rounded-md"
              >
                View
              </button> :
              <button
                onClick={() => navigate(`/AdminPage/${experience._id}`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium px-4 py-2 rounded-md"
              >
                View
              </button>
            }

            {state.isAuthenticated ?
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-400 text-white text-sm font-medium px-4 py-2 rounded-md"
              >
                Delete
              </button>
              : ""}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Card;