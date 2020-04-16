const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    console.log(user);

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "E-mail has already be taken",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "That email is not registered" });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ message: "Wrong email or password" });
      }
      // generate JWT
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        name: fetchedUser.name,
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Auth failed" });
    });
};
