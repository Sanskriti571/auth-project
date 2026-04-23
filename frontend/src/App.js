import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AddItem from "./AddItem";
import ViewItems from "./ViewItems";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/items" element={<ViewItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
