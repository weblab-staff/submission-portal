require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");
const Team = require("./models/Team");
const User = require("./models/User");
const app = express();
const api = require("./routes/api");
const mongoose = require("mongoose");
const passport = require("./passport");
const periodic = require("./periodic");
const github = require("./github");
const sockets = require("./sockets");
const fs = require("fs");
const env = process.env.NODE_ENV || "dev";

let https;
if (env === "prod") {
  // load certs for https
  const privateKey = fs.readFileSync("/etc/letsencrypt/live/portal.weblab.is/privkey.pem", "utf8");
  const certificate = fs.readFileSync("/etc/letsencrypt/live/portal.weblab.is/fullchain.pem", "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  app.enable("trust proxy");
}

const http = require("http").Server(app);
sockets.init(http);

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.resolve(__dirname, "..", "client", "dist");

mongoose
  .connect(process.env.MONGO_SRV, {
    dbName: env,
  })
  .then(
    () => console.log("Connected to MongoDB"),
    (err) => console.log("Error connecting to MongoDB: " + err)
  );

periodic.start(); // start periodic tasks (e.g. read spreadsheets)

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: true,
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
  const status = err.status || 500;
  if (status === 500) {
    console.error(err.stack);
  }

  res.status(status).send(err.message || "Something broke!");
});

if (env !== "test") {
  const port = process.env.PORT || (env === "prod" ? 8000 : 3000);
  http.listen(port, () => {
    console.log(`Listening on port ${port} and looking in folder ${publicPath}`);
  });
}

module.exports = app;

function is_registered(user) {
  return (
    user.first_name !== undefined &&
    user.last_name !== undefined &&
    user.email !== undefined &&
    user.for_credit !== undefined
  );
}
