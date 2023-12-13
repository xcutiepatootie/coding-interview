// app.js
const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Goodluck!");
});
var animalsArray = ["Elephant", "Eagle", "Dragonfly"];

// Can you categorize the animalsArray into the following categories?

// Desired Output
// {
//     Mammals: [ 'Elephant' ],
//     Birds: [ 'Eagle' ],
//     Insects: [ 'Dragonfly' ]
// }

//

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
