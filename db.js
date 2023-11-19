const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(`Error While connecting to DB: Error- ${error}`);
  }
};

module.exports = connection;
