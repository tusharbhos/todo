import express from "express";
import { TaskModel } from "../models.js";
import { connect } from "../dbConfig.js";

connect();
const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.send(tasks);
    } catch (err) {
        console.log("Error while getting tasks");
        res.status(400).send("Error while fetching tasks");
    }
});

// POST a new task
router.post("/", async (req, res) => {
    try {
        const { assignedTo, status, dueDate, priority, comments, desc, completed } = req.body;

        const newTask = new TaskModel({
            assignedTo: assignedTo,
            status: status || 'Pending', // Default to 'Pending' if not provided
            dueDate: new Date(dueDate),   // Convert to Date object
            priority: priority || 'Medium', // Default to 'Medium' if not provided
            comments: comments || '',      // Default to empty string if no comments
            desc: desc || 'Sample Desc',   // Default description if not provided
            completed: completed || false  // Default to false if not provided
        });

        console.log(newTask);
        const result = await newTask.save();
        console.log("Task Saved");
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send("Task not saved");
    }
});

// PUT (Update) an existing task by ID
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { assignedTo, status, dueDate, priority, comments, desc, completed } = req.body;

        const updatedTask = {
            assignedTo: assignedTo,
            status: status,
            dueDate: new Date(dueDate),
            priority: priority,
            comments: comments,
            desc: desc,
            completed: completed
        };

        const updated = await TaskModel.findByIdAndUpdate(id, { $set: updatedTask }, { new: true });
        if (!updated) {
            console.log("Task not found");
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json({ message: "Task Updated Successfully", updatedTask });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            console.log("Task not found");
            return res.status(404).json({ error: "Task not found" });
        }
        console.log("Task deleted Successfully");
        return res.status(200).json({ message: "Task deleted Successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
