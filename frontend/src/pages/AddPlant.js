// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axiosConfig'; // Use the secure API instance

// const AddPlant = () => {
//   // Simplified form data; the backend handles the rest
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     moistureThreshold: '30',
//     wateringFrequency: '7',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       // Send the new plant data to the secure backend API
//       await api.post('/plants', formData);

//       // Redirect to View Plants page on success
//       navigate('/view-plants');
//     } catch (err) {
//       console.error('Error adding plant:', err);
//       setError('Failed to add plant. Please check the fields and try again.');
//     }
//   };

//   return (
//     <div className="page-content">
//       <h2>Add Plant</h2>
//       <form onSubmit={handleSubmit} className="form-card">
//         <label>Plant Name:</label>
//         <input name="name" value={formData.name} onChange={handleChange} required />

//         <label>Location:</label>
//         <input name="location" value={formData.location} onChange={handleChange} required />

//         <label>Moisture Threshold (%):</label>
//         <input name="moistureThreshold" type="number" min="0" max="100" value={formData.moistureThreshold} onChange={handleChange} required />

//         <label>Watering Frequency (days):</label>
//         <input name="wateringFrequency" type="number" min="1" value={formData.wateringFrequency} onChange={handleChange} required />

//         <button type="submit">Add Plant</button>
//         {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default AddPlant;
