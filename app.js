const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3001;

client.collectDefaultMetrics();

app.get("/", (req, res) => {
  res.send("Hello DevOps");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
