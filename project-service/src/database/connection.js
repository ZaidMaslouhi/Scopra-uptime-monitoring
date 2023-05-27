const mongoose = require("mongoose");
const { DB_URI } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the Database!");
  } catch (error) {
    console.error(error);
  }
};
