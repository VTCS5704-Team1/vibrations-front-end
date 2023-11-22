import React, {useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import SpotifyLogin from "./SpotifyLogin";


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

function SpotifyConnect() {

    const[searchArtistInput, setSearchArtistInput] = useState("");
    const[searchSongInput, setSearchSongInput] = useState("");
    // Gets and sets the access token
    const [accessToken, setAccessToken] = useState("");

    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);

    // if the list to move items to has less than 5 items, then add this item
    const [selectedArtists, setSelectedArtists] = useState([]);

    const ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';
    const SONGS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
  
    const [topArtist, setTopArtist] = useState([]);
    const [topSong, setTopSong] = useState([]);
    const [showTopData, setShowTopData] = useState(false);

    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in } = getReturnedParamsFromSpotifyAuth(
            window.location.hash
          );
    
          localStorage.setItem('accessToken', access_token);
          localStorage.setItem('expiresIn', expires_in);
    
          // Call the functions to fetch top artists and songs
          fetchTopData();
        }
      }, []); // Empty dependency array to only run this effect on mount
    
      const fetchTopData = async () => {
        const topParams = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        };
    
        try {
          const [artistsResponse, songsResponse] = await Promise.all([
            fetch(ARTISTS_ENDPOINT + '?limit=5', topParams),
            fetch(SONGS_ENDPOINT + '?limit=5', topParams),
          ]);
    
          const [artistsData, songsData] = await Promise.all([
            artistsResponse.json(),
            songsResponse.json(),
          ]);
    
          setTopArtist(artistsData.items);
          setTopSong(songsData.items);
          setShowTopData(true);
        } catch (error) {
          console.error('Error fetching top data:', error);
        }
      };
    
      const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
      };
    

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


    const handleCheckboxClick = (clickedArtist) => {
        // Your logic for handling checkbox click
        console.log(`Checkbox clicked for artist: ${clickedArtist.name}`);
        // Add your logic to update the state or perform any other actions
        const isArtistSelected = selectedArtists.some(
            (artist) => artist.id === clickedArtist.id
          );
      
          if (isArtistSelected) {
            // If artist is selected, remove it from the selected list
            const updatedSelectedArtists = selectedArtists.filter(
              (artist) => artist.name !== clickedArtist.name
            );
            setSelectedArtists(updatedSelectedArtists);
          } else {
            // If artist is not selected, add it to the selected list
            setSelectedArtists([...selectedArtists, clickedArtist]);
          }
        };


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
        <div className="small-gray-container">
            <div className="small-vertical">
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
                        <input 
                            class="form-check-input"
                            type="checkbox" 
                            value="" 
                            id="flexCheckDefault"
                            onClick={() => handleCheckboxClick(artist)}/>
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
                            {song.name} - {song.artists[0].name}
                        </label>
                    </div>
                )
            })}
            </div>

            <SpotifyLogin />

            {/* <div className="container">
                <h3>Selected Artists</h3>
                {selectedArtists.map((artist) => (
                    <div key={artist.id}>{artist.name}</div>
                ))}
            </div> */}

            </div>
            

            
    )
}

export default SpotifyConnect;
 
