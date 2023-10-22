import React, { useState } from 'react';

export default function Settings() {
  const [bio, setBio] = useState(''); // State for bio
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [favoriteSong, setFavoriteSong] = useState(''); // State for favorite song
  const [favoriteArtist, setFavoriteArtist] = useState(''); // State for favorite artist
  const [favoriteGenre, setFavoriteGenre] = useState(''); // State for favorite genre

  const handleSave = () => {
    // Handle save functionality (e.g., send data to the server)
    // You can use APIs to update the user's profile information
    console.log('Saving profile changes');
  };

  return (
    <div className="edit-profile">
      <h1>Eventually we want to allow users to toggle between account and profile settings here </h1>
      <h2>Edit Profile</h2>
      <div>
        <label>Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write your bio"
        />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </div>
      <div>
        <label>Favorite Song:</label>
        <input
          type="text"
          value={favoriteSong}
          onChange={(e) => setFavoriteSong(e.target.value)}
        />
      </div>
      <div>
        <label>Favorite Artist:</label>
        <input
          type="text"
          value={favoriteArtist}
          onChange={(e) => setFavoriteArtist(e.target.value)}
        />
      </div>
      <div>
        <label>Favorite Genre:</label>
        <input
          type="text"
          value={favoriteGenre}
          onChange={(e) => setFavoriteGenre(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}




