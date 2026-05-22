const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 */
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members")
      .populate("createdBy");

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;