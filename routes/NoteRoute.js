const express = require("express");
const bcrypt = require("bcrypt");
const Notes = require("../models/NotesModel");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middlewares/authenticator");
const noteRouter = express.Router();
noteRouter.use(authenticator);

//HomePage
noteRouter.get("/", (req, res) => {
  res.send("All notes");
});

//create a Note
noteRouter.post("/create", async (req, res) => {
  try {
    const data = new Notes(req.body);
    await data.save();
    res.status(201).send({ Message: "Note Created", data });
  } catch (error) {
    res.status(500).send({ Message: "Internal Server Error" });
  }
});

//Edit A Note
noteRouter.put("/edit/:noteid", async (req, res) => {
  try {
    const noteId = req.params.noteid;
    const updatedNotes = await Notes.findByIdAndUpdate(
      { _id: noteId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedNotes) {
      res.status(404).send({ Message: "Note Not found" });
    }
    res
      .status(201)
      .send({ _id: updatedNotes._id, Message: "Note Updated Successfully" });
  } catch (error) {
    res.status(500).send({ error, Message: "Internal Server Error" });
  }
});

// Delete a Note
noteRouter.delete("/delete/:noteid", async (req, res) => {
  try {
    const idToBeDeleted = req.params.noteid;
    const deletedNote = await Notes.deleteOne({ _id: idToBeDeleted });
    if (deletedNote.deletedCount === 0) {
      res.status(404).send({ Message: "Note not found" });
    }
    res
      .status(201)
      .send({ _id: idToBeDeleted, Message: "Note Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = noteRouter;
