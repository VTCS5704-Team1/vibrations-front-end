
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import ProfilePicUpload from "./components/ProfilePicUpload";
import { InputGroup, FormControl } from 'react-bootstrap';
import React, {useState } from 'react';
import SpotifyConnect from './components/SpotifyConnect';

export default function EditProfile({onCreation}) {
    const navigate = useNavigate();

    const [searchArtistInput, setSearchArtistInput ] = useState("");
    const [searchSongInput, setSearchSongInput ] = useState("");
    const [topArtists, setTopArtists] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [bio, setBio] =  useState("");
    const [gender, setGender] = useState("");
    const [selectedArtists, setSelectedArtists] =  useState([]);

    const handleSave = async () => {
        // try {
        //     // Assuming profileData is an object with the necessary properties
        //     const response = await axios.post('http://localhost:5000/registerUser', {
        //       firstName: firstName,
        //       email: profileData.email,
        //       bio: bio,
        //       gender: profileData.gender,
        //       pfp: profileData.pfp, // Assuming pfp is a file
        //       topArtists: topArtists,
        //       topSongs: topSongs,
        //     });
        
        //     console.log(response.data); // Handle the response from the server as needed
        //     // If successful, you might want to navigate to the profile page or perform other actions
        //     navigate('/profile');
        //   } catch (error) {
        //     console.error('Error saving profile:', error);
        //     // Handle error, show a message, etc.
        //   }
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
                    <ProfilePicUpload/>
                    <h3>Their name will go here</h3>
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
                <label>Gender:</label>
                <select
                    name="gender"
                    value={gender}
                    onChange={event => setGender(event.target.value)}
                    required
                >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
            </div>

            </div>
                <div className="favorite-music">
                     <SpotifyConnect setSelectedArtists={{setSelectedArtists}}/>
                </div>



                </div>
                <button onClick={handleSave} className="button" > Save </button>
                </div>

            
        </div>
    )
}