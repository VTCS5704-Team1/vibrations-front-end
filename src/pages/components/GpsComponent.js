import React, { useState, useEffect } from 'react';

const GpsComponent = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error fetching geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation not supported');
        }
    }, []);

    return (
        <div>
            <h2>GPS Location</h2>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
        </div>
    );
};

export default GpsComponent;