import React, { useState, useEffect } from 'react';

const CLIENT_ID = "216ab5f16d6344838e5ff26a33888a6c";
const CLIENT_SECRET = "7877da4703f2435b9635abfee3a917b6";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/CreateProfile";

const SPACE_DELIMITER = "%20"
// lists out what we want to pull from users
// We can only get their top artists or tracks :( )
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});

    return paramsSplitUp;

}

export default function SpotifyLogin() {

    const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
    const SONGS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
    
    const [topArtist, setTopArtist] = useState([]);
    const[topSong, setTopSong] = useState([]);
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (window.location.hash) {
            const {access_token,
                expires_in, 
            } = getReturnedParamsFromSpotifyAuth(window.location.hash)

            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("expiresIn", expires_in);
        }
    });
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };

    var topParams = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem("accessToken")
        }
    }


    async function getTopArtist() {
        
        var returnedTopArtist = await fetch(ARTISTS_ENDPOINT + "?limit=3", topParams)
        .then(response => response.json())
        .then(data => {
            console.log(data.items);
            setTopArtist(data.items);
            console.log(topArtist);
        })
        
    }

    async function getTopSong() {
        var returnedTopArtist = await fetch(SONGS_ENDPOINT + "?limit=3", topParams)
        .then(response => response.json())
        .then(data => {
            console.log(data.items);
            setTopSong(data.items);
            console.log(topSong);
        })
        
    }

    return (
        <div>
            <>
            <p> To access your spotify data, log in to Spotify:</p>
            <button onClick={() => {
                handleLogin();
                setIsLoggedIn(true);
            }}>Spotify Login</button>
            </>
            <>
            <button onClick={() => {
                getTopArtist();
                getTopSong();
            }}> Autofill from Spotify </button>
            <h3>Top Artists</h3>
            {topArtist.map((topArtist, i) => {
                return ( 
                    <div>
                        {topArtist.name}
                    </div>
                )
            })}
            <h3>Top Songs</h3>
            {topSong.map((topSong, i) => {
                return ( 
                    <div>
                        {topSong.name}
                    </div>
                )
            })}
        </>
        </div>
    )
        }