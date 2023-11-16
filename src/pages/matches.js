import React, { useState } from 'react';
import Navbar from '../Navbar';
import './matches.css'


const MessengerWindow = () => {
    const [matches, setMatches] = useState([
        { name: 'Sarah', profileImageUrl: 'https://trendingdpz.com/wp-content/uploads/2023/03/19711ffe7c7684073729f00b08606433.jpg' },
        { name: 'Tim', profileImageUrl: 'https://i.pinimg.com/236x/03/c0/ca/03c0cad4b7411bab862fa1a69decf6b5.jpg' },
    ]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(false);

    const handleSendMessage = () => {
        // Send the message to the selected match
        console.log(`Sending message "${messageInput}" to ${selectedMatch}`);

        // Clear the message input
        setMessageInput('');
    };

    const handleMatchClick = (match) => {
        setSelectedMatch(match);
        setIsCloseButtonVisible(true);
    };

    const handleCloseButtonClick = () => {
        setIsCloseButtonVisible(false);
        setSelectedMatch(null);
    };

    return (

        <><div>
            <Navbar />
        </div><div className="vertical-container">
                <header className="messenger-header">
                    <h1>Matched!</h1>
                    <h2> Id prefer if we put this in a grid format </h2>


                </header>
                <div className="messenger-body">
                    <ul className="matches">
                        {matches.map((match) => (
                            <li key={match.name}>
                                <div className='match'>
                                    <img src={match.profileImageUrl} alt={match.name} className="match-profile-image" />
                                    {match.name}
                                    <button className="button" onClick={() => handleMatchClick(match)}>Send Message</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {selectedMatch && (
                        <div className="send-message-dialogue">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Type your message here..." />
                            <button className="button" onClick={handleSendMessage}>Send</button>

                            {isCloseButtonVisible && (
                                <button className="button" onClick={handleCloseButtonClick}>
                                    Close Message
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div></>

    );
};

export default MessengerWindow;
