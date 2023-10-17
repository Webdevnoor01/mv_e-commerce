import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL
const accessToken = localStorage.getItem("accessToken")
const api = axios.create({
    baseURL,
    headers:{
        "Access-Control-Allow-Origin": "*",
        Authorization:`Bearer ${accessToken}`
    },
})
export default api