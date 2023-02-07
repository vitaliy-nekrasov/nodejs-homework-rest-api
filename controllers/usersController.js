const {
  signupService,
  loginService,
  logoutService,
  changeSubscriptionService,
} = require("../services/usersService");

const signupController = async (req, res) => {
  const { email, password } = req.body;
  const newUser = await signupService(email, password);
  if (!newUser) {
    return res.status(409).json({ message: "Email in use" });
  }
  return res.status(201).json({ newUser });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService(email, password);
  if (!user) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  const { loginUser, token } = user;
  return res.status(200).json({
    token,
    user: {
      email: loginUser.email,
      subscription: loginUser.subscription,
    },
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  const user = await logoutService(_id);
  return res.status(204).json(user);
};

const currentUserController = async (req, res) => {
  const { email, subscription } = req.user;
  return res.status(200).json({ email, subscription });
};

const changeSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  if (!subscription) {
    return res.status(401).json({ message: "Type of subscription not found" });
  }
  const user = await changeSubscriptionService(_id, subscription);
  return res.status(200).json({ user });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
};
