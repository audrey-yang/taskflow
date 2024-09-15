import * as React from "react";
import Task from "./components/Task";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="App">
      <h1>My tasks</h1>
      <Task />
      <TaskList />
    </div>
  );
};

export default App;
