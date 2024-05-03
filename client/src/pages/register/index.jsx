import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/api-requests";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    setIsLoading(true);
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        email,
        password,
      });

      navigate("/sign-in");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="register">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span className="error">{error}</span>}
          <Link to="/sign-in">Do you have an account?</Link>
        </form>
      </div>
      <div className="img-box">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
