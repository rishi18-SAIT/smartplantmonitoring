import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig'; // Use the correct, configured API instance

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Expanded form data to match your new design
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    moistureThreshold: '',
    currentMoisture: '',
    wateringFrequency: '',
    lastWatered: '',
    alertEnabled: true,
  });

  // Fetch existing plants from the secure backend API
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await api.get('/plants');
        setPlants(res.data);
      } catch (err) {
        console.error('Error fetching plants:', err);
        setError('Failed to load plants.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Prepare the data payload, ensuring correct data types for the backend
      const payload = {
        ...formData,
        moistureThreshold: Number(formData.moistureThreshold),
        currentMoisture: Number(formData.currentMoisture),
        wateringFrequency: Number(formData.wateringFrequency),
        lastWatered: formData.lastWatered || new Date().toISOString(), // Fallback to current time
      };
      
      const res = await api.post('/plants', payload);
      setPlants(prev => [...prev, res.data]);

      // Reset the form to its initial state
      setFormData({
        name: '',
        location: '',
        moistureThreshold: '',
        currentMoisture: '',
        wateringFrequency: '',
        lastWatered: '',
        alertEnabled: true,
      });
    } catch (err) {
      console.error('Error adding plant:', err);
      alert('Failed to add plant. Please check the fields and try again.');
    }
  };

  if (loading) return <div className="page-content"><p style={{ textAlign: 'center' }}>Loading plants...</p></div>;
  if (error) return <div className="page-content"><p style={{ textAlign: 'center', color: 'red' }}>{error}</p></div>;

  return (
    <div className="page-content">
      <div className="overlay" style={{ marginBottom: '2rem' }}>
        <h2>🌿 Smart Plant Dashboard</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Plant Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            name="moistureThreshold"
            type="number"
            placeholder="Moisture Threshold (%)"
            value={formData.moistureThreshold}
            onChange={handleChange}
            required
          />
          <input
            name="currentMoisture"
            type="number"
            placeholder="Current Moisture (%)"
            value={formData.currentMoisture}
            onChange={handleChange}
            required
          />
          <input
            name="wateringFrequency"
            type="number"
            placeholder="Watering Frequency (days)"
            value={formData.wateringFrequency}
            onChange={handleChange}
            required
          />
          <input
            name="lastWatered"
            type="datetime-local"
            value={formData.lastWatered}
            onChange={handleChange}
          />
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'center' }}>
            <input
              type="checkbox"
              name="alertEnabled"
              checked={formData.alertEnabled}
              onChange={handleChange}
            />
            Enable Alert
          </label>

          <button type="submit">➕ Add Plant</button>
          <button 
            type="button" 
            onClick={() => window.open(process.env.REACT_APP_AI_URL || "http://localhost:8501", "_blank")}
          >
            Open Plant Disease Detector
          </button>

        </form>
      </div>

      {/* Display Existing Plant Cards */}
      {plants.length > 0 && (
        <div className="plant-cards-container">
          {plants.map((plant) => (
            <div key={plant._id} className="plant-card">
              <h2>{plant.name}</h2>
              <p><strong>Location:</strong> {plant.location}</p>
              <p><strong>Moisture:</strong> {plant.currentMoisture}%</p>
              <p>
                <strong>Status:</strong>{" "}
                {plant.currentMoisture < plant.moistureThreshold
                  ? "🌧 Needs Water"
                  : "✅ Healthy"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

