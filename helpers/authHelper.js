const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: "access",
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });
};

const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: "refresh",
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
