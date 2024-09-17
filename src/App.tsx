import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import TaskList from "./components/TaskList";
import Status from "./components/Status";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Typography variant="h3" className="my-2">
          Taskflow
        </Typography>
        <Status />
        <TaskList />
      </div>
    </ThemeProvider>
  );
};

export default App;
