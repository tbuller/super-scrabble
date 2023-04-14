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
  }
}

module.exports = UsersController;