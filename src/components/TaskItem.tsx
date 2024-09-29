import { useEffect, useState } from "react";
import {
  PRIORITY,
  STATUS,
  statusToString,
  Priority,
  Status,
  priorityToString,
} from "../db/types";
import { Task } from "src/db/mongo/db";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import NewTask from "./NewTask";
import SubtaskItem from "./SubtaskItem";

const TaskItem = ({ task }: { task: Task }) => {
  const [isEditingHead, setIsEditingHead] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [description, setDescription] = useState(task.description ?? "");
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [isEditingBody, setIsEditingBody] = useState(!task.note);
  const [note, setNote] = useState(task?.note ?? "");
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    const getSubtasks = async () => {
      setSubtasks(
        await window.electron.getSubtasks(`${task.parentPath ?? ""}/${task.id}`)
      );
    };
    getSubtasks();
  }, [subtasks]);

  const headEditor = (
    <>
      <TextField
        label="Task"
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
      <IconButton
        onClick={async () => {
          await window.electron.updateTask(task.id, {
            description,
            priority: priority as Priority,
          });
          setIsEditingHead(false);
        }}
        className="w-1/8"
      >
        <DoneIcon />
      </IconButton>
      {task ? (
        <IconButton
          onClick={() => {
            setDescription(task.description);
            setPriority(task.priority);
            setIsEditingHead(false);
          }}
          className="w-1/8"
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </>
  );

  const headDisplay = (
    <>
      <Typography className="w-1/2" sx={{ margin: "auto 0" }}>
        {description}
      </Typography>
      <Typography className="w-1/5" sx={{ margin: "auto 0" }}>
        {priorityToString(priority)}
      </Typography>
      <Select
        value={status}
        label="Status"
        onChange={async (ev) => {
          await window.electron.updateTask(task.id, {
            status: ev.target.value as Status,
          });
          setStatus(ev.target.value as Status);
        }}
        className="w-1/5"
      >
        <MenuItem value={STATUS.NOT_STARTED}>
          {statusToString(STATUS.NOT_STARTED)}
        </MenuItem>
        <MenuItem value={STATUS.IN_PROGRESS}>
          {statusToString(STATUS.IN_PROGRESS)}
        </MenuItem>
        <MenuItem value={STATUS.COMPLETED}>
          {statusToString(STATUS.COMPLETED)}
        </MenuItem>
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
        onClick={async () => {
          await window.electron.deleteTask(task.id);
        }}
        className="w-1/8"
      >
        <DeleteIcon />
      </IconButton>
    </>
  );

  return (
    <Accordion expanded={expanded} disabled={task === null}>
      <AccordionSummary
        expandIcon={
          task ? (
            <ExpandMoreIcon onClick={() => setExpanded(!expanded)} />
          ) : null
        }
      >
        {isEditingHead ? headEditor : headDisplay}
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
              onClick={async () => {
                await window.electron.updateTask(task.id, {
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
            <Stack className="w-7/8 italic" sx={{ margin: "auto 0" }}>
              <pre>Note: {note}</pre>
            </Stack>
            <IconButton
              onClick={() => setIsEditingBody(true)}
              className="w-1/8 mx-4"
            >
              <EditIcon />
            </IconButton>
          </Stack>
        )}
        <NewTask parentTask={task} isSubtask={true} />
        {subtasks.map((subtask) => (
          <SubtaskItem task={subtask} key={subtask.id} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskItem;
