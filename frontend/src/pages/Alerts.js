import React, { useEffect, useState, useRef } from 'react'; // 1. Import useRef
import '../assets/alert.css';
import api from '../api/axiosConfig'; // Use the secure API instance

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const effectRan = useRef(false); // 2. Create a ref to track if the effect has run

  // Function to fetch plants and generate alerts
  const fetchAndGenerateAlerts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/plants');
      const fetchedPlants = response.data;
      // The 'plants' state was removed as it was unused.

      // Get settings from localStorage
      const defaultThreshold = parseInt(localStorage.getItem('defaultThreshold')) || 30;
      const emailAlertsEnabled = JSON.parse(localStorage.getItem('emailAlertsEnabled'));

      const generatedAlerts = fetchedPlants.map((plant) => {
        const currentMoisture = plant.currentMoisture || Math.floor(Math.random() * 100);
        const plantThreshold = plant.moistureThreshold || defaultThreshold;
        const type = currentMoisture < plantThreshold ? 'warning' : 'info';
        const time = new Date().toLocaleTimeString();

        const alert = {
          plantId: plant._id,
          plantName: plant.name,
          threshold: plantThreshold,
          currentMoisture,
          type,
          time,
        };

        if (type === 'warning' && emailAlertsEnabled) {
          api.post('/email/alert', { plantName: plant.name, currentMoisture, threshold: plantThreshold })
            .then(() => console.log(`✅ Alert email for ${plant.name} sent.`))
            .catch(err => console.error(`❌ Failed to send alert email for ${plant.name}:`, err));
        }
        return alert;
      });

      setAlerts(generatedAlerts);
    } catch (err) {
      console.error("Failed to fetch plants:", err);
      setError('Could not load plant data for alerts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 3. This check prevents the effect from running twice in development
    if (effectRan.current === false) {
      fetchAndGenerateAlerts();

      // The cleanup function sets the ref to true after the first run
      return () => {
        effectRan.current = true;
      };
    }
  }, []);

  // Function to delete a plant
  const handleDeletePlant = async (plantIdToDelete) => {
    if (window.confirm('Are you sure you want to delete this plant? This will remove it permanently.')) {
      try {
        await api.delete(`/plants/${plantIdToDelete}`);
        // Refresh the alerts list after deleting the plant
        fetchAndGenerateAlerts();
      } catch (err) {
        console.error("Failed to delete plant:", err);
        setError('Could not delete the plant. Please try again.');
      }
    }
  };
  
  if (loading) return <div className="page-content"><p>Loading alerts...</p></div>;
  if (error) return <div className="page-content"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="page-content">
      <h2>Plant Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts available. Add some plants first.</p>
      ) : (
        <ul className="alert-list">
          {alerts.map((alert, idx) => (
            <li key={idx} className={`alert ${alert.type}`}>
              🌿 <strong>{alert.plantName}</strong> <br />
              💧 Current Moisture: {alert.currentMoisture}%<br />
              ⚠ Threshold: {alert.threshold}%<br />
              🕒 {alert.time}
              <button
                className="delete-alert-btn"
                onClick={() => handleDeletePlant(alert.plantId)}
              >
                Delete Plant
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;

