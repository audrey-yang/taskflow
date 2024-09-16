import { useState } from "react";
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
import * as api from "./../db/api";
import NewTask from "./NewTask";

const TaskList = () => {
  const [isAdding, setIsAdding] = useState(false);
  const unfinished = useLiveQuery(() => api.getIncompleteTasks());
  const finished = useLiveQuery(() => api.getCompleteTasks());

  return (
    <Stack spacing={2}>
      <Stack>
        <Stack direction="row" spacing={1} className="h-16">
          <IconButton onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? <RemoveCircleIcon /> : <AddCircleIcon />}
          </IconButton>
          {isAdding ? <NewTask /> : null}
        </Stack>
        {unfinished?.map((task: Task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </Stack>
      <Stack>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            See more
          </AccordionSummary>
          <AccordionDetails>
            {finished?.map((task: Task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
};

export default TaskList;
