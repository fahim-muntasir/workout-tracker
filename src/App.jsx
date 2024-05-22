import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Workouts from "./pages/Workouts";
import Exercise from "./pages/Exercise";
import AddExercise from "./pages/AddExercise";
import AddWorkout from "./pages/AddWorkout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/workouts" element={<Workouts />} />
      <Route path="/workouts/new" element={<AddWorkout />} />
      <Route path="/exercise" element={<Exercise />} />
      <Route path="/exercise/new" element={<AddExercise />} />
    </Routes>
  );
}

export default App;
