import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Summary = () => {
  const [unstarted, setUnstarted] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const getNumberOfTasks = async () => {
      setUnstarted(await window.electron.getNumberOfUnstartedTasks());
      setInProgress(await window.electron.getNumberOfInProgressTasks());
      setCompleted(await window.electron.getNumberOfCompletedTasks());
    };
    getNumberOfTasks();
  }, [unstarted, inProgress, completed]);

  return (
    <Stack direction="row">
      <List dense={true}>
        <ListItem>
          <ListItemIcon>
            <PanoramaFishEyeIcon />
          </ListItemIcon>
          <ListItemText primary={`Not started: ${unstarted}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PendingIcon />
          </ListItemIcon>
          <ListItemText primary={`In progress: ${inProgress}`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={`Completed: ${completed}`} />
        </ListItem>
      </List>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar readOnly />
      </LocalizationProvider>
    </Stack>
  );
};

export default Summary;
