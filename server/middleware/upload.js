const multer = require("multer");

const storage = multer.memoryStorage();

const allowedPdfMimeTypes = new Set([
  "application/pdf",
  "application/x-pdf",
  "text/pdf",
]);

// This configuration restricts file size and only allows PDF uploads
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
  fileFilter: (req, file, cb) => {
    const mime = String(file.mimetype || "").toLowerCase();
    const hasPdfExtension = /\.pdf$/i.test(String(file.originalname || ""));

    if (allowedPdfMimeTypes.has(mime) && hasPdfExtension) {
      cb(null, true);
    } else {
      const err = new Error("Only PDF files are accepted");
      err.statusCode = 415;
      cb(err, false);
    }
  },
});

module.exports = upload;
