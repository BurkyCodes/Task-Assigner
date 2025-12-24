const { taskModel } = require("../models/taskModel");
const { userModel } = require("../models/userModel");

exports.addTask = async (req, res) => {
    try {
        const { title, description, assigneeId, priority, dueDate } = req.body;

        if (!title || !description || !assigneeId || !priority || !dueDate) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        //console.log(assigneeId)

        //checking user
        const user = await userModel.findById(assigneeId)
        if (!user) {
            return res.status(404).json({ success: false, message: 'Assignee user not found' });
        }

        const newTask = new taskModel({
            title,
            description,
            assigneeId,
            priority,
            status: "incomplete",
            dueDate
        })

        await newTask.save();

        return res.status(201).json({ success: true, message: "Task Created" })
    } catch (error) {
        console.error("Error adding task:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });

    }
}

exports.editTask = async (req, res) => {

    try {
        const { taskId } = req.params;
        const { title, description, status, priority, assigneeId, dueDate } = req.body;

        if (!taskId) {
            return res.status(400).json({ message: "Task Id is required" })
        }

        const task = await taskModel.findById(taskId);



        if (!task) {
            return res.status(400).json({ message: "Task Not Found" })
        }
        const updates = {};

        if (title !== undefined) {
            updates.title = title;
        }
        if (description !== undefined) {
            updates.description = description;
        }
        if (assigneeId !== undefined) {
            const user = await userModel.findById(assigneeId)
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            updates.assigneeId = assigneeId;
        }
        if (status !== undefined) {
            if (!['incomplete', 'complete', 'in-progress'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status value"
                })
            }
            updates.status = status
        }
        if (priority !== undefined) {
            if (!['low', 'medium', 'high'].includes(priority)) {
                return res.status(400).json({
                    success: false,
                    message: "Inalid priority value"
                })
            }
            updates.priority = priority;
        }

        if (dueDate !== undefined) {
            updates.dueDate = dueDate;
        }

        await task.updateOne(updates);

        const updatedTask = await taskModel.findById(taskId);

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask
        })



    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { priority, assigneeId, status } = req.query;

        const query = {}

        if (priority !== undefined) {
            if (!['low', 'medium', 'high'].includes(priority)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid priority. Must be 'low', 'medium', or 'high'"
                });
            }
            query.priority = priority;
        }

        if (assigneeId !== undefined) {
            query.assigneeId = assigneeId
        }
        if (status !== undefined) {
            if (!['incomplete', 'complete', 'in-progress'].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status. Must be 'incomplete', 'complete', or 'in-progress'"
                });
            }
            query.status = status;

        }

        let tasks;
        if (Object.keys(query).length === 0) {
            tasks = await taskModel.find({})
                .populate('assigneeId', 'userName')
        } else {
            tasks = await taskModel.find(query)
                .populate('assigneeId', 'userName');
        }

        return res.status(200).json({
            taskCount: tasks.length
            , tasks: tasks
        })


    } catch (error) {
        console.error("Error getting tasks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await taskModel.findById(taskId)
            .populate('assigneeId', 'userName');



        if (!task) {
            return res.status(400).json({ message: "Task Not Found" })
        }

        return res.status(200).json({
            task
        })
    } catch (error) {
        console.error("Error getting task:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}