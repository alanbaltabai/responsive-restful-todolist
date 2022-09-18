const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
