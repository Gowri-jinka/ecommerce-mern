import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-mern-backend-7swk.onrender.com",   //custom axios
});

// Attach token to every request
API.interceptors.request.use(    //runs bofore req sent 
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

//response checker
API.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error("API ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;