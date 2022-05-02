import scrape from "./scrape.js";
import express from "express";

const app = express();

const port = app.listen(8000);

app.get("/", function (req, res) {
  res.send("<h1>Express server Start</h1>");
});

app.get("/melon", async function (_, res) {
  res.send(await scrape());
});

app.listen(port, function () {
  console.log("start! melon scrape server!");
});
