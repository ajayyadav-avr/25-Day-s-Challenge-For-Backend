const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegister) {
    return res.status(400).json({
      message: "User with same email & username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_Secrets,
    { expiresIn: "3d" },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
     return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_Secrets,
    { expiresIn: "3d" },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User Logged in Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

module.exports = {
  registerUser,
  loginUser
};
