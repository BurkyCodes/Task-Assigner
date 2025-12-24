const { getTasks, addTask, editTask, getTaskById } = require("../controllers/taskController");

const taskRouter = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter tasks by priority
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [incomplete, complete, in-progress]
 *         description: Filter tasks by status
 *       - in: query
 *         name: assigneeId
 *         schema:
 *           type: string
 *         description: Filter tasks by assignee user ID
 *     responses:
 *       200:
 *         description: List of tasks
 */
taskRouter.route("/").get(getTasks);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 */
taskRouter.route("/:taskId").get(getTaskById);

/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - assigneeId
 *               - priority
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               assigneeId:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Task created
 */
taskRouter.route("/add").post(addTask);

/**
 * @swagger
 * /tasks/edit/{taskId}:
 *   put:
 *     summary: Edit a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               assigneeId:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               status:
 *                 type: string
 *                 enum: [incomplete, complete, in-progress]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated
 */

taskRouter.route("/").get(getTasks);
taskRouter.route("/:taskId").get(getTaskById);
taskRouter.route("/add").post(addTask);
taskRouter.route("/edit/:taskId").put(editTask);

exports.taskRouter = taskRouter;