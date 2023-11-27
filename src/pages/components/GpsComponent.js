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
                
            }, (error) => {
                console.error('Error fetching location:', error);
            });
        } else {
            console.error('Geolocation API not supported');
        }
    }, []);

  
    return(location);
};

export default GPSTracker;