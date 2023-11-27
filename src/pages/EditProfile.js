import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import React, { useState } from 'react';
import Editer from './components/Editer';
import './EditProfile.css';
import axios from 'axios';

export default function EditProfile() {
    const [open, setOpen] = React.useState(false);
    const [bio, setBio] = useState(''); // State for bio
    const [favoriteSong, setFavoriteSong] = useState(''); // State for favorite song
    const [favoriteArtist, setFavoriteArtist] = useState(''); // State for favorite artist
    const [favoriteGenre, setFavoriteGenre] = useState(''); // State for favorite genre
    const [searchArtistInput, setSearchArtistInput ] = useState("");
    const [searchSongInput, setSearchSongInput ] = useState("");
    const [radius, setRadius] = useState(50); // State for radius

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeRadius = (event) => {
        setRadius(parseInt(event.target.value));
    };

    const handleSaveRadius = () => {
        // Implement API call to update radius in the backend using axios
        axios.post('YOUR_SERVER_URL/update-radius', {
            radius: radius,
        }, {
            headers: {
                'Content-Type': 'application/json', // Specify JSON content type
                // Add any necessary authentication headers here
            }
        })
            .then(() => {
                console.log('Radius updated in backend');
            })
            .catch((error) => {
                console.error('Error updating radius:', error);
            });
    };

    return (
        <React.Fragment>
            <button className="button" variant="outlined" onClick={handleClickOpen}>
                Edit Profile
            </button>
            <Dialog open={open} onClose={handleClose} maxWidth="xl">
                <h2>Edit Profile</h2>
                <div className="modal-content">
                    <Editer />
                    <div className="change-radius">
                        <label>Change Radius (km):</label>
                        <input type="number" value={radius} onChange={handleChangeRadius} />
                        <button onClick={handleSaveRadius}>Save Radius</button>
                    </div>
                    <DialogActions>
                        <button onClick={handleClose}>Cancel</button>
                        <button onClick={handleClose}>Save</button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment>
    );
}
