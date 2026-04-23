import { useState } from "react";
import axios from "axios";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [showItems, setShowItems] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // 🔹 View all
  const fetchItems = async () => {
    const res = await axios.get("https://auth-project-wkwn.onrender.com/items");
    setItems(res.data);
    setShowItems(true);
  };

  // 🔹 Search
  const searchItems = async () => {
    if (!search.trim()) return;

    const res = await axios.get(
      `https://auth-project-wkwn.onrender.com/items/search/${search}`
    );

    setItems(res.data);
    setShowItems(true);
  };

  // 🔹 Delete
  const deleteItem = async (id) => {
    await axios.delete(`https://auth-project-wkwn.onrender.com/items/${id}`);
    fetchItems();
  };

  // 🔹 Handle update (FORM SAVE)
  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://auth-project-wkwn.onrender.com/items/${editItem._id}`,
        editItem
      );

      alert("Updated successfully");

      setEditItem(null); // close form
      fetchItems(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Search or View Items</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchItems}>Search</button>
      <button onClick={fetchItems}>View All</button>

      {/* 📄 Items */}
      {showItems &&
        (items.length === 0 ? (
          <p>No items found</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              style={{
                margin: "10px",
                padding: "10px",
                border: "1px solid white",
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <p>{item.type}</p>
              <p>{item.location}</p>

              <button onClick={() => deleteItem(item._id)}>
                Delete
              </button>

              <button onClick={() => setEditItem(item)}>
                Update
              </button>
            </div>
          ))
        ))}

      {/* 📝 EDIT FORM */}
      {editItem && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "2px solid white",
          }}
        >
          <h2>Edit Item</h2>

          <input
            value={editItem.title}
            onChange={(e) =>
              setEditItem({ ...editItem, title: e.target.value })
            }
          />

          <input
            value={editItem.category}
            onChange={(e) =>
              setEditItem({ ...editItem, category: e.target.value })
            }
          />

          <input
            value={editItem.type}
            onChange={(e) =>
              setEditItem({ ...editItem, type: e.target.value })
            }
          />

          <input
            value={editItem.location}
            onChange={(e) =>
              setEditItem({ ...editItem, location: e.target.value })
            }
          />

          <br /><br />

          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ViewItems;