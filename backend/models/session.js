const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	token:String,
	username:String,
	ttl:String
})

module.exports = mongoose.model("Session",Schema);