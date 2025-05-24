import React, { useState, useEffect } from 'react';

const ViewPlants = () => {
  const [plants, setPlants] = useState([]);

  // Load plants from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('plants')) || [];
    setPlants(stored);
  }, []);

  // Delete a plant by its unique id
  const handleDelete = (id) => {
    // Filter out the plant to delete
    const updatedPlants = plants.filter(plant => plant.id !== id);
    
    // Update state with the filtered plants
    setPlants(updatedPlants);
    
    // Save the updated plant list back to localStorage
    localStorage.setItem('plants', JSON.stringify(updatedPlants));
  };

  return (
    <div className="page-content">
      <h2>Monitored Plants</h2>
      {plants.length === 0 ? (
        <p>No plants added yet.</p>
      ) : (
        <div className="plant-grid">
          {plants.map((plant) => (
            <div className="plant-card" key={plant.id}>
              <h3>{plant.name}</h3>
              <p><strong>Location:</strong> {plant.location}</p>
              <p><strong>Threshold:</strong> {plant.moistureThreshold}%</p>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(plant.id)} // Use unique plant id to delete
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPlants;
