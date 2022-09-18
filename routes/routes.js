const router = require("express").Router();
const controller = require("../controllers/controller");

router
	.route("/")
	.get(controller.index)
	.post(controller.postNote)
	.patch(controller.updateNote)
	.delete(controller.deleteNote);

module.exports = router;
