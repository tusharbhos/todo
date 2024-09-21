import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    assignedTo: { type: String, required: true },  // Field to store the assigned person
    status: { type: String, default: 'Pending' },  // Field to track task status
    dueDate: { type: Date, required: true },       // Field for task due date
    priority: { type: String, default: 'Medium' }, // Field for task priority (Low, Medium, High)
    comments: { type: String, default: '' },       // Field for comments on the task
    createdAt: { type: Date, default: Date.now },  // Field to store the task creation time
    desc: { type: String, default: 'Sample Desc' }, // Field for task description
    completed: { type: Boolean, default: false }   // Field to mark if the task is completed
});

export const TaskModel = mongoose.model("Task", TaskSchema);
