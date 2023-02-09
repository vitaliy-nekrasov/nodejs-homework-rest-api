const { User } = require("../db/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require("dotenv").config();

const JWT_SECRET = String(process.env.JWT_SECRET);
const PORT = process.env.PORT || 3001;

const signupService = async (email, password) => {
  try {
    const avatarURL = gravatar.url(email, { d: "retro" }, true);
    const user = new User({ email, password, avatarURL });
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { _id: user.id, email: user.email, subscription: user.subscription },
        JWT_SECRET
      );
      const loginUser = await User.findOneAndUpdate(
        user._id,
        {
          $set: { token },
        },
        { new: true }
      );
      return { loginUser, token };
    }
  } catch (error) {
    console.log(error.message);
  }
};

const logoutService = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: { token: null },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const changeSubscriptionService = async (id, subscription) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { subscription } }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

const changeAvatarService = async (id, newAvatarName) => {
  try {
    const avatarURL = `http://localhost:${PORT}/avatars/${newAvatarName}`;
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { avatarURL } },
      { new: true }
    );
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupService,
  loginService,
  logoutService,
  changeSubscriptionService,
  changeAvatarService,
};
