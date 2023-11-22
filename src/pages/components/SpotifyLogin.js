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

const SpotifyLogin = () => {
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
  
    return (
      <div>
        <p>To access your Spotify data, log in to Spotify:</p>
        <button onClick={handleLogin}>Spotify Login</button>
  
        {showTopData && (
          <>
            <h3>Top Artists</h3>
            {topArtist.map((artist) => (
              <div className="form-check" key={artist.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
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
                  id={`flexCheckDefault-${song.id}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`flexCheckDefault-${song.id}`}
                >
                  {song.name}
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };
  
  export default SpotifyLogin;