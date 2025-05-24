import React, { useState } from 'react';
import { addPlant } from '../api';

const AddPlantForm = ({ onPlantAdded }) => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    moistureThreshold: '',
    currentMoisture: '',
    wateringFrequency: '',
    lastWatered: '',
    alertEnabled: true
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await addPlant(form);
      onPlantAdded(res.data);
      setForm({
        name: '',
        location: '',
        moistureThreshold: '',
        currentMoisture: '',
        wateringFrequency: '',
        lastWatered: '',
        alertEnabled: true,
        imageUrl:''
      });
    } catch (err) {
      console.error('Failed to add plant', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow mb-4 grid gap-2">
      <input name="name" placeholder="Plant Name" value={form.name} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input name="moistureThreshold" placeholder="Moisture Threshold" type="number" value={form.moistureThreshold} onChange={handleChange} required />
      <input name="currentMoisture" placeholder="Current Moisture" type="number" value={form.currentMoisture} onChange={handleChange} required />
      <input name="wateringFrequency" placeholder="Watering Frequency (days)" type="number" value={form.wateringFrequency} onChange={handleChange} required />
      <input name="lastWatered" type="datetime-local" value={form.lastWatered} onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />  
      <label>
        <input type="checkbox" name="alertEnabled" checked={form.alertEnabled} onChange={handleChange} />
        Enable Alert
      </label>
      <button type="submit" className="bg-green-500 text-white py-1 px-2 rounded">Add Plant</button>
    </form>
  );
};

export default AddPlantForm;
