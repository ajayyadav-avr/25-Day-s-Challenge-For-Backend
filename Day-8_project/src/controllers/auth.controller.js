const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


async function registerController (req, res){
  // Extract user details from the request body
  const { userName, email, password, bio, profile_image } = req.body;

  // Check whether the username & email is already registered
  const isUseralreadyExiste = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (isUseralreadyExiste) {
    // Check whether the username and email already exist
    const isUserNameExists = isUseralreadyExiste.userName === userName;
    const isEmailExists = isUseralreadyExiste.email === email;

    return res.status(409).json({
      message:
        isEmailExists && isUserNameExists
          ? "User already exists"
          : isEmailExists
            ? "Email already exists"
            : "Username already exists",
    });
  }

  // Hash the user's password before storing it in the database
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  // Create a new user record in the database
  const newUser = await userModel.create({
    userName,
    email,
    password: hashedPassword,
    bio,
    profile_image,
  });

  // Generate a JWT authentication token for the newly registered user
  const authToken = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_Secrets,
    { expiresIn: "1d" },
  );
  // Store the authentication token in a browser cookie
  res.cookie("Token", authToken);

  // Send the successful registration response
  res.status(201).json({
    message: "User Register Successfully",
    newUser: {
      email: newUser.email,
      userName: newUser.userName,
      bio: newUser.bio,
      profile_image: newUser.profile_image,
    },
    token: authToken,
  });
}

async function loginController (req, res){
  // Extract user details from the request body
  const { userName , email, password } = req.body;

  // Find user by email
  const user = await userModel.findOne({
    $or:[{userName : userName},{email : email}]
});
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  // Hash the entered password
  const hashUserPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  // Compare entered password hash with stored hash
  const isPasswordValid = user.password === hashUserPassword;

  if (!isPasswordValid) {
    return res.status(404).json({
      message: "Invalid Password",
    });
  }

  // Generate JWT
  const authToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_Secrets,
    { expiresIn: "1d" },
  );
  // Set authentication cookie
  res.cookie("Token", authToken);

  // Send the successful login response
  res.status(200).json({
    message: "User Login Successfully",
    user: {
      email: user.email,
      userName: user.userName,
      bio: user.bio,
      profile_image: user.profile_image,
    },
  });
}

module.exports = {
    registerController,
    loginController
}