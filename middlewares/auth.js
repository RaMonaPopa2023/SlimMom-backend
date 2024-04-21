const { User } = require("../models");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      return next(RequestError(401, "Not authorized"));
    }

    try {
      const { id } = jwt.verify(token, jwtSecret);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token) {
        return next(RequestError(401, "Not authorized"));
      }
      req.user = user;
      next();
    } catch (error) {
      return next(RequestError(401, "Not authorized"));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
