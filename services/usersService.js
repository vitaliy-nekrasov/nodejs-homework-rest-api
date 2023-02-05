const { User } = require("../db/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = String(process.env.JWT_SECRET);

const signupService = async (email, password) => {
  try {
    const user = new User({ email, password });
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
      const token = jwt.sign({ _id: user.id }, JWT_SECRET);
      const updatedUser = await User.findOneAndUpdate(user._id, {
        $set: { token },
      });
      return { updatedUser, token };
    }
    return user;
  } catch (error) {
    console.log(error);
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

const currentUserService = async (id) => {
  try {
    const user = await User.findById(id, { email: 1, subscription: 1, _id: 0 });
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

module.exports = {
  signupService,
  loginService,
  logoutService,
  currentUserService,
  changeSubscriptionService,
};
