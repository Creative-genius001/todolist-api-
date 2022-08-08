const mongoose = require("mongoose");

const Task = mongoose.model(
	"Task",
	new mongoose.Schema({
		text: {
			type: String,
			required: true,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
		createdOn: {
			type: Date,
			required: true,
			default: Date.now,
		},
		modifiedOn: {
			type: Date,
			required: true,
			default: Date.now,
		},
		completedOn: {
			type: Date,
			default: null,
		},
	}),
);

exports.Task = Task;
