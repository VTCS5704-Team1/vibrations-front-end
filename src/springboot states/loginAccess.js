import axios from "axios";


// Define a function component named LogInAccess that takes email and password as props 
export default function LogInAccess({email, password}) {

        axios.post("http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/login", {
        email: email,
        password: password
      }, {
        headers: {"Content-type": "application/json"}

      }).then(r => {
        // For a successful response
        localStorage.setItem("user", JSON.stringify({email, token: r.data.accessToken}))
      }) .catch(error => {
        console.error("Error during login:", error);
        window.alert("Wrong email or password");
      });
      

    }
