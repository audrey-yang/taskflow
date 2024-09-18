import * as api from "../db/api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLiveQuery } from "dexie-react-hooks";

const Summary = () => {
  const unstarted = useLiveQuery(() => api.getNumberOfUnstartedTasks());
  const started = useLiveQuery(() => api.getNumberOfInProgressTasks());
  const completed = useLiveQuery(() => api.getNumberOfCompletedTasks());

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
        <ListItemText primary={`In progress: ${started}`} />
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
