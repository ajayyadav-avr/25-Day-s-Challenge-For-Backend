const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User Already Exist with this email Address",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    name,email,password : hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_Secret,
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Register Successfully",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    message: "this is a protected route",
  });
});

authRouter.post("/login",async (req,res)=>{
  const {email, password} = req.body;

  const user = await userModel.findOne({email})

  if(!user){
    return res.status(404).json({
      message : "User Not Found With This Email Address"
    })
  }
  const isuserPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isuserPasswordMatched){
      return res.status(404).json({
        message : "invaild password"
      })
    }

    const token = jwt.sign({
      id : user._id,
    },process.env.JWT_Secret
  )
  res.cookie("jwt-token",token)

  res.status(200).json({
    message : "user logged successfully",
    user
  })

})

module.exports = authRouter;
