import express, { Request, Response } from "express";

const app = express();
const port = 8000;

// Middleware to parse JSON
app.use(express.json());

// Define the Item interface
interface Item {
  id: number;
  name: string;
}

// In-memory data store
const items: Item[] = [];

// Create a new item (Create)
app.post("/items", (req: Request, res: Response) => {
  const { name } = req.body;
  const id = items.length ? items[items.length - 1].id + 1 : 1;
  const newItem = { id, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Get all items (Read)
app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

// Get a specific item by ID (Read)
app.get("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Update an existing item (Update)
app.put("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    items[itemIndex].name = name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Delete an existing item (Delete)
app.delete("/items/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
