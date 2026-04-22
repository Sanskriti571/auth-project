// import "./App.css";

// function Dashboard() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <h1 style={{ color: "white", textAlign: "center" }}>Please Login First</h1>;
//   }

//   return (
//     <div className="container">
//       <div className="card">
//         <h1>Welcome 🎉</h1>
//         <p>You are successfully logged in</p>

//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             window.location.href = "/";
//           }}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import "./App.css";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

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

        {/* ✅ NEW PART */}
        {user && (
          <>
            <h3>Welcome, {user.name} 👋</h3>
            <p>Email: {user.email}</p>
          </>
        )}

        {/* old content still there */}
        <p>You are successfully logged in</p>

        <button
          onClick={() => {
            localStorage.clear(); // better than removeItem
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