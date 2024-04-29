"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 6000;
// Middleware to parse JSON
app.use(express_1.default.json());
// In-memory data storage
const items = [];
// Create a new item (Create)
app.post("/items", (req, res) => {
    const { name } = req.body;
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, name };
    items.push(newItem);
    res.status(201).json(newItem);
});
// Get all items (Read)
app.get("/items", (req, res) => {
    res.json(items);
});
// Get a specific item by ID (Read)
app.get("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((item) => item.id === id);
    if (item) {
        res.json(item);
    }
    else {
        res.status(404).json({ error: "Item not found" });
    }
});
// Update an existing item (Update)
app.put("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
        items[itemIndex].name = name;
        res.json(items[itemIndex]);
    }
    else {
        res.status(404).json({ error: "Item not found" });
    }
});
// Delete an existing item (Delete)
app.delete("/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.status(204).end();
    }
    else {
        res.status(404).json({ error: "Item not found" });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
