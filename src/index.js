const express = require("express");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/user");
const AttendanceRoutes = require("./routes/attendance");
const logger = require("./middleware/logger");

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Middleware for enable parsing JSON
app.use(express.json());

// Middlaware logger
app.use(logger);

app.get("/api", (req, res) => {
  res.send("Hello World");
});

// User routes
app.use("/user", UserRoutes);
app.use("/attendance", AttendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
