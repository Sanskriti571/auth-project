import "./App.css";

function Dashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <h1 style={{ color: "white", textAlign: "center" }}>Please Login First</h1>;
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome 🎉</h1>
        <p>You are successfully logged in</p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;