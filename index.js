const express = require("express");
const titleController = require("./controllers/titleController.js");

const app = express();

// Route for Callbacks
app.get("/I/want/title/callbacks", titleController.getTitlesWithCallbacks);

// Default 404 route for all other paths
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
