import { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    // Initial user data or an empty object
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    latitude: '',
    longitude:'',
    likedUsers: []
  });


  const updateUserData = (newUserData) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...newUserData,
    }));

  };

  return (
      <UserDataContext.Provider value={{ userData, updateUserData }}>
        {children}
      </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
