import React from 'react';
import '../css/AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="navbar-content">
        <div className="left-content">
          <h2>ACMS</h2>
        </div>
        <div className="right-content">
          <span>Admin Name</span>
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
