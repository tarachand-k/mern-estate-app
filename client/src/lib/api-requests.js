import axios from "axios";

export default axios.create({
  baseURL: "https://mern-estate-app-f72z.onrender.com/api",
  withCredentials: true,
});
