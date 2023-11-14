import React from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import Editer from "./components/Editer";


export default function CreateProfile({onCreate}) {
    const navigate = useNavigate();

    const handleSave = () => {
        onCreate();
        navigate('/profile');
    }


    return (
        <div>
            <Navbar />
            <div className="vertical-container">
                <h1>Create Your Profile</h1>
                <Editer/>
                <button onClick={handleSave} className="button" > Save </button>
                </div>

            
        </div>
    )
}