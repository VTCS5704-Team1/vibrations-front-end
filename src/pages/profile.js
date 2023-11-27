
import React, { useState, useEffect } from 'react';
import './profile.css'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserData } from './components/User';
import getUserData from '../springboot states/getUserAccess';

export default function Profile({onSelect}) {

  const {userDataP, updateUserData} = useUserData();


  const storedUserDataJSON = localStorage.getItem('userData');

  // Parse the JSON string back to an object
  const userData = JSON.parse(storedUserDataJSON);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [response, setResponse] = useState("");
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
        url: `http://localhost:5000/api/users/getUser?email=${encodedEmail}`,
        /* params: {
          "email": userData.email,
        }, */
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
      }
    }

    useEffect(() => {
      getUserData();
    }, []);

   

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
          <button className="button" onClick={handleClick}>Edit Profile</button>
          </div> 
        </div>

        </div>
      );
    
}

    