import { useState } from "react";
import axios from "axios";

function AddItem() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("lost");
  const [location, setLocation] = useState("");

  const handleAdd = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    await axios.post("https://auth-project-wkwn.onrender.com/items/add", {
      title,
      category,
      type,
      location,
      userId: user?._id
    });

    alert("Item added");
  };

  return (
    <div>
      <h2>Add Item</h2>

      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Location" onChange={(e) => setLocation(e.target.value)} />

      <select onChange={(e) => setType(e.target.value)}>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <button onClick={handleAdd}>Submit</button>
    </div>
  );
}

export default AddItem;