import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import * as db from "./db/mongo/api";
import mongoose from "mongoose";
import { Priority, Status } from "./db/types";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

import { updateElectronApp } from "update-electron-app";
updateElectronApp(); // additional configuration options available

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

export const setIPCMainHandlers = () => {
  mongoose.connect(
    "mongodb+srv://rw1:CefEEiZDlXW59EJ9@cluster0.pzgdj.mongodb.net/taskflow?retryWrites=true&w=majority&appName=cluster0"
  );

  ipcMain.handle("db:addTask", async (_, description, priority, parentTask) => {
    return await db.addTask(description, priority, parentTask);
  });

  ipcMain.handle(
    "db:updateTask",
    async (
      _,
      id,
      update: {
        description?: string;
        priority?: Priority;
        status?: Status;
        note?: string;
      }
    ) => {
      return await db.updateTask(id, update);
    }
  );

  ipcMain.handle("db:deleteTask", async (_, id) => {
    return await db.deleteTask(id);
  });

  ipcMain.handle("db:getTasks", async (_) => {
    return await db.getTasks();
  });

  ipcMain.handle("db:getSubtasks", async (_, parentPath) => {
    return await db.getSubtasks(parentPath);
  });

  ipcMain.handle("db:getIncompleteTasks", async (_) => {
    return await db.getIncompleteTasks();
  });

  ipcMain.handle("db:getCompleteTasks", async (_) => {
    return await db.getCompleteTasks();
  });

  ipcMain.handle("db:getNumberOfUnstartedTasks", async (_) => {
    return await db.getNumberOfUnstartedTasks();
  });

  ipcMain.handle("db:getNumberOfInProgressTasks", async (_) => {
    return await db.getNumberOfInProgressTasks();
  });

  ipcMain.handle("db:getNumberOfCompletedTasks", async (_) => {
    return await db.getNumberOfCompletedTasks();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  setIPCMainHandlers();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
