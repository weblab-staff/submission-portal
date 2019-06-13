const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("./models/User");

passport.use(
  new GitHubStrategy({
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(`User ${profile.username} logged in.`);
      User.findOne({ github_id: profile.id })
        .then(user => {
          if (user) return user;

          // create user if doesn't exist yet
          const newUser = new User({
          github_id: profile.id
          });

          return user.save();
        })
        .then(user => done(null, user))
        .catch(done);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
