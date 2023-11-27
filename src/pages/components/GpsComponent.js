import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GPSTracker = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                sendLocationToServer({ latitude, longitude });
                fetchMatches({ latitude, longitude });
            }, (error) => {
                console.error('Error fetching location:', error);
            });
        } else {
            console.error('Geolocation API not supported');
        }
    }, []);

    const sendLocationToServer = (userLocation) => {
        // send location data to the server
        axios.post('YOUR_SERVER_URL/send-location', {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
        })
            .then(() => {
                console.log('Location data sent to server');
            })
            .catch((error) => {
                console.error('Error sending location data:', error);
            });
    };

    const fetchMatches = (userLocation) => {
        // fetch matches within a 50 km radius
        axios.get(`YOUR_API_URL?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius=${userLocation.radius}`)
            .then((response) => response.data) // Parse JSON response data
            .then((data) => {
                setMatches(data);
            })
            .catch((error) => {
                console.error('Error fetching matches:', error);
            });
    };

    return (
        <div>
            <h1>GPS Tracker</h1>
            <p>Your location: {location.latitude}, {location.longitude}</p>
            <ul>
                {matches.map((match) => (
                    <li key={match.id}>
                        <h3>{match.name}</h3>
                        <p>{match.description}</p>
                        <p>Distance: {match.distance} km</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GPSTracker;