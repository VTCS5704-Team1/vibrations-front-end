
import React, { useState, useEffect } from 'react';
import './profile.css'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserData } from './components/User';

export default function Profile({onSelect}) {

  const {userDataP, updateUserData} = useUserData();


  const storedUserDataJSON = localStorage.getItem('userData');

  // Parse the JSON string back to an object
  const userData = JSON.parse(storedUserDataJSON);

    const name = userData.firstName;
    const [bio, setBio] = useState("");
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    // const [pfp, setPfp] = useState("");
    

    // once their profile is created, then they can see all their profile data
    useEffect(() => {
      getUserData();
    }, []);

    var storedJsonString = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var storedUserObject = JSON.parse(storedJsonString);

    // this will be the getter 
    async function getUserData() {

      try {

        console.log(userData.email);
        const response = await axios({
          method: "GET",
          url: "http://localhost:5000/api/users/getUser",
          params: {
            "email": userData.email,
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + storedUserObject.token,
          },
        });
      
        console.log(response);
        setBio(response.data.bio);
        setSongs(response.data.topSongs);
        setArtists(response.data.topArtists);
        // setPfp(response.data.pfp);
      
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
        
      
    }

      const navigate = useNavigate();

      const handleClick = () => {
        navigate("/EditProfile");
      }
    
      return (
        <div >

          <Navbar />
          <div className='vertical-container'>
            <h1> {name}'s Profile </h1>
              <div>
            <div className="container">
          <div className="profile">
            {/* <img src={pfp} alt="Profile" className="profile-picture" /> */}
            <h2>{name}</h2>
            <p>{bio}</p>
          </div>
          <div className="favorite-music">
            <p><strong>Favorite Song:</strong> {songs}</p>
            <p><strong>Favorite Artist:</strong> {artists}</p>
          </div>
          </div>
          <button className="button" onClick={handleClick}>Edit Profile</button>
          </div> 
        </div>

        </div>
      );
    
}

    