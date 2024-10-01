// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { Priority, Status } from "./db/types";

contextBridge.exposeInMainWorld("electron", {
  connect: () => ipcRenderer.invoke("connect"),
  addTask: (description: string, priority: Priority, parentTask: string) =>
    ipcRenderer.invoke("db:addTask", description, priority, parentTask),
  updateTask: (
    id: string,
    update: {
      description?: string;
      priority?: Priority;
      status?: Status;
      note?: string;
    }
  ) => ipcRenderer.invoke("db:updateTask", id, update),
  deleteTask: (id: string) => ipcRenderer.invoke("db:deleteTask", id),
  getTasks: () => ipcRenderer.invoke("db:getTasks"),
  getSubtasks: (parentPath: string) =>
    ipcRenderer.invoke("db:getSubtasks", parentPath),
  getIncompleteTasks: () => ipcRenderer.invoke("db:getIncompleteTasks"),
  getCompleteTasks: () => ipcRenderer.invoke("db:getCompleteTasks"),
  getNumberOfUnstartedTasks: () =>
    ipcRenderer.invoke("db:getNumberOfUnstartedTasks"),
  getNumberOfInProgressTasks: () =>
    ipcRenderer.invoke("db:getNumberOfInProgressTasks"),
  getNumberOfCompletedTasks: () =>
    ipcRenderer.invoke("db:getNumberOfCompletedTasks"),
});
