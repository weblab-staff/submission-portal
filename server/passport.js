const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("./models/User");
const utils = require("./routes/util.js");
const Class = require("./models/Class");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(`User ${profile.username} logged in.`);
      const activeYear = await utils.get_active_year();
      let user = await User.findOne({
        year: activeYear,
        github_username: profile.username,
      });
      if (!user) {
        const adminList = (await Class.findOne({ year: activeYear }, "admins")).admins;
        user = new User({
          year: activeYear,
          github_username: profile.username,
          for_credit: false, //by default set their for_credit status to false
          is_admin: adminList.includes(profile.username),
        });
        if (profile.displayName && profile.displayName.split(" ").length == 2) {
          user.first_name = profile.displayName.split(" ")[0];
          user.last_name = profile.displayName.split(" ")[1];
        }
        user = await user.save();
      }
      done(null, user);
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
