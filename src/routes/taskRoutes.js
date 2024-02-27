// tasks router

const router = require("express").Router();
const tasksController = require("../controllers/taskController");

// baseURL: /TASK/
router.post("/", tasksController.createTask);
router.get("/", tasksController.readTasks);
router.get("/:taskId", tasksController.readTaskDetail);
router.put("/:taskId", tasksController.updateTask);
router.delete("/:taskId", tasksController.deleteTask);

module.exports = router;
