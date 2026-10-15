const { verifyToken } = require("../services/authService");

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
}

module.exports = authenticate;
