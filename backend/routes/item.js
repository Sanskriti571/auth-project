const router = require("express").Router();
const Item = require("../models/Item");

// ➕ Add item
router.post("/add", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json("Item added");
});

// 📄 View all
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// 🔍 Search
// router.get("/search/:key", async (req, res) => {
//   const items = await Item.find({
//     $or: [
//       { title: { $regex: req.params.key, $options: "i" } },
//       { category: { $regex: req.params.key, $options: "i" } }
//     ]
//   });
//   res.json(items);
// });
router.get("/search/:key", async (req, res) => {
  const key = req.params.key;

  const items = await Item.find({
    $or: [
      { title: { $regex: key, $options: "i" } },
      { category: { $regex: key, $options: "i" } }
    ]
  });

  res.json(items);
});

// ✏️ Update
// router.put("/:id", async (req, res) => {
//   await Item.findByIdAndUpdate(req.params.id, req.body);
//   res.json("Updated");
// });
router.put("/:id", async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // IMPORTANT
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ❌ Delete
router.delete("/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;