import React, { useState } from 'react';
import { InputGroup, Button, FormControl, Modal, ModalTitle } from 'react-bootstrap';

export default function EditProfileDialogue() {
  const [bio, setBio] = useState(''); // State for bio
  const [favoriteSong, setFavoriteSong] = useState(''); // State for favorite song
  const [favoriteArtist, setFavoriteArtist] = useState(''); // State for favorite artist
  const [favoriteGenre, setFavoriteGenre] = useState(''); // State for favorite genre
  const [searchArtistInput, setSearchArtistInput ] = useState("");
  const [searchSongInput, setSearchSongInput ] = useState("");

  const handleSave = () => {
    // In this function, you should send the updated data to a server or perform any other necessary actions.
    // You can use APIs to update the user's profile information.
    console.log('Saving profile changes');
    console.log('Bio:', bio);
    console.log('Favorite Song:', favoriteSong);
    console.log('Favorite Artist:', favoriteArtist);
    console.log('Favorite Genre:', favoriteGenre);
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Modal show={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <ModalTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Profile
        </ModalTitle>
        <Button
          aria-label="close"
          onClick={handleClose}
        >
        </Button>
        <div class="modal-content">
            <InputGroup classname="mb-3" size="lg">
                    <FormControl 
                    placeholder="Search for artist"
                    type="input"
                    onKeyDown={event => {
                        if (event.key == "Enter") {
                            console.log("Pressed enter");

                        }
                    }}
                    onChange={event => setSearchArtistInput(event.target.value)}
                    />
                    <Button onClick={() => {console.log("Clicked Button")}}>
                        Search
                    </Button>
            </InputGroup>
            <InputGroup classname="mb-3" size="lg">
                <FormControl 
                    placeholder="Search for song"
                    type="input"
                    onKeyDown={event => {
                        if (event.key == "Enter") {
                            console.log("Pressed enter");

                        }
                    }}
                    onChange={event => setSearchSongInput(event.target.value)}
                />
                    <Button onClick={() => {console.log("Clicked Button")}}>
                        Search
                    </Button>
            </InputGroup>
            <InputGroup classname="mb-3" size="lg">
                <FormControl as="textarea" rows ={4}
                    placeholder="Add a bio"
                    type="input"
                    onKeyDown={event => {
                        if (event.key == "Enter") {
                            console.log("Pressed enter");

                        }
                    }}
                    />
            </InputGroup>
        </div>
        <Button autoFocus onClick={handleSave}>
            Save changes
        </Button>
      </Modal>
    </React.Fragment>
  );
   
}




