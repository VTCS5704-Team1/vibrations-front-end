import React, {useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";


const CLIENT_ID = "216ab5f16d6344838e5ff26a33888a6c";
const CLIENT_SECRET = "7877da4703f2435b9635abfee3a917b6";

const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://dev-vib-ui-final-eb-env.eba-xvyd3ppt.us-east-2.elasticbeanstalk.com/EditProfile";

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


// connects users with spotifys api which allows them to either log in
// to their spotify to get their top data or they can search the spotify
// api for songs and artists they like
const SpotifyConnect = ({setSelectedArtists, selectedArtists, setSelectedSongs, selectedSongs}) => {
    const [searchArtistInput, setSearchArtistInput] = useState("");
    const [searchSongInput, setSearchSongInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";
    const SONGS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks";
    const [topArtist, setTopArtist] = useState([]);
    const [topSong, setTopSong] = useState([]);
    const [showTopData, setShowTopData] = useState(false);
    const [selectedArtistsCount, setSelectedArtistsCount] = useState(0);
    const [selectedSongsCount, setSelectedSongsCount] = useState(0);

    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in } = getReturnedParamsFromSpotifyAuth(
                window.location.hash
            );

            var storedJsonString = localStorage.getItem('user');

            // Parse the JSON string back into an object
            var storedUserObject = JSON.parse(storedJsonString);

            console.log(storedUserObject.token);



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


    const handleCheckboxClickArtist = (clickedArtist) => {
        if (!clickedArtist) {
            return;
        }

        const artistName = clickedArtist.name;

        const isArtistSelected = selectedArtists.includes(artistName);

        if (isArtistSelected) {
            const updatedSelectedArtists = selectedArtists.filter(
                (artist) => artist !== artistName
            );
            setSelectedArtists(updatedSelectedArtists);
            setSelectedArtistsCount((count) => count - 1);
        } else {
            if (selectedArtistsCount < 5) {
                const updatedSelectedArtists = [...selectedArtists, artistName];
                setSelectedArtists(updatedSelectedArtists);
                setSelectedArtistsCount((count) => count + 1);
            } else {
                window.alert('You can select up to 5 artists.');
            }
        }
    };

    const handleCheckboxClickSong = (clickedSong) => {
        if (!clickedSong) {
            return;
        }

        const songName = clickedSong.name;
        const artistName = clickedSong.artists[0].name;

        const isSongSelected = selectedSongs.includes(`${songName} - ${artistName}`);

        if (isSongSelected) {
            const updatedSelectedSongs = selectedSongs.filter(
                (song) => song !== `${songName} - ${artistName}`
            );
            setSelectedSongs(updatedSelectedSongs);
            setSelectedSongsCount((count) => count - 1);
        } else {
            if (selectedSongsCount < 5) {
                const updatedSelectedSongs = [...selectedSongs, `${songName} - ${artistName}`];
                setSelectedSongs(updatedSelectedSongs);
                setSelectedSongsCount((count) => count + 1);
            } else {
                window.alert('You can select up to 5 songs.');
            }
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
                                onClick={() => handleCheckboxClickArtist(artist)}/>
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
                            <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                onClick={() => handleCheckboxClickSong(song)}
                                id="flexCheckDefault"/>
                            <label class="form-check-label" for="flexCheckDefault">
                                {song.name} - {song.artists[0].name}
                            </label>
                        </div>
                    )
                })}


            </div>
            <div className="small-vertical">
                {showTopData ? (
                    // Content to display when showTopData is true (i.e., data is available)
                    <div>
                        {/* Your existing content when showTopData is true */}
                    </div>
                ) : (
                    // Button to display when showTopData is false (i.e., data is not available)
                    <div>
                        <p> Log in to your spotify to view your top songs and artists </p>
                        <button className="button" onClick={handleLogin}>Spotify Login</button>
                    </div>
                )}



                <div className='small-gray-container'>
                    {showTopData && (
                        <>
                            <div className='small-vertical'>
                                <h3>Top Artists</h3>
                                {topArtist.map((artist) => (
                                    <div className="form-check" key={artist.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            onClick={() => handleCheckboxClickArtist(artist)}
                                            id={`flexCheckDefault-${artist.id}`}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`flexCheckDefault-${artist.id}`}
                                        >
                                            {artist.name}
                                        </label>
                                    </div>
                                ))}


                                <h3>Top Songs</h3>
                                {topSong.map((song) => (
                                    <div className="form-check" key={song.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            onClick={() => handleCheckboxClickSong(song)}
                                            id={`flexCheckDefault-${song.id}`}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`flexCheckDefault-${song.id}`}
                                        >
                                            {song.name} - {song.artists[0].name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="small-vertical">
                                <h3>Selected Artists</h3>
                                <ul>
                                    {selectedArtists.map((artist) => (
                                        <li key={artist.id}>{artist}</li>
                                    ))}
                                </ul>

                                <h3>Selected Songs</h3>
                                <ul>
                                    {selectedSongs.map((song) => (
                                        <li key={song.id}>{song}</li>
                                    ))}
                                </ul>

                            </div>
                        </>

                    )}
                </div>
            </div>
        </div>

    )
}

export default SpotifyConnect;
 