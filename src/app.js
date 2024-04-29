"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 7000;
// Middleware to parse JSON
app.use(express_1.default.json());
//Define a route to handle GET requests
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Define a route to handle POST requests
app.post("/data", (req, res) => {
    const data = req.body;
    res.json({ received: data });
});
// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
