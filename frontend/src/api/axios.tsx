import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://highway-safary.onrender.com";

<<<<<<< HEAD


=======
>>>>>>> 454abf9b62275ebc2b822cec0c99593621deb3bb

const API = axios.create({
  baseURL,
});

export default API;
