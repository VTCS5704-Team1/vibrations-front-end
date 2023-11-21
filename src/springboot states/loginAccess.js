import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogInAccess({email, password, onLogin}) {

    const navigate = useNavigate();
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
