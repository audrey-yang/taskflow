import { Typography } from "@mui/material";
import TaskList from "./components/TaskList";
import Status from "./components/Status";

const App = () => {
  return (
    <div className="App">
      <Typography variant="h3" className="my-2">
        Taskflow
      </Typography>
      <Status />
      <TaskList />
    </div>
  );
};

export default App;
