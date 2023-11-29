import axios from "axios";

async function getAllUsers() {

    var storedJsonString = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var storedUserObject = JSON.parse(storedJsonString);

    try {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/users/all`,
        /* params: {
          "email": userData.email,
        }, */
        headers: {
          "Authorization": "Bearer " + storedUserObject.token,
        },
      }).then(console.log(response));

    
    } catch (error) {
      console.error('Error fetching all matches:', error);
    }
      
    
  }