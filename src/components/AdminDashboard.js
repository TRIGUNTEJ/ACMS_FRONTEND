import React, { useState, useEffect } from 'react';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    
    if (adminEmail) {
      fetch(`https://acms-backend-c1vn.onrender.com/admin-dashboard?email=${adminEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => { console.log(data)
          setAdminName(data.name); 
        })
        .catch(err => {
          console.error('Error fetching admin details:', err);
        });
    }
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="navbar-content">
        <div className="left-content">
          <h2>ACMS</h2>
        </div>
        <div className="right-content">
          <span>{adminName}</span>
          <button className="logout-button">Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        {/* Dashboard content goes here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
