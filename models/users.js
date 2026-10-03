// connect to the database
const db = require("../db");

// model of Song, ie database schema/structure of the Song db
// first time script is run it will create the name table below and append an s to it
// in this case, new table Users will be created with the following structure
const User = db.model("User", {
	username: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
});

// export
module.exports = User;