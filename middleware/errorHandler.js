const errorHandler = async (err, req, res, next) => {
  // Handle invalid JSON
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  // Handle JWT errors
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  // Fallback generic error
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
