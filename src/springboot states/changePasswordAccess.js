import axios from "axios";
import { useState } from "react";


export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [email, setEmail] = useState('');

    var storedJsonString = localStorage.getItem('user');

 // Parse the JSON string back into an object
  var storedUserObject = JSON.parse(storedJsonString);

  // Display the access token in the console
  console.log("Access Token:", storedUserObject.token);

    const handleChangePassword = () => {

        console.log("access token", storedUserObject.token);
        console.log("email", email);
        console.log("current password", currentPassword);
        console.log("new password", newPassword);


        try {
            if (newPassword !== confirmNewPassword) {
                window.alert('New passwords do not match.');
                return;
            }
            axios({
              method: "post",
              url: "http://localhost:5000/api/users/change/password",
              headers: {
                'Authorization': 'Bearer ' + storedUserObject.token,
                "Content-type": "application/json"
              },
              data: {
                "email": email,
                "oldPassword": currentPassword,
                "newPassword": newPassword
              },
            })

            .then(resp => console.log(resp))
            .catch(error => {
                console.log(error);
                window.alert('Error in changing your password');
            });
            
        } 
        catch (error) {
            console.log(error);
            window.alert('Error in changing your password');
        }
      };

      return (
        <div className='vertically-aligned'>
        <h3>Change Password</h3>
        <form onSubmit={(e) => e.preventDefault()}>
        <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleChangePassword}>Change Password</button>
        </form>
        </div>
      );

}