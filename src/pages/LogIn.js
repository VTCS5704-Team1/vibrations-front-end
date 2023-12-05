import React, {useState} from "react";
import logo from './vib_logo.jpg';
import { useNavigate } from "react-router-dom";
import LogInAccess from "../springboot states/loginAccess";
import { useUserData } from "../components/User";


// Log In page for a user
function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const {userData, updateUserData} = useUserData();

    const handleUserLogin = async (event) => {

      event.preventDefault();


      // Set initial error values to empty
      setEmailError("")
      setPasswordError("")

      // Check if the user has entered both fields correctly
      if ("" === email) {
          setEmailError("Please enter your email")
          return
      }

      if ("" === password) {
          setPasswordError("Please enter a password")
          return
      }

      if (password.length < 7) {
          setPasswordError("The password must be 8 characters or longer")
          return
      }

      console.log("logging in");
      await LogInAccess({ email, password });

      var storedJsonString = localStorage.getItem('user');

            // Parse the JSON string back into an object
      var storedUserObject = JSON.parse(storedJsonString);


      // this means the log in was successful 
      if (storedUserObject !== null && storedUserObject.token != null) {
          updateUserData({email: email});
          
          
          // exists in sql (profile is created)
          
              // they acc shouldn't be able to login at all if they haven't created a profile 
          // if the user doesnt exist in sql
          onLogin();
          navigate("/home");
      }

    }
    
    return (
      <div className="small-vertical-container">
        <img src={logo} alt='logo' className="img"/>
      <div className="login-page">
        <h2>Login</h2>
        <form>
          <div className="input-box">
          <input
            type="text"
            placeholder="Enter your email here"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Enter your password here"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <button className="button" type="submit" onClick={handleUserLogin}>
        Login
        </button>
      </form>
    </div>
    </div>
  );
    }

export default LoginPage;