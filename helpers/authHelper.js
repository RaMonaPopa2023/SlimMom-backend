const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: "access",
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: "30m" });
};

const generateRefreshToken = (userId) => {
  const payload = {
    userId,
    type: "refresh",
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: "30d" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
