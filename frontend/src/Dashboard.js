import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // 🔐 Protect route
  if (!token) {
    return (
      <h1 style={{ color: "white", textAlign: "center" }}>
        Please Login First
      </h1>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome 🎉</h1>

        {/* ✅ User Info */}
        {user && (
          <>
            <h3>Welcome, {user.name} 👋</h3>
            <p>Email: {user.email}</p>
          </>
        )}

        <p>You are successfully logged in</p>

        {/* ✅ Navigation buttons */}
        <button onClick={() => navigate("/add")}>
          Report Item
        </button>

        <button onClick={() => navigate("/items")}>
          View Items
        </button>

        {/* ✅ Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;