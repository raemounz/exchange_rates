const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "..", "build");
const axios = require("axios");
const moment = require("moment");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY || "";

app.use(cors());

app.use(express.static(publicPath));

app.get("/currencies", (req, res) => {
  const url = `https://api.currencyscoop.com/v1/currencies?api_key=${apiKey}`;
  axios
    .get(url)
    .then((response) => {
      const currencies = response.data.response.fiats;
      res.json(
        Object.keys(currencies).map((currency) => ({
          name: currencies[currency].currency_name,
          code: currencies[currency].currency_code,
          decimal: currencies[currency].decimal_units,
        }))
      );
    })
    .catch((error) => {
      res
        .status(error.response.data.meta.code)
        .send({ error: error.response.data.meta.error_detail });
    });
});

app.get("/latest", (req, res) => {
  const url = `https://api.currencyscoop.com/v1/latest?base=${req.query.base}&api_key=${apiKey}`;
  console.log(url);
  axios
    .get(url)
    .then((response) => {
      res.json(response.data.response.rates);
    })
    .catch((error) => {
      res
        .status(error.response.data.meta.code)
        .send({ error: error.response.data.meta.error_detail });
    });
});

app.get("/historical", (req, res) => {
  const requests = [];
  for (let i = 0; i < req.query.period; i++) {
    const date = moment().subtract(i, "day").format("YYYY-MM-DD");
    requests.push(
      axios.get(
        `https://api.currencyscoop.com/v1/historical?base=${req.query.base}&date=${date}&api_key=${apiKey}`
      )
    );
  }
  Promise.all(requests)
    .then((response) => {
      const rates = response.map((r) => ({
        date: r.data.response.date,
        rate: r.data.response.rates[req.query.currency],
      }));
      res.json(rates);
    })
    .catch((error) => {
      res
        .status(error.response.data.meta.code)
        .send({ error: error.response.data.meta.error_detail });
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
