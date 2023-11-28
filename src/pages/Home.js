import Navbar from '../Navbar';
import './Home.css'
import { FaHeart, FaStar } from 'react-icons/fa';
import {useEffect, useState} from "react";
import { useUserData } from './components/User';
import axios from 'axios';

const Homepage = ({onSelect}) => {

    const  {userData, updateUserData} = useUserData();

    const [matchedProfiles, setMatchedProfiles] = useState([
        
    ]);

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
          setMatchedProfiles(response.data);
          console.log(response.data); // Assuming you want to log the response data
        } catch (error) {
          console.error('Error fetching all matches:', error);
        }
      }
      
      useEffect(() => {
        getAllUsers();
      }, []);

      const [match, setMatch] = {
        firstName: '',
        bio: '',
        topArtist: '',
        topSong: '',
        pfp: ''
      };

      const getCurrentProfile =() => {
        
      }




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
                        <div className='top-bar'>
                            <button onClick={handleLikeProfile} className='star-button'>
                                <FaStar style={{ fontSize: '2em' }} />
                            </button>
                        </div>
                        <div className="container">
                            <div className="profile">
                                <img src={matchedProfiles[currentProfileIndex].imageUrl} alt="Profile" />
                                <h2>{matchedProfiles[currentProfileIndex].name}</h2>
                                <p>{matchedProfiles[currentProfileIndex].description}</p>
                            </div>
                            <div className="favorite-music">
                                <p><strong>Favorite Song:</strong> {matchedProfiles[currentProfileIndex].favoriteSong}</p>
                                <p><strong>Favorite Artist:</strong> {matchedProfiles[currentProfileIndex].favoriteArtist}</p>
                                <p><strong>Favorite Genre:</strong> {matchedProfiles[currentProfileIndex].favoriteGenre}</p>
                            </div>
                        </div>
                        <div className="button-container">
                            <div className="button" onClick={handlePreviousProfile}>
                                &lt;
                            </div>
                            <div className="button" onClick={handleNextProfile}>
                                &gt;
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Homepage;
