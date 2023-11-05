import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form data submission here.
    // For this example, we'll just display the input values.
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    navigate("/CreateProfile");
  };
  return (
    <div className="create-profile">
      <h2>Sign Up for Vibrations</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Email:</label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Create Account</button>
    </form>
  </div>
);
}