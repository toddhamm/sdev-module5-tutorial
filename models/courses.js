// connect to the database
const db = require("../db");

// model of Song, ie database schema/structure of the Song db
const Course = db.model("Course", {
	name: { type: String, required: true }
});

// export
module.exports = Course;