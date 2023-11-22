import React, { useState } from 'react';
import Navbar from '../Navbar';

export default function Settings({onLogOut}) {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for managing GPS location/limits
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [radius, setRadius] = useState('');

    // Function to handle password change
    const handleChangePassword = () => {
        // Implement password change logic here
        console.log('Password changed successfully!');
    };

    // Function to handle account deletion
    const handleDeleteAccount = () => {
        // Implement account deletion logic here
        console.log('Account deleted successfully!');
    };

    // Function to handle GPS location/limits change
    const handleLocationChange = () => {
        // Implement location/limits change logic here
        console.log('Location/limits changed successfully!');
    };


    return (

        <div>
            <Navbar/>
            <div className='vertical-container'>
                <h1> Account Settings </h1>
                <div className='center-vertical-container'>
                    <h3>Change Password</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>
                            Current Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            New Password:
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Confirm Password:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                        <br />
                        <button onClick={handleChangePassword}>Change Password</button>
                    </form>
                    <h3>Change GPS Location/Limits</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <p> this will use the gps API</p>
                        <button onClick={handleLocationChange}>Change Location/Limits</button>
                    </form>
                    <h3>Delete Account</h3>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
                <button onClick={onLogOut} className='button'>Logout</button>
            </ div>
        </div>

    );

}
