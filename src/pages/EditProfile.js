
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import ProfilePicUpload from "./components/ProfilePicUpload";
import { InputGroup, FormControl } from 'react-bootstrap';
import React, {useState } from 'react';
import SpotifyConnect from './components/SpotifyConnect';
import { useUserData } from './components/User';
import axios from "axios";

export default function EditProfile({onCreation, gender, firstName, lastName, email}) {
    const navigate = useNavigate();
    const { userData, updateUserData } = useUserData();

    const [bio, setBio] =  useState("");
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [selectedArtists, setSelectedArtists] =  useState([]);
    const [pfp, setPfp] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPfp(file);
    };

    const body = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        bio: bio,
        gender: userData.gender,
        topArtists: selectedArtists,
        topSongs: selectedSongs,
    }

    const handleSave = async () => {

        try {
            // Assuming profileData is an object with the necessary properties


            const response = await axios.post('http://localhost:5000/registerUser', {
                body,
                pfp: pfp
            }, {
                headers: { 'Content-type': 'form-data' },
              });
        
            console.log(response.data); // Handle the response from the server as needed
            // If successful, you might want to navigate to the profile page or perform other actions
            navigate('/profile');
          } catch (error) {
            console.error('Error saving profile:', error);
            // Handle error, show a message, etc.
          }
        onCreation();
        navigate('/profile');
    }


    return (
        <div>
            <Navbar />
            <div className="vertical-container">
                <h1>Edit Profile</h1>
                <div className="container">
                <div className="profile" style={{width: '65vh'}}>
                <h3>Upload Profile Picture </h3>
                <input type="file" onChange={handleFileChange} />
                
                    <h3>{userData.firstName}</h3>
                    <p> Add a bio that says a little about you </p>
                    <InputGroup classname="mb-3" size="lg">
                    <FormControl className="bio" style= {{width: '200px'}} as="textarea" rows ={8}
                        placeholder="Add a bio"
                        type="input"
                        onKeyDown={event => {
                            if (event.key == "Enter") {
                                console.log("Pressed enter");

                            }
                        }}
                    onChange={event => setBio(event.target.value)}
                    
                    />

                </InputGroup>
                <div>
                
            </div>

            </div>
                <div className="favorite-music">
                <SpotifyConnect setSelectedArtists={setSelectedArtists} selectedArtists={selectedArtists} setSelectedSongs={setSelectedSongs} selectedSongs={selectedSongs}/>
                </div>



                </div>
                <button onClick={handleSave} className="button" > Save </button>
                </div>

            
        </div>
    )
}