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
const http = require("http").Server(app);
const env = process.env.NODE_ENV || "dev";

let https;
if (env === "prod") {
  // load certs for https
  const privateKey = fs.readFileSync("/etc/letsencrypt/live/portal.weblab.to/privkey.pem", "utf8");
  const certificate = fs.readFileSync("/etc/letsencrypt/live/portal.weblab.to/cert.pem", "utf8");
  const ca = fs.readFileSync("/etc/letsencrypt/live/portal.weblab.to/chain.pem", "utf8");

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  https = require("https").Server(credentials, app);
}

sockets.init(https || http);

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.resolve(__dirname, "..", "client", "dist");

mongoose
  .connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
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

module.exports = app;

if (env === "test") {
  return; // don't run webserver for tests
}

const port = env === "prod" ? 80 : 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port} and looking in folder ${publicPath}`);
});

if (https) {
  https.listen(443, () => {
    console.log(`Running https on port 443`);
  });
}

function is_registered(user) {
  return (
    user.first_name !== undefined &&
    user.last_name !== undefined &&
    user.email !== undefined &&
    user.for_credit !== undefined
  );
}
