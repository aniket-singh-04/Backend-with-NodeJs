import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const clientId =
  "594555697613-18p3s2o6hl7mvc3gj0o2a2bg7b27tj9m.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "http://localhost:4000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret,
      callbackURL: redirectUri,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);
