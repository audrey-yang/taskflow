import React, { useState } from "react";
import { tasks_db } from "./../db";
import { useLiveQuery } from "dexie-react-hooks";
import { Task } from "./../object_types";

const TaskList = () => {
  const tasks = useLiveQuery(() => tasks_db.tasks.toArray());

  return (
    <ul>
      {tasks?.map((task: Task) => (
        <li key={task.id}>{task.description}</li>
      ))}
    </ul>
  );
};

export default TaskList;
