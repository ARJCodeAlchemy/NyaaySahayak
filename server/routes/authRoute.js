const express = require("express");
const router = express.Router();
const passport = require("passport");
const { findOrCreateGoogleUser,} = require("../services/googleAuthService");

const { signup, login, issueToken, getUserById, } = require("../services/authService");
const authenticate = require("../middleware/authenticate");

router.post("/signup", async (req, res, next) => {
    try {
        const user = await signup(req.body);
        const token = issueToken(user);

        res.status(201).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const user = await login(req.body);

        const token = issueToken(user);

        res.status(200).json({
            success: true,
            token,
            user,
        });
    } catch (error) {
        next(error);
    }
});
//Google login Start
router.get(
    "/auth/google",
    passport.authenticate(
        "google",
        {
            scope: [
                "profile",
                "email",
            ],
        }
    )
);
//Google Callback
router.get(
    "/auth/google/callback",

    passport.authenticate(
        "google",
        {
            session: false,
        }
    ),

    async (req, res, next) => {
        try {

            const user =
                await findOrCreateGoogleUser(
                    req.user
                );

            const token =
                issueToken(user);

            res.status(200).json({
                success: true,
                token,
                user,
            });

        } catch (error) {
            next(error);
        }
    }
);

router.post("/logout", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

router.get(
    "/me",
    authenticate,
    async (req, res, next) => {
        try {
            const user =
                await getUserById(
                    req.user.userId
                );

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;