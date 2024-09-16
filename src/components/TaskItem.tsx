import { useState } from "react";
import { tasks_db } from "../db/db";
import { Task } from "../db/types";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Priority, Status, priority_raw_to_string } from "./../db/types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

const addTask = async (description: string, pri: Priority) => {
  try {
    if (description) {
      await tasks_db.tasks.add({
        description,
        priority: pri,
        status: 0,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (
  id: number,
  update: {
    description?: string;
    priority?: Priority;
    status?: Status;
    note?: string;
  }
) => {
  try {
    await tasks_db.tasks.update(id, update);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (id: number) => {
  await tasks_db.tasks.delete(id);
};

const TaskItem = ({ task, edit }: { task?: Task; edit?: boolean }) => {
  const [isEditingHead, setIsEditingHead] = useState(edit ?? false);
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState(task?.priority ?? 0);
  const [status, setStatus] = useState(task?.status ?? 0);
  const [isEditingBody, setIsEditingBody] = useState(!task?.note);
  const [note, setNote] = useState(task?.note ?? "");

  return (
    <Accordion expanded={expanded} disabled={task === null}>
      <AccordionSummary
        expandIcon={
          task ? (
            <ExpandMoreIcon onClick={() => setExpanded(!expanded)} />
          ) : null
        }
      >
        {isEditingHead ? (
          <>
            <TextField
              label="Description"
              onChange={(ev) => setDescription(ev.target.value)}
              value={description}
              className="w-1/2 mx-2"
            />
            <Select
              value={priority}
              label="Priority"
              onChange={(ev) => setPriority(ev.target.value as Priority)}
              className="w-1/4 mx-2"
            >
              <MenuItem value={0}>Low</MenuItem>
              <MenuItem value={1}>Medium</MenuItem>
              <MenuItem value={2}>High</MenuItem>
            </Select>
            <IconButton
              onClick={() => {
                if (!task) {
                  addTask(description, priority as Priority);
                  setDescription("");
                  setPriority(0);
                } else {
                  updateTask(task.id, {
                    description,
                    priority: priority as Priority,
                  });
                  setIsEditingHead(false);
                }
              }}
              className="w-1/8"
            >
              <DoneIcon />
            </IconButton>
            {task ? (
              <IconButton
                onClick={() => {
                  setDescription(task?.description);
                  setPriority(task?.priority);
                  setIsEditingHead(false);
                }}
                className="w-1/8"
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </>
        ) : (
          <>
            <Typography className="w-1/2" sx={{ margin: "auto 0" }}>
              {description}
            </Typography>
            <Typography className="w-1/5" sx={{ margin: "auto 0" }}>
              {priority_raw_to_string(priority)}
            </Typography>
            <Select
              value={status}
              label="Status"
              onChange={(ev) => {
                updateTask(task.id, {
                  status: ev.target.value as Status,
                });
                setStatus(ev.target.value as Status);
              }}
              className="w-1/5"
            >
              <MenuItem value={0}>Not started</MenuItem>
              <MenuItem value={1}>Started</MenuItem>
              <MenuItem value={2}>Completed</MenuItem>
            </Select>
            <IconButton
              aria-label="edit"
              onClick={() => setIsEditingHead(true)}
              className="w-1/8"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => deleteTask(task.id)}
              className="w-1/8"
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </AccordionSummary>
      <AccordionDetails>
        {isEditingBody ? (
          <Stack direction="row" spacing={2}>
            <TextField
              className="w-3/4"
              label="Add a note"
              value={note}
              onChange={(ev) => setNote(ev.target.value)}
              multiline
              maxRows={4}
            />
            <IconButton
              onClick={() => {
                updateTask(task.id, {
                  note,
                });
                setIsEditingBody(false);
              }}
              className="w-1/8"
            >
              <DoneIcon />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row">
            <Typography className="w-7/8 italic" sx={{ margin: "auto 0" }}>
              Note: {note}
            </Typography>
            <IconButton
              onClick={() => setIsEditingBody(true)}
              className="w-1/8 mx-2"
            >
              <EditIcon />
            </IconButton>
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskItem;
