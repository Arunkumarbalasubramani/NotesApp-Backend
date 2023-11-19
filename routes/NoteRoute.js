const express = require("express");
const bcrypt = require("bcrypt");
const Notes = require("../models/NotesModel");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get("/", (req, res) => {
  res.send("Hello");
});
module.exports = noteRouter;
