const Note = require("../models/note");

const index = (request, response) => {
	Note.find()
		.sort({ content: -1 })
		.then((result) => {
			response.render("index", {
				headTitle: "ToDo List",
				notes: result,
			});
		})
		.catch((error) => {
			response.status(500);
			console.log(error);
		});
};

const postNote = (request, response) => {
	const note = new Note({ content: request.body.content });

	note
		.save()
		.then(() => {
			response.status(201).json({}); // handshake between server and client, client fetches the data to server, server replies that it received the data.
		})
		.catch((error) => {
			console.log(error);
		});
};

const deleteNote = (request, response) => {
	const _id = request.body._id;

	Note.deleteOne({ _id })
		.then(() => {
			response.json({});
		})
		.catch((error) => {
			console.log(error);
		});
};

const updateNote = (request, response) => {
	const updatedContent = request.body.content;
	const _id = request.body._id;

	Note.updateOne({ _id }, { $set: { content: updatedContent } })
		.then(() => {
			response.status(200).response.json({});
		})
		.catch((error) => {
			response.status(500).json({ error: "Could not update the document." });
		});
};

module.exports = { index, postNote, deleteNote, updateNote };
