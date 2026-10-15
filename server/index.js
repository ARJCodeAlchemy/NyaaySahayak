const express = require("express");
const cors = require("cors");
const config = require("./config");
const { connectMongo } = require("./services/mongoService");

const authRoute = require("./routes/authRoute");
const uploadRoute = require("./routes/uploadRoute");
const historyRoute = require("./routes/historyRoute");
const analyzeRoute = require("./routes/analyzeRoute");

const errorHandler = require("./middleware/errorHandler");

const passport = require("passport");
require("./passport/googleStrategy");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.use(passport.initialize());

app.use("/api", authRoute);
app.use("/api", uploadRoute);
app.use("/api", historyRoute);
app.use("/api", analyzeRoute);

app.use(errorHandler);
// Basic Health Route
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Nyaya Sahayak API is running" });
});

// Start Server and Connect Database
async function start() {
  // 1. Connect to MongoDB first
  await connectMongo();

  // 2. Start the Express server
  const server = app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });

  // 3. Handle port conflicts gracefully
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${config.PORT} is already in use.`);
      process.exit(1);
    }
    throw err;
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});


