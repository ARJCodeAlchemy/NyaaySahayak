const passport = require("passport");
const GoogleStrategy =
    require("passport-google-oauth20").Strategy;

const config = require("../config");

// Fallback to placeholder strings to prevent startup crash if Google OAuth is not configured in .env
const clientID = config.GOOGLE_CLIENT_ID || "placeholder-client-id";
const clientSecret = config.GOOGLE_CLIENT_SECRET || "placeholder-client-secret";

passport.use(
    new GoogleStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: "/api/auth/google/callback",
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                return done(
                    null,
                    profile
                );
            } catch (error) {
                return done(
                    error,
                    null
                );
            }
        }
    )
);
