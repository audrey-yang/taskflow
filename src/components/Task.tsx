import React, { useState } from "react";
import { tasks_db } from "./../db";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Task = () => {
  const [task, setTask] = useState("");
  const addTask = async () => {
    try {
      const id = await tasks_db.tasks.add({
        description: task,
        priority: 0,
        status: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Description"
        variant="standard"
        onChange={(ev) => setTask(ev.target.value)}
      />
      <Button variant="contained" onClick={addTask}>
        Add
      </Button>
    </div>
  );
};

export default Task;
