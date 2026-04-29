const jwt = require("jsonwebtoken");

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

exports.isAuth = async (req, res)=> {
  const token = req.cookies.token;

  if(!token) return res.json({isAuth: false, user:null, message: 'user not found'});

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // auth service send user information
  try {
    const user = await authService.getUserById(decoded.id);
    console.log(user);
    
    res.status(200).json({isAuth: true, user: user, message: 'user founded'})
  } catch (err) {
    return res.json({isAuth: false, user: null, message: err.message})
  }
}
