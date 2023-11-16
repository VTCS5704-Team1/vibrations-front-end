import { useCallback, useState } from 'react'; 

const accessStateRegister = (props) => {
  var authParameters = {
    method: 'POST',

    // needs to be JSON request body 
    body: {
        "email": "davidfc@vt.edu",
        "password": "Password123!",
        "name": "David",
        "image": "http://img2.wikia.nocookie.net/__cb20131129221253/fantendo/images/7/74/Donkey_Kong_Profile_Artwork.jpg",
        "gender": "Male",
        "birthdate": "2000-04-17"
    }
}

  const getAuth = useCallback(() => {
      fetch('localHost:5000/api/users/login')
      .then()
  })
}