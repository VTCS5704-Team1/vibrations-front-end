import Navbar from '../Navbar';
import './Home.css'
import { FaHeart, FaStar } from 'react-icons/fa';
import {useEffect, useState} from "react";
import { useUserData } from './components/User';
import axios from 'axios';

const Homepage = ({onSelect}) => {

    const  {userData, updateUserData} = useUserData();

    const [matchedProfiles, setMatchedProfiles] = useState([{
        name: 'Sarah',
        description: 'I love listening to music when I work out and when I study!',
        favoriteSong: 'Radioactive',
        favoriteArtist: 'Maroon 5',
        favoriteGenre: 'Pop',
    },]);

    const [matchedPfps, setMatchedPfps] = useState([{
        imageData: ''
    }]);

    async function getAllUsers() {
        var storedJsonString = localStorage.getItem('user');
      
        // Parse the JSON string back into an object
        var storedUserObject = JSON.parse(storedJsonString);
      
        try {
          const response = await axios({
            method: "GET",
            url: `http://localhost:5000/api/users/all`,
            /* params: {
              "email": userData.email,
            }, */
            headers: {
              "Authorization": "Bearer " + storedUserObject.token,
            },
          });
          console.log(response.data); 
          const filteredProfiles = response.data.filter(profile => profile.email !== userData.email);
            setMatchedProfiles(filteredProfiles);
        } catch (error) {
          console.error('Error fetching all matches:', error);
        }
      }

      async function getAllPfp() {
        var storedJsonString = localStorage.getItem('user');
      
        // Parse the JSON string back into an object
        var storedUserObject = JSON.parse(storedJsonString);
      
        try {
          const r = await axios({
            method: "GET",
            url: `http://localhost:5000/api/users/allPfp`,
            /* params: {
              "email": userData.email,
            }, */
            headers: {
              "Authorization": "Bearer " + storedUserObject.token,
            },
          });
          console.log(r.data); 
          const filteredPfps = r.data.filter(pfp => pfp.email !== userData.email);
            setMatchedPfps(filteredPfps);
        } catch (error) {
          console.error('Error fetching all pfps:', error);
        }
      }
      
      useEffect(() => {
        getAllUsers();
        getAllPfp();
      }, []);




    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

    // Handle liking a profile
    const handleLikeProfile = () => {
        // Update the matched profiles and current profile index
        userData.likedUsers.push(matchedProfiles[currentProfileIndex]);
    };

    // Handle switching between profiles
    const handlePreviousProfile = () => {
        if (currentProfileIndex === 0) {
            setCurrentProfileIndex(matchedProfiles.length - 1);
        } else {
            setCurrentProfileIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextProfile = () => {
        if (currentProfileIndex === matchedProfiles.length - 1) {
            setCurrentProfileIndex(0);
        } else {
            setCurrentProfileIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='vertical-container'>
                <h1>Listeners In Your Area</h1>
                    <div>
                    {matchedProfiles.length > 0 ? (
                        <div>
                        <div className='top-bar'>
                            <button onClick={handleLikeProfile} className='star-button'>
                                <FaStar style={{ fontSize: '2em' }} />
                            </button>
                        </div>
                        <div className="container">
                            <div className="profile">
                            <img src={`data:image/jpeg;base64,${matchedPfps[currentProfileIndex].imageData}`}></img>
                                <h2>{matchedProfiles[currentProfileIndex].firstName}</h2>
                                <p>{matchedProfiles[currentProfileIndex].bio}</p>
                            </div>
                         
                            <div className="favorite-music">
                            <strong>Favorite Songs:</strong>
                    <ul>
                        {matchedProfiles[currentProfileIndex].favSong && matchedProfiles[currentProfileIndex].favSong.length > 0 && (
                            // Render favSong only when the array is not null or empty
                            matchedProfiles[currentProfileIndex].favSong.map((song, index) => (
                                <li key={index}>{song}</li>
                            ))
                        )}
                    </ul>
                                <strong>Favorite Artists:</strong>
                    <ul>
                        {matchedProfiles[currentProfileIndex].favArtist && matchedProfiles[currentProfileIndex].favArtist.length > 0 && (
                            // Render favArtist only when the array is not null or empty
                            matchedProfiles[currentProfileIndex].favArtist.map((artist, index) => (
                                <li key={index}>{artist}</li>
                            ))
                        )}
                    </ul>
                            </div>
                        </div>
                        <div className="arrows-button-container">
                            <div className="arrows-button" onClick={handlePreviousProfile}>
                                &lt;
                            </div>
                            <div className="arrows-button" onClick={handleNextProfile}>
                                &gt;
                            </div>
                        </div>
                        </div>
                        ) : (
                            // Render a loading state or message when matchedProfiles is empty
                            <p>Loading profiles...</p>
                        )}
                    </div>
            </div>
        </div>
    );
};

export default Homepage;
