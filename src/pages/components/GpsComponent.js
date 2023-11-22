import React, { useState, useEffect } from 'react';

const GPSComponent = () => {
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
                fetchMatches({ latitude, longitude });
            }, (error) => {
                console.error('Error fetching location:', error);
            });
        } else {
            console.error('Geolocation API not supported');
        }
    }, []);

    const fetchMatches = (userLocation) => {
        // Implement API call to fetch matches within a 50 km radius
        // Replace 'YOUR_API_URL' with your actual API URL
        fetch(`___?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius=50`)
            .then((response) => response.json())
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

export default GPSComponent;