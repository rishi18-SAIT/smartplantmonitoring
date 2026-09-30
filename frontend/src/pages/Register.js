import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Call the register function from your auth service
      await authService.register(name, email, password);
      setSuccess('Registration successful! Please log in.');
      
      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Handle errors from the backend (e.g., user already exists)
      const errorMessage = err.response?.data?.msg || err.response?.data?.error || err.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6" // Optional: enforce a minimum password length
          required
        />
        <button type="submit">Register</button>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
      </form>
    </section>
  );
};

export default Register;