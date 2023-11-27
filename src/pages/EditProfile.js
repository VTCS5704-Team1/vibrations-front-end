
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { InputGroup, FormControl } from 'react-bootstrap';
import React, {useState } from 'react';
import SpotifyConnect from './components/SpotifyConnect';
import axios from "axios"; 

export default function EditProfile({onCreation} ) {
    const navigate = useNavigate();

    // handles all user data storing local so when spotify relaunches data is still accessible
    const storedUserDataJSON = localStorage.getItem('userData');
    const userData = JSON.parse(storedUserDataJSON);
    console.log("from local storage", userData);

    // fields set in edit profile page
    const [bio, setBio] =  useState("");
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [selectedArtists, setSelectedArtists] =  useState([]);
    const [radius, setRadius] = useState(50); // State for radius
    const [pfp, setPfp] = useState(null);


    const handleChangeRadius = (event) => {
        setRadius(parseInt(event.target.value));
    };

    
    var storedJsonString = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var storedUserObject = JSON.parse(storedJsonString);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPfp(file);
    };

    

    const handleSave = async () => {
        
        const formData = new FormData();
        formData.append("body", JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            bio: bio,
            phoneNumber: userData.phoneNumber,
            gender: userData.gender,
            latitude: userData.latitude,
            longitude: userData.longitude,
            maxDistance: radius,
            topArtists: selectedArtists,
            topSongs: selectedSongs

        }));
        formData.append("pfp", pfp);
        console.log(formData);

        console.log(selectedArtists);
        console.log(selectedSongs);


        try {
            
            console.log(formData);
            // Assuming profileData is an object with the necessary properties
            const response = await axios.post('http://localhost:5000/registerUser', {
                formData
            }, {
                headers: {
                    "Content-type": "multipart/form-data",
                    "Authorization": "Bearer " + storedUserObject.token
                }
                
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
                        <label>Change Radius (km):</label>
                        <input type="number" value={radius} onChange={handleChangeRadius} />
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