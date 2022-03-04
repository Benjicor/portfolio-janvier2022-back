require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRoutes = require("./routes");

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept, xsrf-token",
  }),
);

app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ foo: "Salut Ben" });
});

app.use("/api", mainRoutes);

module.exports = app;
