import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { useUserData } from '../components/User';


// Displays users who are matched so they can be messaged
const MessengerWindow = () => {
    const { userData, updateUserData } = useUserData();
    const matches = userData.likedUsers;

    const [selectedMatch, setSelectedMatch] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(false);

    const sendMessage = async () => {
        // const message = {
        //     messageId: '',
        //     senderEmail: userData.email,
        //     receiverEmail: userData.likedUsers[0].email,
        //     content: messageInput,
        // };

        // // Send the message to the server
        // const response = await fetch('/api/messages', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(message),
        // });

        // const responseData = await response.json();

        // // Add the message to the messages list
        // setMessages([...messages, responseData]);

        // // Clear the message input
        // setMessageInput('');
    };

    const handleMatchClick = (match) => {
        setSelectedMatch(match);
        setIsCloseButtonVisible(true);

        // // Fetch messages for the selected match
        // fetch(`/api/messages/<span class="math-inline">\{userData\.email\}/</span>{selectedMatch.email}`)
        //     .then((response) => response.json())
        //     .then((responseData) => {
        //         setMessages(responseData);
        //     });
    };

    const handleCloseButtonClick = () => {
        setIsCloseButtonVisible(false);
        setSelectedMatch(null);
        setMessages([]);
    };

    // useEffect(() => {
    //     // Scroll to the bottom of the messages container whenever a new message is added
    //     const messagesContainer = document.getElementById('messages');
    //     messagesContainer.scrollTop = messagesContainer.scrollHeight;
    // }, [messages]);

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className="vertical-container">
                <header className="messenger-header">
                    <h1>Matched!</h1>
                </header>
                <div className="messenger-body">
                    {matches.length === 0 ? (
                        <p>Like some users to start conversations!</p>
                    ) : (
                        <div className="matches">
                            {matches.map((match) => (
                                <li key={match.name} className="match-row">
                                    <div className="match">
                                        <img
                                            src={`data:image/jpeg;base64,${match.pfp}`}
                                            className="match-profile-image"
                                        />
                                        {match.name}
                                        <button
                                            className="match-button"
                                            onClick={() => handleMatchClick(match)}
                                            style={{ width: '130px', fontSize: '12px' }}
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </div>
                    )}

                    {selectedMatch && (
                        <div className="send-message-dialogue">
                            {/* Your existing code for the message dialogue */}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MessengerWindow;
