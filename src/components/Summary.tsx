import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Summary = () => {
  const [unstarted, setUnstarted] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const getNumberOfTasks = async () => {
      await window.electron
        .getNumberOfUnstartedTasks()
        .then((res: number) => setUnstarted(res));
      setInProgress(await window.electron.getNumberOfInProgressTasks());
      setCompleted(await window.electron.getNumberOfCompletedTasks());
    };
    getNumberOfTasks();
  }, []);

  return (
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
  );
};

export default Summary;
