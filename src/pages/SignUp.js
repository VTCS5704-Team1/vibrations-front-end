import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './vib_logo.jpg';
import axios from 'axios';
import LogInAccess from '../springboot states/loginAccess';

export default function SignUp() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        birthdate: '',
        gender: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();

        handleSignUp();

        // I just need to rearrange it so they have to log in after create profile
        navigate("/CreateProfile");
    };

    const handleSignUp = () => {
        try {
            axios.post("http://localhost:5000/api/users/register", {
                email: formData.email,
                password: formData.password,
                birthdate: formData.birthdate,
                gender: formData.gender

            }, {
                headers: {"Content-type": "application/json"}
            }).then(r => {
                console.log(r);
            }).catch(error => {
                console.error("Error during sign up:", error);
                window.alert("didnt work stupid");
            });
        }
        catch (error) {
            // idk I'll do something here
        }
    }



    return (
        <div className="small-vertical-container">
            <img src={logo} alt='logo' className="img"/>
            <h2>Sign Up for Vibrations</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Birthdate:</label>
                    <input
                        type="text"
                        name="birthdate"
                        pattern="\d{4}-\d{2}-\d{2}"
                        placeholder="yyyy-mm-dd"
                        value={formData.birthdate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}
