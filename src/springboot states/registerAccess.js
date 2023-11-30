import axios from "axios";

const accessStateRegister = () => {
  

  const postData = {
    email: "davidfc@vt.edu",
    password: "HelloWorld123!"
  }

  try {
    axios.post("http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/login", postData, {
      headers: {"Content-type": "application/json"}
    }).then(resp => {
      console.log(resp)
    })
  } catch (error) {
    console.log("Error!", error)
  }
}

export default accessStateRegister