import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import CourseDetails from "./component/CourseDetails";
import EditCourse from "./component/EditCourse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course/edit/:id" element={<EditCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
