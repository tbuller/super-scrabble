const User = require("../models/user");

const UsersController = {
  Create: (req, res, next) => {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        res.status(500).json({ message: "server error", err: err });
      } else {
        res.status(200).json({ message: "OK", user: user });
      }
    })
  },
  List: (req, res, next) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(400).json({ message: "server error", err: err });
      } else {
        res.status(200).json({ message: "OK", users: users });
      }
    })
  },
  AddResult: (req, res, next) => {
    const { userId, result } = req.body;
    User.findOneAndUpdate({ _id: userId }, { $push: { results: result } }, { new: true }, (err, user) => {
      if (err) {
        res.status(500).json({ message: "Bad request", err: err });
      } else {
        res.status(200).json({ message: "OK", user: user });
      }
    })
  }
}

module.exports = UsersController;