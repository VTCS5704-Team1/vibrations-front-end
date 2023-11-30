
import axios from "axios";

async function getUserData({email, response}) {

    var storedJsonString = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var storedUserObject = JSON.parse(storedJsonString);

    try {

      console.log(email);
      response = await axios({
        method: "GET",
        url: `http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/getUser?email=${email}`,
        /* params: {
          "email": userData.email,
        }, */
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + storedUserObject.token,
        },
      });
    
      
      // setPfp(response.data.pfp);
    
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
      
    
  }