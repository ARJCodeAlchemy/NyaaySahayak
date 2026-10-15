const mongoose = require("mongoose");
const config = require("../config");

// Establishes connection to MongoDB database
async function connectMongo() {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            dbName: config.MONGODB_DB_NAME,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}

module.exports = { connectMongo };
