
import ProfilePicUpload from "./ProfilePicUpload";
import { InputGroup, FormControl } from 'react-bootstrap';
import React, {useState } from 'react';
import SpotifyConnect from "./SpotifyConnect";



export default function Editer() {

    const [searchArtistInput, setSearchArtistInput ] = useState("");
    const [searchSongInput, setSearchSongInput ] = useState("");
    const [bio, setBio] =  useState("");

    // access API using auth token 
    


    return ( 
        <div className="container">
        <div className="profile">
                    <ProfilePicUpload/>
                    <h3>Their name will go here</h3>
                    <p> Add a bio that says a little about you </p>
                    <InputGroup classname="mb-3" size="lg">
                    <FormControl className="bio" as="textarea" rows ={8}
                        placeholder="Add a bio"
                        type="input"
                        onKeyDown={event => {
                            if (event.key == "Enter") {
                                console.log("Pressed enter");

                            }
                        }}
                    onChange={event => setBio(event.target.value)}
                    
                    />

                </InputGroup>

                </div>
                <div className="favorite-music">
                     <SpotifyConnect />
                </div>

        </div>
                 
    );
}