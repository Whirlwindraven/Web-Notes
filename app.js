// Require Dependencies
const express = require("express");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Define Routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
