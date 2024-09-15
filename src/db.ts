import Dexie, { type EntityTable } from "dexie";
import { Task } from "./object_types";

const tasks_db = new Dexie("TasksDatabase") as Dexie & {
  tasks: EntityTable<
    Task,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
tasks_db.version(1).stores({
  tasks: "++id, description, note, priority, status, subtasks",
});

export { tasks_db };
