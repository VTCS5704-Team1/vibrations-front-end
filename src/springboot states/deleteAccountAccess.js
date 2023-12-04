import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Allows the user to delete their account
const DeleteAccount = ({onLogOut}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  var storedJsonString = localStorage.getItem('user');

 // Parse the JSON string back into an object
  var storedUserObject = JSON.parse(storedJsonString);

  const handleDeleteAccount = async () => {
    try {
        
      setIsDeleting(true);

      // Make an HTTP request to your server or API endpoint for account deletion
      axios({
        method: "post",
        url: "http://dev-vibrations-api-final-env.eba-wpisspwu.us-east-2.elasticbeanstalk.com/api/users/delete",
        headers: {
          'Authorization': 'Bearer ' + storedUserObject.token,
          "Content-type": "application/json"
        },
        data: {
          "email": email,
          "password": password,
        },
      }).then(response => {
        console.log(response)
      })

        // Account deletion successful, you might want to redirect the user or show a success message
        console.log('Account deleted successfully');

    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Error deleting account', error);
    } finally {
      setIsDeleting(false);
      localStorage.clear();
      onLogOut();
      navigate("/");
    }
  };

  return (
    <div>
      <h3>Delete Account</h3>
      <p>Enter your email and password to confirm deletion:</p>
      <form>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleDeleteAccount} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;