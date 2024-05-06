import axios from "axios";

export default axios.create({
  baseURL: "https://mern-estate-app.vercel.app/api",
  withCredentials: true,
});
