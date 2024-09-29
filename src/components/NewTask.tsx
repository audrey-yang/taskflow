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
import { PRIORITY, Priority, priorityToString } from "./../db/types";
import { Task } from "src/db/mongo/db";

const NewTask = ({
  parentTask,
  isSubtask,
}: {
  parentTask?: Task;
  isSubtask?: boolean;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(
    parentTask?.priority ?? PRIORITY.LOW
  );

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
              <MenuItem value={PRIORITY.LOW}>
                {priorityToString(PRIORITY.LOW)}
              </MenuItem>
              <MenuItem value={PRIORITY.MEDIUM}>
                {priorityToString(PRIORITY.MEDIUM)}
              </MenuItem>
              <MenuItem value={PRIORITY.HIGH}>
                {priorityToString(PRIORITY.HIGH)}
              </MenuItem>
            </Select>
          )}
          <IconButton
            onClick={async () => {
              await window.electron.addTask(
                description,
                priority as Priority,
                parentTask ? `${parentTask.parentPath}/${parentTask.id}` : ""
              );
              setDescription("");
              setPriority(parentTask?.priority ?? PRIORITY.LOW);
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
