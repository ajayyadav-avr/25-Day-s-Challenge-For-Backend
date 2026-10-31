const express = require("express");
const userModel = require("../models/user.model");

const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User Already Exist with this email Address",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.Jwt_Secrets,
    { expiresIn: "1h" },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Successfully",
    user,
    token,
  });
});

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.Jwt_Secrets);

  const user = await userModel.findById(decoded.id);
  res.json({
    name: user.name,
    email: user.email,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User Not Found With This Email Address",
    });
  }
const hash = crypto.createHash("md5").update(password).digest("hex");

const isuserPasswordMatched = user.password === hash

    if(!isuserPasswordMatched){
      return res.status(404).json({
        message : "invaild password"
      })
    }

    const token = jwt.sign({
      id : user._id,
    },process.env.Jwt_Secrets,{expiresIn:"1hr"}
  )
  res.cookie("jwt-token",token)

  res.json({
    message : "user logged successfully",
    user :{
        user : user.name,
        email : user.email
    }
  })

});

module.exports = authRouter;
