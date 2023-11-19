const express = require("express");
const Users = require("../models/UserModel");
const userRouter = express.Router();
const generateHashedPassword = require("../routes/encryption");
const bcrypt = require("bcrypt");
const Notes = require("../models/NotesModel");
const jwt = require("jsonwebtoken");

userRouter.get("/", (req, res) => {
  res.send("this is  a User Route");
});

// to get user based on ID
userRouter.get("/:userID", (req, res) => {
  try {
    //   Users.findOne({_id:req.params.u})
  } catch (error) {}
});

//To Signup

userRouter.post("/signup", async (req, res) => {
  try {
    const isUserAlreadyinDB = await Users.findOne({ email: req.body.email });
    if (isUserAlreadyinDB) {
      res.status(400).send({ Message: "User Already Exists" });
    } else {
      const hashedPassword = await generateHashedPassword(req.body.password);
      const data = { ...req.body, password: hashedPassword };
      const user = new Users(data);
      const savedUser = await user.save();
      res.send({ id: savedUser._id, Message: "User SignedUp sucessfully" });
    }
  } catch (error) {
    res.status(500).send({ Message: "Internal Server Error" });
    console.log(error);
  }
});

//TO SignIn
userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserFromDB = await Users.findOne({ email });

    if (!isUserFromDB) {
      res.status(404).send({ Message: "User Not Found. Please SignUp" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserFromDB.password
      );
      if (!isPasswordCorrect) {
        res.status(400).send("Wrong Credentials");
      } else {
        const token = jwt.sign(
          { id: isUserFromDB._id },
          process.env.ACCESS_TOKEN_SECRET
          // { expiresIn: "3m" }
        );

        res
          .status(201)
          .send({ Message: "User LoggedIn Successfully", token: token });
      }
    }
  } catch (error) {
    res.status(500).send({ Message: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = userRouter;
