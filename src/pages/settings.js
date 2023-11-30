import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChangePassword from '../springboot states/changePasswordAccess';
import DeleteAccount from '../springboot states/deleteAccountAccess';


export default function Settings({onLogOut}) {

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for managing GPS location/limits
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');

  // Function to handle GPS location/limits change
  const handleLocationChange = () => {
    // Implement location/limits change logic here
    console.log('Location/limits changed successfully!');
  };

  const navigate = useNavigate();


  var storedJsonString = localStorage.getItem('user');

 // Parse the JSON string back into an object
  var storedUserObject = JSON.parse(storedJsonString);

  
  const handleLogout = () => {

    axios.post("http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/logout", {}, {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + storedUserObject.token
        }
    }).then(resp => console.log(resp));
    localStorage.clear();
    onLogOut();
    navigate('/');
  };

  
     return (

     <div>
        <Navbar/>
        <div className='vertical-container'>
        <h1> Account Settings </h1>
        <div className='center-vertical-container'>

        <ChangePassword token={storedUserObject.token}/>
        <DeleteAccount onLogOut={onLogOut}/>
      </div>
        <button onClick={handleLogout} className='button' type="button">Logout</button>
      </ div>
      </div>

     );

}




