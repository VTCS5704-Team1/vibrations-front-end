import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { useUserData } from './User';


// creates a like button component for the home page
const LikeButton = ({ name, pfp }) => {
  const { userData, updateUserData } = useUserData();
  const [isLiked, setIsLiked] = useState(false);

  const liked = () => {
    const user = { name: name, pfp: pfp };
    userData.likedUsers.push(user);
    updateUserData(userData);
    setIsLiked(true);
  };

  return (
    <div>
      {!isLiked ? (
        <button className="button" id="like" onClick={liked}>
          <i className="fa fa-thumbs-up"></i>
          <span className="icon">Like</span>
        </button>
      ) : (
        <p>Profile liked!</p>
      )}
    </div>
  );
};

export default LikeButton;