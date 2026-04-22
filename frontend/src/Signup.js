import { useState } from "react";
import axios from "axios";
import "./App.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/auth/signup", {
        name,
        email,
        password
      });

      alert("User Registered Successfully");
      window.location.href = "/";
    } catch (err) {
      alert("Error creating user");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>

        <span
          className="link"
          onClick={() => (window.location.href = "/")}
        >
          Already have an account?
        </span>
      </div>
    </div>
  );
}

export default Signup;