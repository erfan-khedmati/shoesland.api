const authService = require("../services/auth.service");
const helper = require("../utils/helper");

exports.register = async (req, res) => {
  try {
    // check require body is full
    const body = req.body;

    const checkBody = helper.checkRegisterInput(body);
    if (!checkBody) throw new Error("body format is incorrect!");

    const data = await authService.register(body);
    res.cookie("token", data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    })
    res.status(201).json(data.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // check request body format
    const body = req.body;
    const checkBody = helper.checkLoginInput(body);

    if (!checkBody) throw new Error("body format is incorrect!");

    const data = await authService.login(body);
    res.cookie("token", data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    })

    res.json(data.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
