const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected!");
  } catch (err) {
    console.error("faild connect to DATABASE!!!!");
    console.error(err);
  }
};
