const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: '/auth/github/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(`User ${profile.username} logged in.`);
     
    /*User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/

    return cb(null, {username: profile.username}); // temporary line until we finish model
  }
));

passport.serializeUser(function(user, cb) {
      cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
});


module.exports = passport;
