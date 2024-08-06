import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import '../../css/admin/admin_view_course.css';

const AdminCourseDetails = () => {
  const [adminName, setAdminName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { course } = location.state || {}; 

  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminEmail) {
      fetch(`https://acms-backend-c1vn.onrender.com/admin-dashboard?email=${adminEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          setAdminName(data.name);
        })
        .catch(err => {
          console.error('Error fetching admin details:', err);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    fetch('https://acms-backend-c1vn.onrender.com/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        localStorage.removeItem('adminEmail');
        navigate('/');
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateTo = route => {
    navigate(route);
  };

  if (!course) {
    navigate('/admin-dashboard');
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-details">
          <div className="logo_name">ACMS</div>
          <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="nav-list">
          <li>
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search..." />
            <span className="tooltip">Search</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/admin-dashboard')}>
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </button>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/admin-enrollment')}>
              <i className="bx bx-book-alt"></i>
              <span className="links_name">Enrollment Management</span>
            </button>
            <span className="tooltip">Enrollment Management</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/students')}>
              <i className="bx bx-user"></i>
              <span className="links_name">Student Management</span>
            </button>
            <span className="tooltip">Student Management</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/faculty')}>
              <i className="bx bx-group"></i>
              <span className="links_name">Faculty Management</span>
            </button>
            <span className="tooltip">Faculty Management</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/reports')}>
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Reports</span>
            </button>
            <span className="tooltip">Reports</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/announcements')}>
              <i className="bx bx-bell"></i>
              <span className="links_name">Announcements</span>
            </button>
            <span className="tooltip">Announcements</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/profile')}>
              <i className="bx bx-user"></i>
              <span className="links_name">Profile</span>
            </button>
            <span className="tooltip">Profile</span>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigateTo('/help')}>
              <i className="bx bx-chat"></i>
              <span className="links_name">Help</span>
            </button>
            <span className="tooltip">Help</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              <div className="name_job">
                <div className="name">{adminName}</div>
                <div className="job">ADMIN</div>
              </div>
            </div>
            <i className="bx bx-log-out" id="log_out" onClick={handleLogout}></i>
          </li>
        </ul>
      </div>
      <section className="home-section">
      <div className = "course-title">{course.CourseName}</div>
        <div className="course-details">
          <p><strong>Course Code:</strong> {course.CourseCode}</p>
          <p><strong>Department:</strong> {course.Department}</p>
          <p><strong>Credits:</strong> {course.Credits}</p>
          <p><strong>Semester:</strong> {course.Semester}</p>
          <p><strong>Sections:</strong> {course.Sections.join(', ')}</p>
          <p><strong>Capacity:</strong> {course.Capacity}</p>
        </div>
      </section>
    </div>
  );
};

export default AdminCourseDetails;
