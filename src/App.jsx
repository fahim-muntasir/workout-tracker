import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Workouts from "./pages/Workouts";
import Exercise from "./pages/Exercise";
import AddExercise from "./pages/AddExercise";
import AddWorkout from "./pages/AddWorkout";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/:id" element={<AddWorkout />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/exercise/:id" element={<AddExercise />} />
      </Route>
    </Routes>
  );
}

export default App;
