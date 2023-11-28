import Navbar from '../Navbar';
import './Home.css'
import { FaHeart, FaStar } from 'react-icons/fa';
import {useEffect, useState} from "react";
import { useUserData } from './components/User';
import axios from 'axios';

const Homepage = ({onSelect}) => {

    const  {userData, updateUserData} = useUserData();

    const [matchedProfiles, setMatchedProfiles] = useState([
        {
            name: 'Sarah',
            description: 'I love listening to music when I work out and when I study!',
            favoriteSong: 'Radioactive',
            favoriteArtist: 'Maroon 5',
            favoriteGenre: 'Pop',
            imageUrl: 'https://trendingdpz.com/wp-content/uploads/2023/03/19711ffe7c7684073729f00b08606433.jpg',
        },
        {
            name: 'John',
            imageUrl: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
            description: 'I enjoy hiking and reading books!',
            favoriteSong: 'Shape of You',
            favoriteArtist: 'Ed Sheeran',
            favoriteGenre: 'Pop',
        },
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
      
          console.log(response.data); // Assuming you want to log the response data
        } catch (error) {
          console.error('Error fetching all matches:', error);
        }
      }
      
      useEffect(() => {
        getAllUsers();
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
