import axios from "axios";

<<<<<<< HEAD
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://mealmapbackend.onrender.com/api";

const API = axios.create({
  baseURL,
});

export default API;
=======
const API = axios.create({ baseURL:'https://highway-safary.onrender.com/api' })
export default API
>>>>>>> bfc14ec6cfc149ee9858efe52b57617c0cf680b3
