import React from "react";
import Navbar from "../Navbar";
import { InputGroup, FormControl, Button, Container  } from 'react-bootstrap';
import {useState } from 'react';
import SpotifyConnect from "../SpotifyConnect";

export default function CreateProfile() {
    const [searchArtistInput, setSearchArtistInput ] = useState("");
    const [searchSongInput, setSearchSongInput ] = useState("");
    const [bio, setBio] =  useState("");

    return (
        <div>
            <Navbar />
            <h1>Create Your Profile</h1>
                <h3> Add a bio that says a little about you </h3>
                <InputGroup classname="mb-3" size="lg">
                <FormControl as="textarea" rows ={4}
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
                    
                <SpotifyConnect />

            
        </div>
    )
}