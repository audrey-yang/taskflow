import { tasks_db as db } from "./db";
import { Priority, Status } from "./types";

export const addTask = async (
  description: string,
  pri: Priority,
  parentPath: string
) => {
  try {
    if (description) {
      await db.tasks.add({
        description,
        priority: pri,
        status: 0,
        parentPath,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (
  id: number,
  update: {
    description?: string;
    priority?: Priority;
    status?: Status;
    note?: string;
  }
) => {
  try {
    await db.tasks.update(id, update);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: number) => {
  await db.tasks.delete(id);
};

export const getTasks = () => {
  return db.tasks.toArray();
};

export const getSubtasks = (parentPath: string) => {
  return db.tasks.filter((task) => task.parentPath === parentPath).toArray();
};

export const getIncompleteTasks = () => {
  return db.tasks
    .where("status")
    .notEqual(2)
    .filter((task) => task.parentPath === "")
    .toArray();
};

export const getCompleteTasks = () => {
  return db.tasks
    .where("status")
    .equals(2)
    .filter((task) => task.parentPath === "")
    .toArray();
};
