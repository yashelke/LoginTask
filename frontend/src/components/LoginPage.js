import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/users/login', {
        username: formData.username,
        password: formData.password
      });

      if (response.data.token) {
        // Store token if remember me is checked
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
        } else {
          sessionStorage.setItem('token', response.data.token);
        }
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background circles - exact pattern from image */}
      <div className="circles">
        {/* Row 1 */}
        <div className="circle circle-teal" style={{ left: '5%', top: '8%' }} />
        <div className="circle circle-teal" style={{ left: '15%', top: '8%' }} />
        <div className="circle circle-teal" style={{ left: '25%', top: '8%' }} />
        <div className="circle circle-navy" style={{ left: '35%', top: '8%' }} />
        <div className="circle circle-light-blue" style={{ left: '45%', top: '8%' }} />
        <div className="circle circle-light-blue" style={{ left: '55%', top: '8%' }} />
        
        {/* Row 2 */}
        <div className="circle circle-teal" style={{ left: '5%', top: '22%' }} />
        <div className="circle circle-navy" style={{ left: '15%', top: '22%' }} />
        <div className="circle circle-light-blue" style={{ left: '25%', top: '22%' }} />
        <div className="circle circle-navy" style={{ left: '35%', top: '22%' }} />
        <div className="circle circle-teal" style={{ left: '45%', top: '22%' }} />
        <div className="circle circle-teal" style={{ left: '55%', top: '22%' }} />
        
        {/* Row 3 */}
        <div className="circle circle-navy-large" style={{ left: '5%', top: '36%' }} />
        <div className="circle circle-navy" style={{ left: '20%', top: '36%' }} />
        <div className="circle circle-navy" style={{ left: '30%', top: '36%' }} />
        <div className="circle circle-teal" style={{ left: '40%', top: '36%' }} />
        <div className="circle circle-navy" style={{ left: '50%', top: '36%' }} />
        
        {/* Row 4 */}
        <div className="circle circle-navy" style={{ left: '5%', top: '50%' }} />
        <div className="circle circle-navy" style={{ left: '15%', top: '50%' }} />
        <div className="circle circle-navy" style={{ left: '25%', top: '50%' }} />
        <div className="circle circle-teal" style={{ left: '35%', top: '50%' }} />
        <div className="circle circle-navy" style={{ left: '45%', top: '50%' }} />
        
        {/* Row 5 */}
        <div className="circle circle-teal" style={{ left: '5%', top: '64%' }} />
        <div className="circle circle-navy" style={{ left: '15%', top: '64%' }} />
        <div className="circle circle-light-blue" style={{ left: '25%', top: '64%' }} />
        <div className="circle circle-navy" style={{ left: '35%', top: '64%' }} />
        <div className="circle circle-teal" style={{ left: '45%', top: '64%' }} />
        <div className="circle circle-teal" style={{ left: '55%', top: '64%' }} />
        
        {/* Row 6 */}
        <div className="circle circle-teal" style={{ left: '5%', top: '78%' }} />
        <div className="circle circle-teal" style={{ left: '15%', top: '78%' }} />
        <div className="circle circle-teal" style={{ left: '25%', top: '78%' }} />
        <div className="circle circle-navy" style={{ left: '35%', top: '78%' }} />
        <div className="circle circle-light-blue" style={{ left: '45%', top: '78%' }} />
        <div className="circle circle-light-blue" style={{ left: '55%', top: '78%' }} />
      </div>

      {/* Jio Logo */}
      <div className="jio-logo">
        <div className="logo-container">
          <img src="/jio-logo.png" alt="Jio Digital Life" className="jio-logo-img" />
        </div>
      </div>

      {/* Login Form */}
      <div className="login-form-container">
        <div className="login-form">
          <h1>Welcome to Jio</h1>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Reliance ID / Email address*</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Next'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;