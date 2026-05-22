const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 */
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 */
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo")
      .populate("projectId");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 */
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 */
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;