const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("./models/User");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(`User ${profile.username} logged in.`);
      User.findOne(
        {
          github_id: profile.id
        },
        function(err, user) {
          if (err) return done(err);

          if (!user) {
            const newUser = new User({
              github_id: profile.id
            });

            newUser.save(function(err) {
              if (err) console.log(err);

              return done(err, newUser);
            });
          } else {
            return done(err, user);
          }
        }
      );
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
