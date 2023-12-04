import axios from "axios";
import { useState } from "react";

// Allows the user to change their password
export default function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [email, setEmail] = useState('');

    var storedJsonString = localStorage.getItem('user');

    // Parse the JSON string back into an object
    var storedUserObject = JSON.parse(storedJsonString);


    const handleChangePassword = () => {


        try {
            if (newPassword !== confirmNewPassword) {
                window.alert('New passwords do not match.');
                return;
            }
            axios({
              method: "post",
              url: "http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/change/password",
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
        <div>
          <h3>Change Password</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button onClick={handleChangePassword}>Change Password</button>
          </form>
        </div>
      );
}