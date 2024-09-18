import { tasks_db as db } from "./db";
import { Priority, STATUS, Status } from "./types";

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
        status: STATUS.NOT_STARTED,
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
  await db.tasks
    .filter((task) => task.parentPath.includes(id.toString()))
    .delete();
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
    .notEqual(STATUS.COMPLETED)
    .filter((task) => task.parentPath === "")
    .reverse()
    .sortBy("priority");
};

export const getCompleteTasks = () => {
  return db.tasks
    .where("status")
    .equals(STATUS.COMPLETED)
    .filter((task) => task.parentPath === "")
    .toArray();
};

export const getNumberOfTasks = (status: Status) => {
  return db.tasks
    .where("status")
    .equals(status)
    .filter((task) => task.parentPath === "")
    .count();
};

export const getNumberOfUnstartedTasks = () => {
  return getNumberOfTasks(STATUS.NOT_STARTED);
};

export const getNumberOfInProgressTasks = () => {
  return getNumberOfTasks(STATUS.IN_PROGRESS);
};

export const getNumberOfCompletedTasks = () => {
  return getNumberOfTasks(STATUS.COMPLETED);
};
