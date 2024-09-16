import { useState } from "react";
import { TextField, Select, IconButton, MenuItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import { Priority } from "./../db/types";
import * as api from "./../db/api";

const NewTask = ({
  parentPath,
  isSubtask,
}: {
  parentPath: string;
  isSubtask?: boolean;
}) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);

  return (
    <Stack direction="row" className="w-full">
      <TextField
        label="Description"
        onChange={(ev) => setDescription(ev.target.value)}
        value={description}
        className="w-1/2 mx-2 h-12"
      />
      {isSubtask ? null : (
        <Select
          value={priority}
          label="Priority"
          onChange={(ev) => setPriority(ev.target.value as Priority)}
          className="w-1/4 mx-2 h-14"
        >
          <MenuItem value={0}>Low</MenuItem>
          <MenuItem value={1}>Medium</MenuItem>
          <MenuItem value={2}>High</MenuItem>
        </Select>
      )}
      <IconButton
        onClick={() => {
          api.addTask(description, priority as Priority, parentPath);
          setDescription("");
          setPriority(0);
        }}
        className="w-1/8"
      >
        <DoneIcon />
      </IconButton>
    </Stack>
  );
};

export default NewTask;
