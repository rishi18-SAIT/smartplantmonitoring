// AddPlant.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPlant = () => {
  const [plant, setPlant] = useState({ name: '', location: '', moistureThreshold: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPlant({ ...plant, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch existing plants
    const existing = JSON.parse(localStorage.getItem('plants')) || [];

    // Add new plant
    const updatedPlants = [...existing, plant];

    // Save to localStorage
    localStorage.setItem('plants', JSON.stringify(updatedPlants));

    // Redirect to View Plants
    navigate('/view-plants');
  };

  return (
    <div className="page-content">
      <h2>Add Plant</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label>Plant Name:</label>
        <input name="name" value={plant.name} onChange={handleChange} required />

        <label>Location:</label>
        <input name="location" value={plant.location} onChange={handleChange} required />

        <label>Moisture Threshold (%):</label>
        <input name="moistureThreshold" type="number" min="0" max="100" value={plant.moistureThreshold} onChange={handleChange} required />

        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
};

export default AddPlant;
