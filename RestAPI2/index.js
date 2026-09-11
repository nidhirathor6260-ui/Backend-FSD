import express from "express";
import products from "./product.js";   // ✅ import the array

const app = express();
app.use(express.json());

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// POST: create a new product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock
  };
  products.push(newProduct);
  res.json(newProduct);
});

// PUT: update a product
app.put("/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.stock = req.body.stock;

  res.json(product);
});

// DELETE: remove a product
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
