import axios from 'axios'   
const api = new axios.create({
    baseURL: "http://localhost:5001/api"
});

export default api;