import React, { useEffect, useState } from 'react';
import '../assets/alert.css'; // Import the CSS file

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const storedPlants = JSON.parse(localStorage.getItem('plants')) || [];

    // Fetch saved settings
    const defaultThreshold = parseInt(localStorage.getItem('defaultThreshold')) || 30;
    const emailAlertsEnabled = JSON.parse(localStorage.getItem('emailAlertsEnabled'));

    const generatedAlerts = storedPlants.map((plant) => {
      const currentMoisture = Math.floor(Math.random() * 100); // Simulate sensor reading
      const plantThreshold = plant.moistureThreshold || defaultThreshold;
      const type = currentMoisture < plantThreshold ? 'warning' : 'info';
      const time = new Date().toLocaleTimeString();

      const alert = {
        plantName: plant.name,
        location: plant.location,
        threshold: plantThreshold,
        currentMoisture,
        type,
        time
      };

      // Send email if threshold breached and setting is enabled
      if (type === 'warning' && emailAlertsEnabled) {
        fetch('http://localhost:5000/send-alert-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(alert)
        })
        .then(response => {
          if (!response.ok) {
            console.error('❌ Failed to send alert email');
          } else {
            console.log('✅ Alert email sent');
          }
        })
        .catch(err => console.error('❌ Email error:', err));
      }

      return alert;
    });

    setAlerts(generatedAlerts);
  }, []);

  return (
    <div className="page-content">
      <h2>Plant Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts available. Add some plants first.</p>
      ) : (
        <ul className="alert-list">
          {alerts.map((alert, idx) => (
            <li key={idx} className={`alert ${alert.type}`}>
              🌿 <strong>{alert.plantName}</strong> @ {alert.location}<br />
              💧 Current Moisture: {alert.currentMoisture}%<br />
              ⚠ Threshold: {alert.threshold}%<br />
              🕒 {alert.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;
