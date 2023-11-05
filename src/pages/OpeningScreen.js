import React from 'react'
import {
  Link
} from 'react-router-dom';
import './openingScreen.css';

export default function OpeningScreen() {
    return (
        <div className="opening-screen">
        <h1 className='open-header'> Welcome to Vibrations!</h1>
        <div className='button-container'>
            <LoginButton/>
            <SignUpButton/>
        </div>
    </div>
);
}

function LoginButton() {
return (
    <Link to="/LogIn">
            <button className ="button">Log In</button>
    </Link>
);
}

function SignUpButton() {
return (
    <Link to="/SignUp">
        <button className ="button">Sign Up</button>
    </Link>
);
}