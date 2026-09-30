import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig'; // Your secure axios instance

const ViewPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch plants from the backend when the component mounts
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get('/plants');
        setPlants(response.data);
      } catch (err) {
        console.error("Failed to fetch plants:", err);
        setError('Could not load your plants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []); // The empty array ensures this runs only once

  // Delete a plant from the database
  const handleDelete = async (plantId) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this plant?')) {
      try {
        await api.delete(`/plants/${plantId}`);
        // Remove the deleted plant from the state to update the UI instantly
        setPlants(plants.filter(plant => plant._id !== plantId));
      } catch (err) {
        console.error("Failed to delete plant:", err);
        setError('Could not delete the plant. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="page-content"><p>Loading your plants...</p></div>;
  }

  if (error) {
    return <div className="page-content"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Your Plants</h2>
        <Link to="/add-plant" className="nav-link" style={{ background: '#4caf50', borderRadius: '20px' }}>Add Plant</Link>
      </div>

      {plants.length === 0 ? (
        <p>You haven't added any plants yet. Get started by adding one!</p>
      ) : (
        <div className="plant-grid">
          {plants.map(plant => (
            <div key={plant._id} className="plant-card">
              <h3>{plant.name}</h3>
              <p><strong>Location:</strong> {plant.location}</p>
              <p><strong>Threshold:</strong> {plant.moistureThreshold}%</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(plant._id)} // Use the MongoDB _id
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
