const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Notes", noteSchema);
