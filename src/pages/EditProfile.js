import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import React, { useState } from 'react';
import Editer from './components/Editer';

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const [bio, setBio] = useState(''); // State for bio
  const [favoriteSong, setFavoriteSong] = useState(''); // State for favorite song
  const [favoriteArtist, setFavoriteArtist] = useState(''); // State for favorite artist
  const [favoriteGenre, setFavoriteGenre] = useState(''); // State for favorite genre
  const [searchArtistInput, setSearchArtistInput ] = useState("");
  const [searchSongInput, setSearchSongInput ] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className="button" variant="outlined" onClick={handleClickOpen}>
        Edit Profile
      </button>
      <Dialog open={open} onClose={handleClose}>
        <h2>Edit Profile</h2>
        <div className="modal-content">
          <Editer/>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleClose}>Save</button>
        </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}