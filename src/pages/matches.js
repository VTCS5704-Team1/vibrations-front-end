import React, { useState } from 'react';
import './matches.css'

const MessengerWindow = () => {
    const [matches, setMatches] = useState([
        { name: 'Sarah Lou', profileImageUrl: 'https://trendingdpz.com/wp-content/uploads/2023/03/19711ffe7c7684073729f00b08606433.jpg' },
        { name: 'Tim Tom', profileImageUrl: 'https://i.pinimg.com/236x/03/c0/ca/03c0cad4b7411bab862fa1a69decf6b5.jpg' },
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
        <div className="messenger-window">
            <header className="messenger-header">
                <h1>Matched!</h1>


            </header>
            <div className="messenger-body">
                <ul className="matches-list">
                    {matches.map((match) => (
                        <li key={match.name}>
                            <img src={match.profileImageUrl} alt={match.name} className="match-profile-image" />
                            {match.name}
                            <button className="send-message-button" onClick={() => handleMatchClick(match)}>Send Message</button>
                        </li>
                    ))}
                </ul>

                {selectedMatch && (
                    <div className="send-message-dialogue">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type your message here..."
                        />
                        <button className="send-button" onClick={handleSendMessage}>Send</button>

                        {isCloseButtonVisible && (
                            <button className="send-message-button" onClick={handleCloseButtonClick}>
                                Close Message
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessengerWindow;
