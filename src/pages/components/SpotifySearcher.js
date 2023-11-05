import React, {useState, useEffect} from 'react'
import axios from 'axios';

const SEARCH_ENDPOINT_START = "https://api.spotify.com/v1/me/top/search?";

function SpotifySearcher(props) {
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
  
    const access_token = props.token
    
    const search = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
      
        var artistID = data.artists.items[0].id

        var artistResults = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                limit: 10,
                market: 'US'
            }
        })

        setArtists(artistResults.data.tracks);
    }

    return (
      <>
      <div className="SearchForm">
        <input
          className ="Name" 
          type="text" 
          placeholder="Search By Artist Name ..."
          onChange={(e) => {setSearchKey(e.target.value)}}
          
          />
        <button onClick={searchArtist}>Search</button> 
      </div>
      {
        artists.slice(0, 5).map(artist => (
            <div key={artist.id} >
                <ul>
                    <li > {artist.name}</li>
                </ul>
            </div>
        ))
      }
      </> 
    )
}

export default SpotifySearcher;