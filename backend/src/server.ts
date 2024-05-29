import express from "express";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
