const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("./models/User");
const utils = require("./routes/util.js");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`User ${profile.username} logged in.`);
      activeYear = await utils.get_active_year();
      let user = await User.findOne({
        year: activeYear,
        github_id: profile.id
      });
      if (!user) {
        user = await User.create({
          year: activeYear,
          github_id: profile.id
        });
      }
      done(null, user);
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
