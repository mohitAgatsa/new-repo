const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { jwtkey } = require("../keys");
const { use } = require("../routes/authRoutes");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    //authorization === Bearer sdahiqojqoij
    return res.status(401).send({ error: "You must logged in" });
  }
  const token = authorization.replace("Bearer", "");
  //   console.log(token);
  jwt.verify(token, jwtkey, async (error, payload) => {
    if (error) {
      //   console.log(error);
      return res.status(401).send({ error: "You must logged in" });
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
