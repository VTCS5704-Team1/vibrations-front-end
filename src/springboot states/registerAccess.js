import axios from "axios";

const accessStateRegister = () => {
  

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