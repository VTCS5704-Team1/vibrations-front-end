import React, {useState} from "react";
import logo from './vib_logo.jpg';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUserLogin = () => {

      onLogin();
    }
  
    return (
      <div className="small-vertical-container">
        <img src={logo} alt='logo' className="img"/>
      <div className="login-page">
        <h2>Login</h2>
        <form>
          <div className="input-box">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button" onClick={handleUserLogin}>
        Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;