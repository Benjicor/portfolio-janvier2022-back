require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRoutes = require("./routes");

const app = express();

// On configure cors pour autoriser uniquement le front à communiquer avec notre API et pour avoir accès aux cookies
app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/images", express.static("public/images"));

// Accès aux cookies
app.use(cookieParser());

// Prefix all routes with /api
app.use("/api", mainRoutes);

module.exports = app;
