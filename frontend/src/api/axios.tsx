import axios from "axios";
<<<<<<< HEAD
=======

>>>>>>> df22fea2134bafb383620fcf8f1a2d8c954f0237
const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://highway-safary.onrender.com";
<<<<<<< HEAD

=======
>>>>>>> df22fea2134bafb383620fcf8f1a2d8c954f0237

const API = axios.create({
  baseURL,
});

export default API;
