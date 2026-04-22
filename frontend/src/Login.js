import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://auth-project-wkwn.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      // ✅ redirect using React Router
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {/* ✅ navigation fix */}
        <span
          className="link"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </span>
      </div>
    </div>
  );
}

export default Login;