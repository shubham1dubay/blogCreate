const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../modules/tokenBlacklist");

module.exports = async function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return res
        .status(401)
        .json({ msg: "Token is invalid, please login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ msg: "Invalid or expired token, please login again" });
  }
};
