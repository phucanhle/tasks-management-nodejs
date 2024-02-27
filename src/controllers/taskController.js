// tasks controller

const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.createTask = async (req, res) => {
    const { title, description, status, userId } = req.body;

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser)
            return res.status(404).json({
                status: "error",
                message: "User is not existing.",
            });

        const newTask = new Task({
            title,
            description,
            status,
            userId,
        });

        await newTask.save();

        return res.status(201).json({
            status: "success",
            message: "Task saved.",
            task: {
                id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                status: newTask.status,
                userId: newTask.userId,
                // Include other task details as needed
            },
        });
    } catch (error) {
        console.error("Create Task error:", error.message);

        return res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};
exports.readTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); // Use Task model instead of User model
        return res.status(200).json({
            status: "success",
            message: "Tasks loaded successfully.",
            tasks: tasks,
        });
    } catch (error) {
        console.error("Read Tasks error:", error.message);

        return res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.readTaskDetail = async (req, res) => {
    const taskId = req.params.taskId;
    console.log(taskId);

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send({
                status: "error",
                message: "Task not found.",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Tasks loaded successfully.",
            task: task,
        });
    } catch (error) {
        console.error("Read Task Detail error:", error.message);

        return res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};
exports.updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({
            status: "error",
            message: "Null values detected.",
            req: taskId,
        });
    }

    try {
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
            return res.status(404).json({
                status: "error",
                message: "Task not found.",
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title,
                description,
                status,
            },
            { new: true },
        );

        res.status(201).json({
            status: "success",
            message: "Task updated successfully.",
            updatedTask,
        });
    } catch (error) {
        console.error("Update Task error:", error.message);

        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};
exports.deleteTask = async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            status: "success",
            message: "Task deleted successfully.",
            deletedTask,
        });
    } catch (error) {
        console.error("Delete Task error:", error.message);

        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};
