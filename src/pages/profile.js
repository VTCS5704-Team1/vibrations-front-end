
import React, { useState, useEffect } from 'react';
import './profile.css'
import Navbar from '../Navbar';
import axios from 'axios';

// Generates the profile of the particular user
export default function Profile() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [pfp, setPfp] = useState(null);

    var storedJsonString = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var storedUserObject = JSON.parse(storedJsonString);


    // Access the email property of the stored object
    const storedEmail = storedUserObject.email;


    async function getUserData() {

    const encodedEmail = encodeURIComponent(storedEmail);
    try {
      const response = await axios({
        method: "GET",
        url: `http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/getUser?email=${encodedEmail}`,
        headers: {
          "Authorization": "Bearer " + storedUserObject.token,
        },
      });
      console.log(response);
        setName(response.data.firstName);
        setBio(response.data.bio);
        setSongs(response.data.topSongs);
        setArtists(response.data.topArtists);
        setPfp(response.data.pfp);
      } catch (error) {
        console.error('Error fetching user data:', error);
        window.alert("Please create your profile!");
      }
    }

    useEffect(() => {
      getUserData();
    }, []);

    
      return (
        <div >
          
          <Navbar />
          <div className='vertical-container'>
            <h1> {name}'s Profile </h1>
              <div>
            <div className="container">
          <div className="profile">
          <img src={`data:image/jpeg;base64,${pfp}`}></img>
            <h2>{name}</h2>
            <p>{bio}</p>
          </div>
          <div className="favorite-music">
            <strong>Favorite Songs:</strong>
            <ul>
          {songs.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ul>
          <strong>Favorite Artists:</strong>
          <ul>
            {artists.map((artist, index) => (
            <li key={index}>{artist}</li>
            ))}
          </ul>
           
          </div>
          </div>
          </div> 
        </div>

        </div>
      );
    
}

    