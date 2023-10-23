import React from "react";

const CLIENT_ID = "216ab5f16d6344838e5ff26a33888a6c";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp";

const SPACE_DELIMITER = "%20"
// lists out what we want to pull from users
// We can only get their top artists or tracks :( )
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const WebApp = () => {
    const handleLogin = () => {
        window.location = '${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true'
    };
    return (
        <div className = "container">
            <h1> slay </h1>
            <button onClick={handleLogin}>login to spotify</button>
        </div>
    );
};

export default WebApp;
 
