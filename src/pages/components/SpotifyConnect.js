import React, {useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import SpotifyLogin from "./SpotifyLogin";


const CLIENT_ID = "216ab5f16d6344838e5ff26a33888a6c";
const CLIENT_SECRET = "7877da4703f2435b9635abfee3a917b6";

function SpotifyConnect() {

    const[searchArtistInput, setSearchArtistInput] = useState("");
    const[searchSongInput, setSearchSongInput] = useState("");
    // Gets and sets the access token
    const [accessToken, setAccessToken] = useState("");

    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // API access Token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))

    }, [])


    // search for artist
    async function searchArtist() {
        console.log("Search for " + searchArtistInput);
        var artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        }
        var returnedArtists = await fetch('https://api.spotify.com/v1/search?q=' + searchArtistInput + '&type=artist&limit=5', artistParameters)
        .then(response => response.json())
        .then(data => {
            setArtists(data.artists.items);
            console.log(artists)
        }) 
    }

    // search for song
    async function searchSong() {
        console.log("Search for " + searchSongInput);
        var songParameters = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            }
        }
        var returnedSongs = await fetch('https://api.spotify.com/v1/search?q=' + searchSongInput + '&type=track&limit=5', songParameters)
        .then(response => response.json())
        .then(data => {
            setSongs(data.tracks.items);
            console.log(songs)
        }) 
    }

    return (
        <div>
            <InputGroup className="mb-3" size="lg">
                <h3> Add some of your favorite artists </h3>
                <FormControl 
                placeholder="Search For Artist"
                type="input"
                onKeyDown={event => {
                    if (event.key == "Enter") {
                        searchArtist();
                    }

                }}
                onChange={event => setSearchArtistInput(event.target.value)}
                />
            <Button onClick={searchArtist}>
                Search
            </Button>
            </InputGroup>
            {artists.map((artist, i) => {
                return ( 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label class="form-check-label" for="flexCheckDefault">
                            {artist.name}
                        </label>
                    </div>
                )
            })}
            <InputGroup className="mb-3" size="lg">
            <h3> Add some of your favorite songs </h3>
                <FormControl 
                placeholder="Search For Song"
                type="input"
                onKeyDown={event => {
                    if (event.key == "Enter") {
                        searchSong();
                    }

                }}
                onChange={event => setSearchSongInput(event.target.value)}
                />
            <Button onClick={searchSong}>
                Search
            </Button>
            </InputGroup>
            {songs.map((song, i) => {
                return ( 
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label class="form-check-label" for="flexCheckDefault">
                            {song.name}
                        </label>
                    </div>
                )
            })}

            <SpotifyLogin />

            </div>

            
    )
}

export default SpotifyConnect;
 
