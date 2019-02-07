import passport from "passport";
import passportSteam from "passport-steam";

import config from "./config";

const SteamStrategy = passportSteam.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});


/**
 * Sign in with Steam
 */
passport.use(new SteamStrategy({
  returnURL: "/login/handle",
  realm: "",
  apiKey: config.steamApiKey
}, (identifier: any, profile: any, done: any) => {
  profile.identifier = identifier;

  done(null, profile);
}));

export default passport;
