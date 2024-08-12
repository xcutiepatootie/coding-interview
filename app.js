// app.js
const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
var animalsArray = ["Elephant", "Eagle", "Dragonfly"];

//! YOU LOG ALL OF YOUR ANSWERS HERE ON NODE JS SERVER
// 1. Can you categorize the animalsArray into the following categories without manually mapping them?
//! PLEASE USE ANY ITERATION METHODS OR ANY METHODS TO SOLVE THIS PROBLEM

// Desired Output
// {
//     Mammals: [ 'Elephant' ],
//     Birds: [ 'Eagle' ],
//     Insects: [ 'Dragonfly' ]
// }

//
function animalsObj(arr) {
  const res = { Mammals: [], Birds: [], Insects: [] };

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      res.Mammals.push(arr[i]);
    } else if (i === 1) {
      res.Birds.push(arr[i]);
    } else {
      res.Insects.push(arr[i]);
    }
  }
  return res;
}

console.log(animalsObj(animalsArray));

// 2. After you get the desired output create an API call to this API endpoint without manually typing each one of the desired output?
//! USE THE DISIRED OUTPUT AS YOUR PAYLOAD TO THIS API
// https://api.api-ninjas.com/v1/animals
// Or Visit this URL for more info: https://api-ninjas.com/api/animals
// API-Key to use: ccCBd7oOPGXnF/Byo9+rUw==FrPn9rqGncHCgE4u

async function animalInfo(arr) {
  // Added dynamic array
  // What I did in the live interview is selecting only one
  const req = arr.map((animal) => {
    try {
      const url = `https://api.api-ninjas.com/v1/animals?name=${animal}`;
      const res = fetch(url, {
        method: "GET",
        headers: { "X-Api-Key": "ccCBd7oOPGXnF/Byo9+rUw==FrPn9rqGncHCgE4u" },
        contentType: "application/json",
      })
        .then((res) => {
          if (!res) {
            throw new Error("Failed To Get Data");
          }
          return res.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.log(error);
        });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  // This is I was failing earlier, I did not return the req/ or the object I made to resolve the promise
  return Promise.all(req);
}

console.log(animalInfo(animalsArray));

app.get("/api", async (req, res) => {
  // Used the array instead of selecting 1
  animalInfo(animalsArray)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res
          .status(500)
          .json({ error: "Failed to retrieve animal information." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
