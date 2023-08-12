import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL,
    headers:{
        'Access-Control-Allow-Origin': '*'
    }
})
export default api