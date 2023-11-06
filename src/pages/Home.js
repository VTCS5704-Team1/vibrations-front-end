import Navbar from '../Navbar';
import './Home.css'
import { FaHeart, FaStar } from 'react-icons/fa';
import {useState} from "react";

const Homepage = () => {
    const [matchedProfiles, setMatchedProfiles] = useState([
        {
            name: 'Sarah Lou',
            description: 'I love listening to music when I work out and when I study!',
            favoriteSong: 'Radioactive',
            favoriteArtist: 'Maroon 5',
            favoriteGenre: 'Pop',
            imageUrl: 'https://trendingdpz.com/wp-content/uploads/2023/03/19711ffe7c7684073729f00b08606433.jpg',
        },
        {
            name: 'Jane Doe',
            description: 'I enjoy hiking and reading books!',
            favoriteSong: 'Shape of You',
            favoriteArtist: 'Ed Sheeran',
            favoriteGenre: 'Pop',
        },
    ]);
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

    // Handle liking a profile
    const handleLikeProfile = () => {
        // Update the matched profiles and current profile index
        const updatedMatchedProfiles = [...matchedProfiles];
        updatedMatchedProfiles.splice(currentProfileIndex, 1);
        setMatchedProfiles(updatedMatchedProfiles);

        if (currentProfileIndex === updatedMatchedProfiles.length) {
            setCurrentProfileIndex(0);
        }
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
        <div className="homepage">
            <Navbar />
            <div className="profile">
                <div className="top-bar">

                </div>
                <div className="profile-info">
                    <img src={matchedProfiles[currentProfileIndex].imageUrl} alt="Profile" />
                    <div className="info">
                        <div className="name">{matchedProfiles[currentProfileIndex].name}</div>
                        <div className="description">{matchedProfiles[currentProfileIndex].description}</div>
                        <div className="favorites">
                            <div className="favorite">
                                <div className="label">Favorite Song:</div>
                                <div className="value">{matchedProfiles[currentProfileIndex].favoriteSong}</div>
                            </div>
                            <div className="favorite">
                                <div className="label">Favorite Artist:</div>
                                <div className="value">{matchedProfiles[currentProfileIndex].favoriteArtist}</div>
                            </div>
                            <div className="favorite">
                                <div className="label">Favorite Genre:</div>
                                <div className="value">{matchedProfiles[currentProfileIndex].favoriteGenre}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-bar">
                    <div className="arrow" onClick={handlePreviousProfile}>
                        &lt;
                    </div>
                    <div className="arrow" onClick={handleNextProfile}>
                        &gt;
                    </div>
                    <div className="star" onClick={handleLikeProfile}>
                        <FaStar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;