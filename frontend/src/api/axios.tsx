import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://highway-safary.onrender.com";

const API = axios.create({
  baseURL,
});

export default API;
