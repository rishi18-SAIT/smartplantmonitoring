import React, { useEffect, useState } from 'react';
import { getPlants, addPlant } from '../api';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    moistureThreshold: '',
    currentMoisture: '',
    wateringFrequency: '',
    lastWatered: '',
    alertEnabled: true
  });

  useEffect(() => {
    getPlants()
      .then(res => {
        setPlants(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching plants:', err);
        setError('Failed to load plants.');
        setLoading(false);
      });
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
      const res = await addPlant(formData);
      setPlants(prev => [...prev, res.data]);
      setFormData({
        name: '',
        location: '',
        moistureThreshold: '',
        currentMoisture: '',
        wateringFrequency: '',
        lastWatered: '',
        alertEnabled: true
      });
    } catch (err) {
      console.error('Error adding plant:', err);
      alert('Failed to add plant');
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading plants...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div className="App">
      <div className="overlay">
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
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              name="alertEnabled"
              checked={formData.alertEnabled}
              onChange={handleChange}
            />
            Enable Alert
          </label>

          <button type="submit">➕ Add Plant</button>
        </form>
      </div>

      {/* Plant Cards */}
      {plants.length === 0 ? (
        <p style={{ marginTop: '2rem', color: 'white' }}>No plant data available.</p>
      ) : (
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
