import express from "express";
import { middleware } from "./middleware";

const app = express();
const port = 3000;

app.use(middleware)

app.get("/hello-world", (req, res) => {
  setTimeout(() => {
    res.status(200).send("Hello World!");
  }, 2000)
});

app.get("/health", (req, res) => {
  res.send("Health is good!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
