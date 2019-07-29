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
const github = require("./github");

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.resolve(__dirname, "..", "client", "dist");

let env = process.env.NODE_ENV || "dev";

mongoose
  .connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: env
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
    if (!is_registered(req.user)) {
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

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

//error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Something broke!");
});

module.exports = app;

if (env === "test") {
  return; // don't run webserver for tests
}

const port = env === "prod" ? 80 : 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port} and looking in folder ${publicPath}`);
});

function is_registered(user) {
  return (
    user.first_name !== undefined &&
    user.last_name !== undefined &&
    user.email !== undefined &&
    user.for_credit !== undefined
  );
}
