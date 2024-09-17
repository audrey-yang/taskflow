import { useState } from "react";
import { Task } from "../db/types";
import { useLiveQuery } from "dexie-react-hooks";
import TaskItem from "./TaskItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as api from "./../db/api";
import NewTask from "./NewTask";

const TaskList = () => {
  const unfinished = useLiveQuery(() => api.getIncompleteTasks());
  const finished = useLiveQuery(() => api.getCompleteTasks());

  return (
    <Stack spacing={2}>
      <Stack>
        <NewTask />
        {unfinished?.map((task: Task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </Stack>
      <Stack>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            See completed
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
