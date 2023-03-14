const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Receiver = require("../models/Receiver");
const registeruser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.age ||
    !req.body.phone ||
    !req.body.bloodGroup
  ) {
    return res.json({ message: "each field is required" });
  }

  const { name, email, password, bloodGroup, age, phone } = req.body;
  const match = await Receiver.find({ email: email });
  if (match.length !== 0) {
    return res.send("user already exist");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Receiver({
    name,
    email,
    password: hashedPassword,
    bloodGroup,
    age,
    phone,
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
  if (req.body.email && req.body.password) {
    const user = await Receiver.findOne({
      email: req.body.email,
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
