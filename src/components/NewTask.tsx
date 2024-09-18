import { useState } from "react";
import {
  TextField,
  Select,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Priority, priorityToString, Task } from "./../db/types";
import * as api from "./../db/api";

const NewTask = ({
  parentTask,
  isSubtask,
}: {
  parentTask?: Task;
  isSubtask?: boolean;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(parentTask?.priority ?? 0);

  return (
    <Stack direction="row" spacing={1} className="p-2">
      <Stack direction="row">
        <Typography sx={{ margin: "auto 0" }}>
          {!isAdding ? `Add a new ${isSubtask ? "sub" : ""}task` : ""}
        </Typography>
        <IconButton onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? <RemoveCircleIcon /> : <AddCircleIcon />}
        </IconButton>
      </Stack>

      {isAdding ? (
        <Stack direction="row" className="w-full">
          <TextField
            label="Task"
            onChange={(ev) => setDescription(ev.target.value)}
            value={description}
            className="w-1/2 mx-2"
          />
          {isSubtask ? null : (
            <Select
              value={priority}
              label="Priority"
              onChange={(ev) => setPriority(ev.target.value as Priority)}
              className="w-1/4 mx-2"
            >
              <MenuItem value={0}>{priorityToString(0)}</MenuItem>
              <MenuItem value={1}>{priorityToString(1)}</MenuItem>
              <MenuItem value={2}>{priorityToString(2)}</MenuItem>
            </Select>
          )}
          <IconButton
            onClick={() => {
              api.addTask(
                description,
                priority as Priority,
                parentTask ? `${parentTask.parentPath}/${parentTask.id}` : ""
              );
              setDescription("");
              setPriority(parentTask?.priority ?? 0);
            }}
            className="w-1/8"
          >
            <DoneIcon />
          </IconButton>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default NewTask;
