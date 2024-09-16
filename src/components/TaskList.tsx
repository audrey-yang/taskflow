import { useState } from "react";
import { tasks_db } from "./../db/db";
import { Task } from "../db/types";
import { useLiveQuery } from "dexie-react-hooks";
import TaskItem from "./TaskItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const TaskList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const unfinished = useLiveQuery(() =>
    tasks_db.tasks.where("status").notEqual(2).toArray()
  );
  const finished = useLiveQuery(() =>
    tasks_db.tasks.where("status").equals(2).toArray()
  );

  return (
    <Stack spacing={2}>
      <Stack>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? <RemoveCircleIcon /> : <AddCircleIcon />}
          </IconButton>
          {isAdding ? <TaskItem edit={true} key={-1} /> : null}
        </Stack>
        {unfinished?.map((task: Task) => (
          <TaskItem task={task} edit={false} key={task.id} />
        ))}
      </Stack>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Completed tasks
        </AccordionSummary>
        <AccordionDetails>
          {finished?.map((task: Task) => (
            <TaskItem task={task} edit={false} key={task.id} />
          ))}
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default TaskList;
