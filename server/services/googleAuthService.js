const User = require("../models/User");

async function findOrCreateGoogleUser(
    profile
) {
    const googleId =
        profile.id;

    const email =
        profile.emails?.[0]?.value;

    const name =
        profile.displayName;

    const avatarUrl =
        profile.photos?.[0]?.value || "";
    console.log(
        "Google ID:",
        googleId
    );

    // let user =
    //     await User.findOne({
    //         googleId,
    //     });

    // console.log(
    //     "Found User:",
    //     user
    // );

    let user =
        await User.findOne({
            googleId,
        });

    if (!user) {

        user = await User.findOne({
            email,
        });

        if (user) {

            user.googleId =
                googleId;

            user.authProvider =
                "google";

            user.avatarUrl =
                avatarUrl;

            await user.save();

        } else {

            user = await User.create({
                name,
                email,
                googleId,
                avatarUrl,
                authProvider:
                    "google",
            });
        }
    }

    return user;
}
module.exports = {
    findOrCreateGoogleUser,
};