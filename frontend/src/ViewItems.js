import { useEffect, useState } from "react";
import axios from "axios";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    const res = await axios.get("https://auth-project-wkwn.onrender.com/items");
    setItems(res.data);
  };

  // const searchItems = async () => {
  //   const res = await axios.get(
  //     `https://auth-project-wkwn.onrender.com/items/search/${search}`
  //   );
  //   setItems(res.data);
  // };
  const searchItems = async () => {
    console.log("Search clicked"); 

    if (!search.trim()) {
      fetchItems();
      return;
    }

    try {
      const res = await axios.get(
        `https://auth-project-wkwn.onrender.com/items/search/${search}`
      );

      console.log("Search result:", res.data); // 🔥 debug

      setItems([...res.data]); // IMPORTANT FIX
    } catch (err) {
      console.log(err);
    }
  };


  const deleteItem = async (id) => {
    await axios.delete(`https://auth-project-wkwn.onrender.com/items/${id}`);
    fetchItems();
  };
  const updateItem = async (id) => {
  const newTitle = prompt("Enter new title:");

  if (!newTitle) return;

  try {
    await axios.put(
      `https://auth-project-wkwn.onrender.com/items/${id}`,
      {
        title: newTitle
      }
    );

    alert("Updated successfully");

    fetchItems(); // refresh
  } catch (err) {
    console.log(err);
    alert("Update failed");
  }
};
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Search Items To View Or Delete</h2>

      <input onChange={(e) => setSearch(e.target.value)} />
      <button onClick={searchItems}>Search</button>

      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.category}</p>
          <p>{item.type}</p>
          <p>{item.location}</p>
          <h2>Want to Delete this item ?</h2>
          <button onClick={() => deleteItem(item._id)}>
            Delete
          </button>
          <h2> Want to update this item?</h2>
          <button onClick={() => updateItem(item._id)}>
  Update
</button>
        </div>
      ))}
    </div>
  );
}

export default ViewItems;