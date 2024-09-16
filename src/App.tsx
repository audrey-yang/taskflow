import { Typography } from "@mui/material";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="App">
      <Typography variant="h3">Taskflow</Typography>
      <TaskList />
    </div>
  );
};

export default App;
