import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

  const handleLogout = () => {

    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogout} className='button'>Logout</button>
    </div>
  );
}

export default Logout;
