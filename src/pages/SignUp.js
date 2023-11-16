import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './vib_logo.jpg';

export default function SignUp({onSignUp}) {
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
    onSignUp();
  };
  


  return (
    <div className="small-vertical-container">
      <img src={logo} alt='logo' className="img"/>
      <h2>Sign Up for Vibrations</h2>
      <form onSubmit={handleSubmit}>
      <div className='input-box'>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='input-box'>
        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className='input-box'>
        <label>Email:</label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      <button type="submit" className='button'>Create Account</button>
    </form>
  </div>
);
}