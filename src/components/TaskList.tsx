import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewTask from "./NewTask";

const TaskList = () => {
  const [incomplete, setIncomplete] = useState([]);
  const [complete, setComplete] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      setIncomplete(await window.electron.getIncompleteTasks());
      setComplete(await window.electron.getCompleteTasks());
    };
    getTasks();
  }, [incomplete]);

  return (
    <Stack spacing={2}>
      <Stack>
        <NewTask />
        {incomplete?.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </Stack>
      <Stack>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            See completed
          </AccordionSummary>
          <AccordionDetails>
            {complete?.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  );
};

export default TaskList;
