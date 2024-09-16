import React, { useState } from "react";
import { tasks_db } from "./../db/db";
import { Task } from "../db/types";
import { useLiveQuery } from "dexie-react-hooks";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const tasks = useLiveQuery(() => tasks_db.tasks.toArray());

  return (
    <div>
      <TaskItem edit={true} key={-1} />
      {tasks?.map((task: Task) => (
        <TaskItem task={task} edit={false} key={task.id} />
      ))}
    </div>
  );
};

export default TaskList;
