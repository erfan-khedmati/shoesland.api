const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: hashed,
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return { user, token };
};

exports.login = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error("Wrong Password");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return { user, token };
};

exports.getUserById = async(id)=> {
  const user = await User.findById(id).select("-password");

  if(!user) {
    throw new Error("user not found!");
  }

  return user;
}
