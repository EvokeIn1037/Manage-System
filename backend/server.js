require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
// const menuRoutes = require("./routes/menuRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
// connectDB();

// Use routes
// app.use("/api/users", userRoutes);
// app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5060;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

