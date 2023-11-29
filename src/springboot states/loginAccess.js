import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../pages/components/User";
import { useState } from "react";




export default function LogInAccess({email, password}) {

  
        console.log(email);
        console.log(password);

        axios.post("http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/login", {
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
      }) .catch(error => {
        console.error("Error during login:", error);
        window.alert("Wrong email or password");
      });
      

    }
