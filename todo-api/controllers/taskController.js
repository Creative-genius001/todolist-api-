const { Task } = require("../models/task");

//add task to todo
exports.addTask = async (req, res) => {
	let task = new Task({
		text: req.body.text,
	});

	try {
		await task.save();
		res
			.status(201)
			.send("Task successfully added");
	} catch (err) {
		console.error(err);
	}
};

//delete a task
exports.deleteTask = async (req, res) => {
	const task = await Task.findByIdAndDelete(
		req.params.id,
	).catch((err) => console.log(err));
	res.status(500).send("deleted successfully");
};

//update a task
exports.updateTask = async (req, res) => {
	const taskID = req.params.id;
	const updatedTask = req.body.text;
	if (!updatedTask) {
		return;
	}
	try {
		const task = await Task.findByIdAndUpdate(
			taskID,
			{
				$set: {
					text: updatedTask,
					modifiedOn: Date.now(),
				},
			},
			{ new: true },
		);
		res
			.status(200)
			.send("succesfully updated task details!✔");
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Failed",
			message: err.message,
		});
	}
};

//view all the tasks
exports.getTasks = async (req, res) => {
	await Task.find({}, (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	}).catch((err) => console.log(err));
};

//Complete a task
exports.completeTask = async (req, res) => {
	const taskID = req.params.id;
	try {
		const task = await Task.findByIdAndUpdate(
			taskID,
			{
				$set: {
					isCompleted: true,
					completedOn: Date.now(),
					modifiedOn: Date.now(),
				},
			},
			{ new: true },
		);
		res
			.status(200)
			.send("succesfully completed the task");
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: "Failed",
			message: err.message,
		});
	}
};
