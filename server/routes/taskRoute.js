const { getTasks, addTask, editTask, getTaskById } = require("../controllers/taskController");

const taskRouter = require("express").Router();

taskRouter.route("/").get(getTasks);
taskRouter.route("/:taskId").get(getTaskById);
taskRouter.route("/add").post(addTask);
taskRouter.route("/edit/:taskId").put(editTask);

exports.taskRouter = taskRouter;