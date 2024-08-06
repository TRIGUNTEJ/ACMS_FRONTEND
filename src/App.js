import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminEnroll from './components/admin/AdminEnroll'
import StudentDashboard from './components/StudentDashbard';
import AdminViewCourse from './components/admin/AdminCourseDetails';
import AdminFaculty from './components/admin/AdminFacultyManagement';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-enrollment" element={<AdminEnroll/>} />
          <Route path="/admin-course-details" element={<AdminViewCourse/>} />
          <Route path="/admin-faculty" element={<AdminFaculty/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
