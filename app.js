if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// exporting packages
const express = require("express"); // exports function
const favicon = require("serve-favicon"); // exports function
const path = require("path");
const routes = require("./routes/routes");
const mongoose = require("mongoose");

// returning an express object
const app = express(); // returns object

// registering view engine
app.set("view engine", "ejs");

// middlewares & static files
app.use(express.urlencoded({ extended: true })); // replaces body-parser
app.use(express.json());
app.use(express.static("public"));
app.use(
	favicon(path.join(__dirname, "public", "images", "icons", "favicon.ico"))
);

// connecting to mongodb & listenning for requests
const PORT = process.env.PORT || 3000;

mongoose
	.connect(process.env.dbURI || "mongodb://localhost/todoDB", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4, // Cannot connect if this statement is missed, Use IPv4, skip trying IPv6. mongod --ipv6 enables IPv6 support. mongod disables IPv6 support by default.
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log("ToDo app has been started on port " + PORT + ".");
		})
	)
	.catch((error) => console.log(error));

// handling routes
app.use("/", routes);
