import axios from "axios";

const accessStateRegister = () => {
  var authParameters = {
    method: 'GET',

    headers: {
      "Content-type": "application/json",
    },


    body: {
        email: "davidfc@vt.edu",
        password: "HelloWorld123!"
    },
  }

  const postData = {
    email: "davidfc@vt.edu",
    password: "HelloWorld123!"
  }

  try {
    axios.post("http://localhost:5000/api/users/login", postData, {
      headers: {"Content-type": "application/json"}
    }).then(resp => {
      console.log(resp)
    })
  } catch (error) {
    console.log("Error!", error)
  }
}

export default accessStateRegister