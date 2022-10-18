const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");

    const joke = response.data.value;

    return res.status(200).json({
      joke,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app.get("/fact", async (req, res, next) => {
  try {
    const response = await axios.get("https://some-random-api.ml/facts/dog");

    const fact = response.data.fact;

    return res.status(200).json({
      fact,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
