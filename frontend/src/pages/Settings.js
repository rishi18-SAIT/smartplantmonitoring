// Settings.js
import React, { useState } from 'react';

const Settings = () => {
  const [threshold, setThreshold] = useState(30);
  const [emailNotifs, setEmailNotifs] = useState(true);

  const saveSettings = () => {
    alert(`Settings saved!\nThreshold: ${threshold}%\nEmail Notifications: ${emailNotifs}`);
  };

  return (
    <div className="page-content">
      <h2>Settings</h2>
      <div className="form-card">
        <label>Default Moisture Threshold (%):</label>
        <input type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} />

        <label>
          <input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} />
          Enable Email Notifications
        </label>

        <button onClick={saveSettings}>Save</button>
      </div>
    </div>
  );
};

export default Settings;
