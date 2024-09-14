import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskTracker from "./TaskTracker";
import HomePage from "./Homepage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/tasktracker" element={<TaskTracker />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
