const Jimp = require("jimp");
const fs = require("fs").promises;

const {
  signupService,
  loginService,
  logoutService,
  changeSubscriptionService,
  changeAvatarService,
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

const changeAvatarController = async (req, res) => {
  const { _id } = req.user;
  const avatarPath = req.file.path;
  const newAvatarName = `${_id}.${req.file.filename}`;

  Jimp.read(avatarPath, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(`public/avatars/${newAvatarName}`, () => {
      fs.unlink(req.file.path);
    });
  });

  const { avatarURL } = await changeAvatarService(_id, newAvatarName);
  return res.status(200).json({ avatarURL });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
  changeAvatarController,
};
