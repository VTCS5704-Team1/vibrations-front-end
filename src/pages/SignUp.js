import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './vib_logo.jpg';
import axios from 'axios';
import LogInAccess from '../springboot states/loginAccess';
import { useUserData } from './components/User';

const GPSTrackerComponent = () => {

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(latitude);
          console.log(longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation API not supported');
    }
  }, []);

  return location;
};



export default function SignUp({ onLogin }) {

  const { userData, updateUserData } = useUserData();

  const gpsLocation = GPSTrackerComponent();

  const [location, setLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });

  // Update location state
  useEffect(() => {
    setLocation(gpsLocation);
  }, [gpsLocation]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    phoneNumber: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSignUp = async () => {


      try {
        const response = await axios.post(
          'http://localhost:5000/api/users/register',
          {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthdate: formData.birthdate,
            gender: formData.gender,
            phoneNumber: "+1" + formData.phoneNumber,
          },
          {
            headers: { 'Content-type': 'application/json' },
          }
        );
          console.log(response);
        if (response.status === 200) {
          const email = formData.email;
          const password = formData.password;
  
          // Log in the user after successful sign-up
          LogInAccess({ email, password });
  
          onLogin();
  
          // You can perform additional actions on successful sign-up if needed
  
          return response;
        } else {
          // Handle unsuccessful sign-up
          console.error('Sign-up failed with status:', response.status);
          window.alert('Sign-up failed. Please try again.');
          throw new Error(`Sign-up failed with status: ${response.status}`);
        }
      } catch (error) {
        // Handle network errors, request cancellation, or any other errors
        console.error('Error during sign up:', error);
        window.alert('Sign-up failed. Please try again.');
        throw error; // Rethrow the error to be caught by the handleSubmit .catch()
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await handleSignUp();
      // Redirect or perform other actions after successful sign-up
      navigate('/EditProfile');
    } catch (error) {
      // Handle errors from handleSignUp
      console.error('Error during sign up:', error);
      // Optionally, you can perform additional actions or display an error message
    }
    updateUserData({firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      latitude: location.latitude,
      longitude: location.longitude,
      phoneNumber: formData.phoneNumber});

    const userDataForm = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      latitude: location.latitude,
      longitude: location.longitude,
      phoneNumber: formData.phoneNumber,
    };
    console.log(userDataForm);
    const userDataJSON = JSON.stringify(userDataForm);
    localStorage.setItem('userData', userDataJSON);
  };

  return (
    
    <div className="small-vertical-container">
      <img src={logo} alt="logo" className="img" />
      <h2>Sign Up for Vibrations</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="text"
            name="birthdate"
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="yyyy-mm-dd"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}