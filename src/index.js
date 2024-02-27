const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
const app = express();
const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const databaseConfig = require("../config/databaseConfig.js");

//Connect the database
databaseConfig();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
