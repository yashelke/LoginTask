import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      navigate('/');
      return;
    }

    // Decode token to get user info (simple decode, in production use proper JWT decode)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch (error) {
      console.error('Invalid token:', error);
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="jio-logo-small">
          <img src="/jio-logo.png" alt="Jio Digital Life" className="jio-logo-small-img" />
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="success-card">
          <div className="success-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="#10B981"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <h1>Logged In Successfully!</h1>
          <p>Welcome back, <strong>{user.username}</strong></p>
          
          <div className="success-details">
            <div className="detail-item">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{user.username}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Login Time:</span>
              <span className="detail-value">{new Date().toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Session Expires:</span>
              <span className="detail-value">
                {new Date(Date.now() + 60 * 60 * 1000).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="dashboard-actions">
            <button className="primary-btn">
              Continue to Jio 
            </button>
            <button onClick={handleLogout} className="secondary-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Background Animation
      <div className="dashboard-bg">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className={`bg-particle particle-${i % 3 + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Dashboard;