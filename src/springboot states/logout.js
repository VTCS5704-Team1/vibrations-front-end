import axios from "axios"
import accessStateRegister from "./registerAccess";


const logout = () => {
    axios.post("http://localhost:5000/api/users/logout", {}, {
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + accessStateRegister.token
        }
    }).then(resp => console.log(resp));
}

export default logout;