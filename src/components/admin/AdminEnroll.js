import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import '../../css/admin/admin_enroll.css'; 

const AdminEnroll = () => {
  const [adminName, setAdminName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [CourseName, setCourseName] = useState('');
  const [CourseCode, setCourseCode] = useState('');
  const [Department, setDepartment] = useState('');
  const [Credits, setCredits] = useState('');
  const [Semester, setSemester] = useState('');
  const [Sections, setSections] = useState(['']); 
  const [Capacity, setCapacity] = useState('');

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
          console.log(data);
          setAdminName(data.name);
        })
        .catch(err => {
          console.error('Error fetching admin details:', err);
          navigate('/');
        });
    } else {
      navigate('/');
    }

    const handleClickOutside = event => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddCourseForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  useEffect(() => {
    axios.get('https://acms-backend-c1vn.onrender.com/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleLogout = () => {
    fetch('https://acms-backend-c1vn.onrender.com/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
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

  const toggleAddCourseForm = () => {
    setShowAddCourseForm(!showAddCourseForm);
  };

  const navigateTo = route => {
    navigate(route);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('https://acms-backend-c1vn.onrender.com/add-course', {
        CourseName,
        CourseCode,
        Department,
        Credits,
        Semester,
        Sections,
        Capacity,
      })
      .then(response => {
        console.log(response.data);
        setShowAddCourseForm(false);
      })
      .catch(error => {
        console.error('Error adding course:', error);
      });
  };

  const handleSectionChange = (index, value) => {
    const updatedSections = [...Sections];
    updatedSections[index] = value;
    setSections(updatedSections);
  };

  const addSectionInput = () => {
    setSections([...Sections, '']);
  };

  const removeSectionInput = index => {
    const updatedSections = [...Sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const viewCourseDetails = (course) => {
    navigate('/admin-course-details', { state: { course } });
  };

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
            <button className="nav-button" onClick={() => navigateTo('/admin-faculty')}>
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
        <div className="text">Course Enrollment</div>
        <button className="add-course-button" onClick={toggleAddCourseForm}>
          Add Course
        </button>
        {showAddCourseForm && (
          <div className="add-course-form" ref={formRef}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="CourseName">Course Name:</label>
              
              <input type="text" id="CourseName"name="CourseName" value={CourseName} onChange={e => setCourseName(e.target.value)} required/>

              <label htmlFor="CourseCode">Course Code:</label>
              <input type="text" id="CourseCode" name="CourseCode" value={CourseCode}  onChange={e => setCourseCode(e.target.value)} required />

              <label htmlFor="Department">Department:</label>
              <input type="text" id="Department" name="Department" value={Department} onChange={e => setDepartment(e.target.value)} required />

              <label htmlFor="Credits">Credits:</label>
              <input type="text" id="Credits" name="Credits" value={Credits} onChange={e => setCredits(e.target.value)} required />

              <label htmlFor="Semester">Semester:</label>
              <input type="text" id="Semester" name="Semester" value={Semester} onChange={e => setSemester(e.target.value)} required />

            <div className="sections-container">
              <label htmlFor="Sections">Sections:</label>
              {Sections.map((section, index) => (
                <div className="section-item" key={index}>
                  <input
                    type="text"
                    value={section}
                    onChange={e => handleSectionChange(index, e.target.value)}
                    required
                  />
                  {index === 0 ? (
                    <button type="button" onClick={addSectionInput}>
                      + Add Section
                    </button>
                  ) : (
                    <button type="button" onClick={() => removeSectionInput(index)}>
                      - Remove Section
                    </button>
                  )}
                </div>
              ))}
            </div>


              <label htmlFor="Capacity">Capacity:</label>
              <input type="text" id="Capacity" name="Capacity" value={Capacity} onChange={e => setCapacity(e.target.value)} required />

              <button type="submit">Add Course</button>
            </form>
          </div>
        )}

        <div className="courses-container">
          {courses.map(course => (
            <div key={course._id} className="course">
              <div className="course-preview">
                <h6>Course Code: {course.CourseCode}</h6>
                <h2>{course.CourseName}</h2>
              </div>
              <div className="course-info">
                <p>Department: {course.Department}</p>
                <p>Credits: {course.Credits}</p>
                <p>Semester: {course.Semester}</p>
                <button className="btn" onClick={() => viewCourseDetails(course)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminEnroll;
