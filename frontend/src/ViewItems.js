import { useEffect, useState } from "react";
import axios from "axios";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    const res = await axios.get("https://auth-project-wkwn.onrender.com/items");
    setItems(res.data);
  };

  const searchItems = async () => {
    const res = await axios.get(
      `https://auth-project-wkwn.onrender.com/items/search/${search}`
    );
    setItems(res.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`https://auth-project-wkwn.onrender.com/items/${id}`);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>All Items</h2>

      <input onChange={(e) => setSearch(e.target.value)} />
      <button onClick={searchItems}>Search</button>

      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.category}</p>
          <p>{item.type}</p>
          <p>{item.location}</p>

          <button onClick={() => deleteItem(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ViewItems;