
import React, { useState } from 'react';
import './profile.css'
import Navbar from '../Navbar';
import { Button } from 'react-bootstrap';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [profileIsCreated, setProfileIsCreated] = useState(false);

    // once their profile is created, then they can see all their profile data

    const profileData = {
        name: 'Sarah',
        bio: 'My name is Sarah and I love listening to music in my free time and while Im studying!',
        favoriteSong: 'Blank Space - Taylor Swift',
        favoriteArtist: 'Lady Gaga',
        favoriteGenre: 'Pop',
        profilePicture: 'https://st.depositphotos.com/1000686/3738/i/450/depositphotos_37383675-stock-photo-portrait-of-a-young-beautiful.jpg',
      };

      const navigate = useNavigate();

      const handleClick = () => {
        navigate("/EditProfile");
      }
    
      return (
        <div >
          <Navbar />
          <div className='vertical-container'>
            <h1> {profileData.name}'s Profile </h1>
          <div className="container">
          <div className="profile">
            <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
            <h2>{profileData.name}</h2>
            <p>{profileData.bio}</p>
          </div>
          <div className="favorite-music">
            <p><strong>Favorite Song:</strong> {profileData.favoriteSong}</p>
            <p><strong>Favorite Artist:</strong> {profileData.favoriteArtist}</p>
            <p><strong>Favorite Genre:</strong> {profileData.favoriteGenre}</p>
          </div>
          </div>
          <button className="button" onClick={handleClick}>Edit Profile</button>
        </div>
        </div>
      );
    
}

    