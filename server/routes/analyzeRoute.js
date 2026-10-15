const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const { extractTextFromPDF } = require("../services/pdfService");
const { saveHistory } = require("../services/historyService");


router.post("/analyze", authenticate, upload.single("file"), async (req, res, next) => {
  try {
    let caseText;
    let inputType = "text";

    if (req.file) {
      caseText = await extractTextFromPDF(req.file.buffer);
      inputType = "pdf";
    } else if (req.body && req.body.text) {
      caseText = req.body.text;
    } else {
      return res.status(400).json({
        error: "Please provide either a PDF file or case text.",
      });
    }


    if (caseText.length < 50) {
      return res.status(400).json({ error: "Case description is too short (min 50 chars)." });
    }
    // Send data to Python FastAPI server
    const pythonResponse = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: caseText })
    });

    if (!pythonResponse.ok) {
      const errorData = await pythonResponse.json();
      throw new Error(errorData.detail || "Failed to analyze text from Python API");
    }

    // Get the real AI response from Python
    const analysis = await pythonResponse.json();


    try {
      await saveHistory({
        userId: req.user.userId,
        caseText,
        inputType,
        analysis,
      });
    } catch (historyError) {
      console.warn("Failed to save history:", historyError.message);
    }

    res.json(analysis);

  } catch (err) {
    next(err);
  }
});

module.exports = router;