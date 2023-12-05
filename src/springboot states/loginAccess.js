import axios from "axios";

export default function LogInAccess({ email, password }) {
  console.log("LogInAccess started");

  return axios
    .post(
      "http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/login",
      {
        email: email,
        password: password,
      },
      {
        headers: { "Content-type": "application/json" },
      }
    )
    .then((response) => {
      console.log("Login successful:", response.data);
      localStorage.setItem("user", JSON.stringify({ email, token: response.data.accessToken }));
      return response.data; // Resolve with the response data
    })
    .catch((error) => {
      console.error("Error during login:", error);
      window.alert("Wrong email or password");
      throw error; // Rethrow the error to propagate it
    });
}
