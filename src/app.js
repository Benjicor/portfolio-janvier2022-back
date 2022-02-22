require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ foo: "Hello" });
});

app.use("/api", mainRouter);

module.exports = app;
