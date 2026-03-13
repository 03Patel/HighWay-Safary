import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://highway-safarybackend-fsoz.onrender.com/api";

const API = axios.create({
  baseURL,
});

export default API;
