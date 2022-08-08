const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Task } = require("./models/task");
const cors = require("cors");
const {
	getTasks,
	deleteTask,
	completeTask,
	updateTask,
	addTask,
} = require("./controllers/taskController");

mongoose
	.connect("mongodb://localhost/app")
	.then(() =>
		console.log("connected to mongoose"),
	)
	.catch((err) => console.error(err));

app.use(express.json());
app.use(cors());

app.post("/add", addTask);
app.get("/", getTasks);
app.delete("/delete/:id", deleteTask);
app.put("/update/:id", updateTask);
app.put("/complete/:id", completeTask);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`server is running on port ${PORT}`,
	);
});
