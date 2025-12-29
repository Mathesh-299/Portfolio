
import axios from "axios";

const API = axios.create({
    baseURL: "https://portfolio-server-a9ot.onrender.com/api",
    // baseURL: "http://localhost:8000/api",
});

export default API;
