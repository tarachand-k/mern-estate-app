import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/api-requests";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    setIsLoading(true);
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      updateUser(res.data.user);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="login">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required={true}
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/sign-up">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="img-box">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
