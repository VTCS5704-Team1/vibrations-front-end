import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import Editer from "./components/Editer";
import axios from "axios";

export default function CreateProfile() {
    const navigate = useNavigate();

    const handleSave = () => {
        navigate('/LogIn');
    }


    return (
        <div>
            <div className="vertical-container">
                <h1>Create Your Profile</h1>
                <Editer/>
                <button onClick={handleSave} className="button" > Save </button>
                </div>

            
        </div>
    )
}