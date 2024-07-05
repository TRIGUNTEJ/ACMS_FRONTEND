import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminEnroll from './components/admin/AdminEnroll'
import StudentDashboard from './components/StudentDashbard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-enrollment" element={<AdminEnroll/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
