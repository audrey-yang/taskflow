import mongoose from "mongoose";
import { Priority, Status } from "../types";
import mongooseLeanId from "mongoose-lean-id";

const TaskSchema = new mongoose.Schema({
  description: String,
  note: String,
  priority: Number,
  status: Number,
  parentPath: String,
});
TaskSchema.plugin(mongooseLeanId);

export interface Task {
  id: string;
  description: string;
  note?: string;
  priority: Priority;
  status: Status;
  parentPath?: string;
}

export const Task = mongoose.model("Task", TaskSchema);
