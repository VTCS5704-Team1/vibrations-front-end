import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { InputGroup, FormControl } from 'react-bootstrap';
import React, {useState } from 'react';
import SpotifyConnect from '../components/SpotifyConnect';
import axios from "axios"; 

// Is supposed to allow the user to edit their profile but now 
// Just allows for creation in sql.....
export default function EditProfile({onCreation} ) {
    const navigate = useNavigate();

    // handles all user data storing local so when spotify relaunches data is still accessible
    const storedUserDataJSON = localStorage.getItem('userData');
    const userData = JSON.parse(storedUserDataJSON);

    // fields set in edit profile page
    const [bio, setBio] =  useState("");
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [selectedArtists, setSelectedArtists] =  useState([]);
    const [radius, setRadius] = useState(50.0); // State for radius
    const [pfp, setPfp] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    const handleChangeRadius = (event) => {
        setRadius(parseInt(event.target.value));
    };

    
    var storedJsonString = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var storedUserObject = JSON.parse(storedJsonString);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPfp(file);
        setUploaded(true);
    };

    async function fileUpload() {

        const formData = new FormData();
        formData.append("pfp", pfp);
        formData.append("email", userData.email);
        try {
            const response = await axios({
                method: "POST",
                url: "http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/images/upload",
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
        if (!uploaded) {
            alert('Please upload a profile picture.');
            return;
          }

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
        console.log(body);
        const response = await axios.post('http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/registerUser', body, {
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
    }
    return (
        <div>
            <Navbar />
            <div className="vertical-container" style={{height: '120vh'}}>
                <h1>Create Profile</h1>
                <div className="container" style={{height: '100vh'}}>
                <div className="edit-profile" style={{width: '35%', textAlign:'center'}}>
                <h3>Upload Profile Picture </h3>
                <input type="file" onChange={handleFileChange} />
                <button className="button" onClick={fileUpload}> Upload </button>
                {uploaded ? (<p style={{color:'green'}}>Profile picture uploaded!</p>) : (<p style={{color:'red'}}>Please upload a profile picture</p>)}
                
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
