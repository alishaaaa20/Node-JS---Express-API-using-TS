import express, { Request, Response } from "express";

const app = express();
const port = 7000;

// Middleware to parse JSON
app.use(express.json());

//Define a route to handle GET requests
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Define a route to handle POST requests
app.post("/data", (req: Request, res: Response) => {
  const data = req.body;
  res.json({ received: data });
});

// Start the server

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
