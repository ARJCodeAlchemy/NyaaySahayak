const express = require("express");
const router = express.Router();

router.post("/upload", async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Upload route reached",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
