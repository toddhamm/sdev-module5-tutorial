// connect to the database
const db = require("../db");

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// model of Song, ie database schema/structure of the Song db
// first time script is run it will create the name table below and append an s to it
// in this case, new table Users will be created with the following structure
const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	password: { type: String, required: true },
	userType: { type: Number, required: true }, 
	status: { type: String }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Then compile the model LAST
const User = mongoose.model('User', userSchema);

// export
module.exports = User;