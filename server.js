const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "public");
app
  .use(express.static(publicPath))
  .get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  })
  .listen(PORT, () => {
    console.log(`Server is up on ${PORT}!`);
  });
