import axios from "axios";
import {observable } from "mobx";

var accessStateRegister = observable({

  token: null,

  isLoggedIn: false,


  login: () => {
    axios.post("http://localhost:5000/api/users/login", {
      email: "davidfc@vt.edu",
      password: "HelloWorld123!"
    }, {
      headers: {"Content-type": "application/json"}
    }).then(resp => {
      console.log(resp)
      accessStateRegister.isLoggedIn = true;
      accessStateRegister.token = resp.data.accessToken;
      console.log(accessStateRegister.token);
    })
  }
});

export default accessStateRegister