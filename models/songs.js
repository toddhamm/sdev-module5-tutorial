// connect to the database
const db = require("../db");

// model of Song, ie database schema/structure of the Song db
const Song = db.model("Song", {
	title: { type: String, required: true },
	artist: { type: String, required: true },
	popularity: { type: Number, min: 1, max: 10},
	releaseDate: { type: Date, default: Date.now }, 
	genre: [String]
});

// export
module.exports = Song;