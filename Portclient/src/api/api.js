
import axios from "axios";

const API = axios.create({
    baseURL: "https://portfolio-server-a9ot.onrender.com/api",
});

export default API;
