
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require('mongoose');

const publicPath = path.resolve(__dirname, "..", "client", "dist");

mongoose.connect(process.env.MONGO_SRV, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"),
        (err) => console.log("Error connecting to MongoDB: " + err));

app.use(express.static(publicPath));

http.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});





