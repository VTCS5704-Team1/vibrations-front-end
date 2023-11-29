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
    const [radius, setRadius] = useState(50.0); // State for radius
    const [pfp, setPfp] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [profileCreated, setProfileCreated] = useState(false);

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

    async function fileUpload() {

        const formData = new FormData();
        formData.append("pfp", pfp);
        formData.append("email", userData.email);

        formData.forEach((value, key) => {
            console.log(key, value);
          });
        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:5000/api/images/upload",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + storedUserObject.token,
                  },
            })
            console.log(response);
            setUploaded(true);
        } catch (error) {
            console.log("error uploading file", error);
        }
    }

    

    const handleSave = async () => {
        

         const body = {
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
            topSongs: selectedSongs }

        

    try {
        console.log(body)
        console.log(storedUserObject.token);
        const response = await axios.post('http://localhost:5000/api/users/registerUser', body, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + storedUserObject.token
        }
  });
    console.log(response.data);
    onCreation();
    navigate('/profile');
} catch (error) {
  console.error('Error saving profile:', error);
}
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
                <button className="button" onClick={fileUpload}> Upload </button>
                {uploaded ? (<p>Profile picture uploaded!</p>) : (<p>Please upload a profile picture</p>)}
                
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
