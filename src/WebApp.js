import React from "react";

const CLIENT_ID = "216ab5f16d6344838e5ff26a33888a6c";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/webapp";


// lists out what we want to pull from users
// We can only get their top artists or tracks :( )
const SCOPES = ["user-top-read"];


const WebApp = () => {

    return (
        <div className = "container">
            <h1> slay </h1>
        </div>
    );
};

export default WebApp;
 
