import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/StudentDashboard.css'; 

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3041/api/courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setCourses(data);
      })
      .catch(err => {
        console.error('Error:', err);
        setError('Failed to fetch courses. Please try again.');
      });
  }, []);

  return (
    <div className="student-dashboard">
      <h2>Admin Dashboard - Courses</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="courses-list">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Duration: {course.duration}</p>
            <Link to={`/courses/${course._id}`} className="view-course-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
