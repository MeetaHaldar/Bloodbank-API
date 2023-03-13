const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registeruser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.userType
  ) {
    return res.json({ message: "each field is required" });
  }

  const { name, email, password, userType } = req.body;
  const match = await User.find({ email: email, userType: userType });
  if (match) {
    return res.send("user already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    userType,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    const userObj = user.toObject();
    delete userObj.password;

    jwt.sign(
      { user: userObj },
      process.env.JWT_KEY,
      { expiresIn: "4h" },
      (err, accessToken) => {
        if (err) {
          res.send({ message: err.message });
        } else res.send({ user: userObj, accessToken });
      }
    );
  } catch (err) {
    res.json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  if (req.body.email && req.body.password && req.body.userType) {
    const user = await User.findOne({
      email: req.body.email,
      userType: req.body.userType,
    });
    const match = await bcrypt.compare(req.body.password, user.password);

    if (user && !match) {
      return res.send("password is incorrect");
    }
    if (match) {
      const userObj = user.toObject();
      delete userObj.password;
      jwt.sign(
        { user: userObj },
        process.env.JWT_KEY,
        { expiresIn: "4h" },
        (err, accessToken) => {
          if (err) {
            res.send({ message: err.message });
          } else res.send({ user: userObj, accessToken });
        }
      );
    } else {
      res.json({ message: "user not found" });
    }
  } else {
    res.json({ message: "Please Provide Valid credentials" });
  }
};
module.exports = { registeruser, loginUser };
