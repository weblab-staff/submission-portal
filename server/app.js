require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const api = require("./routes/api");
const mongoose = require("mongoose");
const passport = require("./passport");
const periodic = require("./periodic");

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.resolve(__dirname, "..", "client", "dist");

mongoose
  .connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(
    () => console.log("Connected to MongoDB"),
    err => console.log("Error connecting to MongoDB: " + err)
  );

periodic.start(); // start periodic tasks (e.g. read spreadsheets)

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user.email) {
      return res.redirect("/register");
    }

    res.redirect("/");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use(express.static(publicPath));
app.use("/api", api);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
 });

http.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});
