const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function toPublicUser(user) {
    return {
        id: String(user._id),
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl || "",
        authProvider: user.authProvider || "local",
        createdAt:
            user.createdAt instanceof Date
                ? user.createdAt.toISOString()
                : user.createdAt,
    };
}
// sign up
async function signup({ name, email, password }) {
    const safeName = String(name || "").trim();
    const safeEmail = normalizeEmail(email);
    const safePassword = String(password || "");

    if (!safeName || safeName.length < 2) {
        const error = new Error(
            "Name must be at least 2 characters long."
        );
        error.statusCode = 400;
        throw error;
    }

    if (!safeEmail || !safeEmail.includes("@")) {
        const error = new Error(
            "Please provide a valid email address."
        );
        error.statusCode = 400;
        throw error;
    }

    if (safePassword.length < 6) {
        const error = new Error(
            "Password must be at least 6 characters long."
        );
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await User.findOne({ email: safeEmail }).lean();

    if (existingUser) {
        const error = new Error("An account with this email already exists.");
        error.statusCode = 409;
        throw error;
    }

    const passwordHash = await bcrypt.hash(safePassword, 10);

    const user = await User.create({
        name: safeName,
        email: safeEmail,
        passwordHash,
        authProvider: "local",
    });

    return toPublicUser(user);
}

//log in 

async function login({ email, password }) {
    const safeEmail = normalizeEmail(email);
    const safePassword = String(password || "");

    if (!safeEmail || !safePassword) {
        const error = new Error(
            "Email and password are required."
        );
        error.statusCode = 400;
        throw error;
    }
    
    const user = await User.findOne({
        email: safeEmail,
    });
    
    if (!user || !user.passwordHash) {
        const error = new Error(
            "Invalid email or password."
        );
        error.statusCode = 401;
        throw error;
    }
    
    const ok = await bcrypt.compare(
        safePassword,
        user.passwordHash
    );
    
    if (!ok) {
        const error = new Error(
            "Invalid email or password."
        );
        error.statusCode = 401;
        throw error;
    }
    
    return toPublicUser(user);
}

//JWT
function issueToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
            name: user.name,
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRES_IN,
        }
    );
}
function verifyToken(token) {
    return jwt.verify(
        token,
        config.JWT_SECRET
    );
}
async function getUserById(userId) {
    const user = await User.findById(userId);

    if (!user) {
        const error = new Error(
            "User not found."
        );

        error.statusCode = 404;

        throw error;
    }

    return toPublicUser(user);
}

module.exports = {
    signup,
    login,
    issueToken,
    verifyToken,
    getUserById,
};