import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import './matches.css';
import { useUserData } from './components/User';

const MessengerWindow = ({ onSelect }) => {
    const { userData, updateUserData } = useUserData();
    const matches = userData.likedUsers;

    const [selectedMatch, setSelectedMatch] = useState(null);
    const [messageInput, setMessageInput] = useState('');
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
                        <ul className="matches">
                            {matches.map((match) => (
                                <li key={match.name}>
                                    <div className="match">
                                        <img
                                            src={match.profileImageUrl}
                                            className="match-profile-image"
                                        />
                                        {match.firstName}
                                        <button
                                            className="button"
                                            onClick={() => handleMatchClick(match)}
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {selectedMatch && (
                            <div className="send-message-dialogue">
                                <div className="messages" id="messages">
                                    {messages.map((message) => (
                                        <div key={message.messageId} className="message">
                                            {message.senderEmail === userData.email ? (
                                                <div className="sent-message">
                                                    <p>{message.content}</p>
                                                </div>
                                            ) : (
                                                <div className="received-message">
                                                    <p>{message.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type your message here..."
                                />
                                <button className="button" onClick={sendMessage}>
                                    Send
                                </button>

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
