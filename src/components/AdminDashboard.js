import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState('');
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
        .then(response => response.json())
        .then(data => { console.log(data)
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
        console.log(data.message);
        localStorage.removeItem('adminEmail');
        navigate('/');
      })
      .catch(err => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <div className="admin-dashboard">
      <div className="navbar-content">
        <div className="left-content">
          <h2>ACMS</h2>
        </div>
        <div className="right-content">
          <span>Hi, {adminName}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
      </div>
    </div>
  );
};

export default AdminDashboard;
