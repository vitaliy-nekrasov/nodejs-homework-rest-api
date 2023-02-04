const { signupService, loginService } = require("../services/usersService");

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
  return res.status(200).json({
    token: user.token,
    user: {
      email: user.updatedUser.email,
      subscription: user.updatedUser.subscription,
    },
  });
};

module.exports = { signupController, loginController };
