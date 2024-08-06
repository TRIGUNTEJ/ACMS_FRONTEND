import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import '../../css/admin/admin_faculty.css';

const FacultyManagement = () => {
  const [adminName, setAdminName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [FacultyName, setFacultyName] = useState('');
  const [FacultyEmail, setFacultyEmail] = useState('');
  const [HighestGraduation, setHighestGraduation] = useState('');
  const [Certifications, setCertifications] = useState([{ title: '', link: '' }]);
  const [ResearchPapers, setResearchPapers] = useState([{ title: '', link: '' }]);
  const [Experience, setExperience] = useState('');
  const [AreaOfGraduation, setAreaOfGraduation] = useState('');
  const formRef = useRef(null);
  const [showAddFaculty, setshowAddFaculty] = useState(false);
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [updateFacultyData, setUpdateFacultyData] = useState({});
  const popupRef = useRef(null);

  const navigate = useNavigate();

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
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAdminName(data.name);
        })
        .catch((err) => {
          console.error('Error fetching admin details:', err);
          navigate('/');
        });
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('https://acms-backend-c1vn.onrender.com/faculty-list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setFacultyList(data.faculty);
      })
      .catch((err) => {
        console.error('Error fetching faculty details:', err);
      });
  }, []);

  const handleLogout = () => {
    fetch('https://acms-backend-c1vn.onrender.com/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        localStorage.removeItem('adminEmail');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleAddFaculty = () => {
    setshowAddFaculty(!showAddFaculty);
  };
  const navigateTo = (route) => {
    navigate(route);
  };
  const handleCertChange = (index, field, value) => {
    const updatedCertifications = [...Certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  const addCertification = () => {
    setCertifications([...Certifications, { title: '', link: '' }]);
  };

  const handlePaperChange = (index, field, value) => {
    const updatedResearchPapers = [...ResearchPapers];
    updatedResearchPapers[index][field] = value;
    setResearchPapers(updatedResearchPapers);
  };

  const addResearchPaper = () => {
    setResearchPapers([...ResearchPapers, { title: '', link: '' }]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedCertifications = Certifications.map((cert) => ({
      title: cert.title,
      link: cert.link,
    }));

    const formattedResearchPapers = ResearchPapers.map((paper) => ({
      title: paper.title,
      link: paper.link,
    }));

    fetch('https://acms-backend-c1vn.onrender.com/add-faculty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FacultyName,
        FacultyEmail,
        HighestGraduation,
        AreaOfGraduation,
        Certifications: formattedCertifications,
        Experience,
        ResearchPapers: formattedResearchPapers,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setshowAddFaculty(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setshowAddFaculty(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchFacultyDetails = (id) => {
    fetch(`https://acms-backend-c1vn.onrender.com/faculty/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedFaculty(data);
        setUpdateFacultyData(data);
      })
      .catch((err) => {
        console.error('Error fetching faculty details:', err);
      });
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedFaculty(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 
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
        <div className="text">Faculty Management</div>
        <div className="add-faculty">
          <button className="add-faculty-button" onClick={toggleAddFaculty}>Add Faculty</button>
        </div>
        <div className="faculty-container">
          <h2 className="faculty-header">
            <span className="header-item">S.NO</span>
            <span className="header-item">NAME</span>
            <span className="header-item">DEPARTMENT</span>
            <span className="header-item">DESIGNATION</span>
          </h2>
          <div className="faculty-cards">
            {facultyList.map((faculty, index) => (
              <div key={faculty._id} className="faculty-card">
                <div className="faculty-info">
                  <span className="serial-number">{index + 1}</span>
                  <span className="faculty-name">{faculty.FacultyName}</span>
                  <span className="faculty-department">{faculty.Department}</span>
                  <span className="faculty-position">{faculty.Position}</span>
                </div>
                <div className="faculty-actions">
                  <button className="update-button">Update</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAddFaculty && (
         <div className="add-faculty-form" ref={formRef}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="FacultyName">Name:</label>
              <input type="text" id="FacultyName" name="FacultyName" value={FacultyName} onChange={e => setFacultyName(e.target.value)} required />

              <label htmlFor="FacultyEmail">Email:</label>
              <input type="email" id="FacultyEmail" name="FacultyEmail" value={FacultyEmail} onChange={e => setFacultyEmail(e.target.value)} required />

              <label htmlFor="HighestGraduation">Highest Graduation:</label>
              <input type="text" id="HighestGraduation" name="HighestGraduation" value={HighestGraduation} onChange={e => setHighestGraduation(e.target.value)} required />

              <label htmlFor="AreaOfGraduation">Area Graduation:</label>
              <input type="text" id="AreaOfGraduation" name="AreaOfGraduation" value={AreaOfGraduation} onChange={e => setAreaOfGraduation(e.target.value)} required />

              <label htmlFor="Certifications">Certifications:</label>
              {Certifications.map((cert, index) => (
                <div key={index}>
                  <input type="text" placeholder="Title" value={cert.title} onChange={e => handleCertChange(index, 'title', e.target.value)} required />
                  <input type="text" placeholder="Link" value={cert.link} onChange={e => handleCertChange(index, 'link', e.target.value)} required />
                </div>
              ))}
              <button type="button" onClick={addCertification}>Add Certification</button>

              <label htmlFor="ResearchPapers">Research Papers:</label>
              {ResearchPapers.map((paper, index) => (
                <div key={index}>
                  <input type="text" placeholder="Title" value={paper.title} onChange={e => handlePaperChange(index, 'title', e.target.value)} required />
                  <input type="text" placeholder="Link" value={paper.link} onChange={e => handlePaperChange(index, 'link', e.target.value)} required />
                </div>
              ))}
              <button type="button" onClick={addResearchPaper}>Add Research Paper</button>

              <label htmlFor="Experience">Experience:</label>
              <input type="text" id="Experience" name="Experience" value={Experience} onChange={e => setExperience(e.target.value)} required />

              <button type="submit">Add Faculty</button>
            </form>
          </div>
        )}
        
      </section>
    </div>
  );
};

export default FacultyManagement;

