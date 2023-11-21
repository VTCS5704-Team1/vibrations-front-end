import React, {useState} from "react";
import logo from './vib_logo.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleUserLogin = () => {

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
      console.log(email);
      console.log(password); 
      logIn();
    }

    const logIn = () => {

      try {

        axios.post("http://localhost:5000/api/users/login", {
        email: email,
        password: password
      }, {
        headers: {"Content-type": "application/json"}
      }).then(r => {
        console.log(r.data);
        localStorage.setItem("user", JSON.stringify({email, token: r.data.accessToken}))

              // Retrieve the JSON string from local storage
        var storedJsonString = localStorage.getItem('user');

            // Parse the JSON string back into an object
        var storedUserObject = JSON.parse(storedJsonString);

            // Display the access token in the console
        console.log("Access Token:", storedUserObject.token);
        setEmail(email)
        onLogin();
        navigate("/home");
      }) .catch(error => {
        console.error("Error during login:", error);
        window.alert("Wrong email or password");
      });
      } catch (error) {
        window.alert("Wrong email or password")
      }

    }

/*       // Check if email has an account associated with it
      checkAccountExists(accountExists => {
        // If yes, log in 
        if (accountExists) {
          logIn();
          navigate("/home");
          onLogin();
        }
        else
          window.alert("An account with email " + email + " does not exist.")
      }) 
    } */

 


/*     // end point
    // If you don't want to implement we can remove 
    const checkAccountExists = (callback) => {
      fetch("http://localhost:5000/check-account", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body :JSON.stringify({email})
      })
      .then(r => r.json())
      .then(r => {
        callback(r?.userExists)
      })
    }
/*  */
    
   
    
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
        <button className="button" type="button" onClick={handleUserLogin}>
        Login
        </button>
      </form>
    </div>
    </div>
  );
    }

export default LoginPage;