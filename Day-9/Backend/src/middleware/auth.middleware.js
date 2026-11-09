const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const istokenblacklist = await redis.get(token)

  if(istokenblacklist){
    return res.status(401).json({
        message : "Invalid token"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secrets);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
  
}
module.exports = { authUser };