// connect to the database
const db = require("../db");

// model of Student-Courses table, ie database schema/structure of the Song db
const StudentCourse = db.model("StudentCourse", {
	studentId: { type: String, required: true },
	courseId: { type: String, required: true }
	// courseName: { type: String, required: true }
});

// export
module.exports = StudentCourse;