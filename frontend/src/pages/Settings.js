import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // Import the configured axios instance

const Settings = () => {
  // State variables to hold the settings
  const [defaultThreshold, setDefaultThreshold] = useState(30);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(false);
  const [message, setMessage] = useState(''); // For user feedback

  // useEffect runs once when the component loads to get saved settings
  useEffect(() => {
    const savedThreshold = localStorage.getItem('defaultThreshold');
    const savedEmailEnabled = localStorage.getItem('emailAlertsEnabled');
    
    if (savedThreshold) {
      setDefaultThreshold(parseInt(savedThreshold));
    }
    if (savedEmailEnabled) {
      setEmailAlertsEnabled(JSON.parse(savedEmailEnabled));
    }
  }, []);

  const handleSave = async () => {
    // 1. Save the settings to localStorage
    localStorage.setItem('defaultThreshold', defaultThreshold);
    localStorage.setItem('emailAlertsEnabled', emailAlertsEnabled);
    
    setMessage('Settings saved successfully!');

    // 2. If email alerts are enabled, send the confirmation email
    if (emailAlertsEnabled) {
      try {
        await api.post('/email/confirm-logic');
        setMessage('Settings saved! A confirmation email has been sent.');
      } catch (error) {
        console.error('Failed to send confirmation email', error);
        setMessage('Settings saved, but the confirmation email failed to send.');
      }
    }

    // 3. Clear the message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="page-content">
      <h2>Settings</h2>
      <div className="form-card">
        <label>Default Moisture Threshold (%):</label>
        <input 
          type="number" 
          value={defaultThreshold} 
          onChange={(e) => setDefaultThreshold(e.target.value)} 
        />

        <label>
          <input 
            type="checkbox" 
            checked={emailAlertsEnabled} 
            onChange={(e) => setEmailAlertsEnabled(e.target.checked)} 
          />
          Enable Email Notifications
        </label>

        <button onClick={handleSave}>Save</button>

        {/* Display the success or error message to the user */}
        {message && <p style={{ marginTop: '15px', color: '#50fa7b' }}>{message}</p>}
      </div>
    </div>
  );
};

export default Settings;