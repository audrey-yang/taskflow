import { Task } from "./db";
import { Priority, STATUS, Status } from "../types";
import { ObjectId } from "mongoose";

export const addTask = async (
  description: string,
  pri: Priority,
  parentPath: string
) => {
  try {
    if (description) {
      const task = new Task({
        description,
        priority: pri,
        status: STATUS.NOT_STARTED,
        parentPath,
      });
      await task.save();
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (
  id: ObjectId,
  update: {
    description?: string;
    priority?: Priority;
    status?: Status;
    note?: string;
  }
) => {
  try {
    const task = await Task.findByIdAndUpdate(id, update);
    await task.save();
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: string) => {
  await Task.findByIdAndDelete(id);
  await Task.deleteMany({ parentPath: { $regex: `*${id}*` } });
};

export const getTasks = async () => {
  return await Task.find().lean().populate({
    path: "_id",
  });
};

export const getSubtasks = async (parentPath: string) => {
  return await Task.find({ parentPath }).lean();
};

export const getIncompleteTasks = async () => {
  return await Task.find({
    status: { $ne: STATUS.COMPLETED },
    parentPath: "",
  })
    .sort({ priority: -1, status: -1 })
    .lean();
};

export const getCompleteTasks = async () => {
  return await Task.find({
    status: STATUS.COMPLETED,
    parentPath: "",
  }).lean();
};

export const getNumberOfTasks = async (status: Status) => {
  return await Task.find({ status, parentPath: "" }).countDocuments();
};

export const getNumberOfUnstartedTasks = async () => {
  return await getNumberOfTasks(STATUS.NOT_STARTED);
};

export const getNumberOfInProgressTasks = async () => {
  return await getNumberOfTasks(STATUS.IN_PROGRESS);
};

export const getNumberOfCompletedTasks = async () => {
  return await getNumberOfTasks(STATUS.COMPLETED);
};
