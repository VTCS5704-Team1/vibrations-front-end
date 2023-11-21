import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './vib_logo.jpg';
import axios from 'axios';

export default function SignUp({onSignUp}) {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthdate: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const email = formData.email;

    try {
      axios.post("http://localhost:5000/api/users/register", {
        email: formData.email,
        password: formData.password,
        birthdate: formData.birthdate,
        gender: formData.gender

      }, {
        headers: {"Content-type": "application/json"}
      }).then(r => {
        console.log(r.data);
        localStorage.setItem("user", JSON.stringify({email, token: r.data.accessToken}))

              // Retrieve the JSON string from local storage
        var storedJsonString = localStorage.getItem('user');

            // Parse the JSON string back into an object
        var storedUserObject = JSON.parse(storedJsonString);

            // Display the access token in the console
        console.log("Access Token:", storedUserObject.token);
      }) .catch(error => {
        console.error("Error during sign up:", error);
        window.alert("didnt work stupid");
      });
    }
    catch (error) {
      // idk I'll do something here 
    }

    onSignUp();
    navigate("/CreateProfile");
  };
  


  return (
    <div className="small-vertical-container">
      <img src={logo} alt='logo' className="img"/>
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
        <button type="submit">Sign Up</button>
      </div>
    </form>
    </div>
  );
}