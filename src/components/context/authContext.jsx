import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin,setIsAdmin] = useState(false); 
  
  const adminLogin = (data) =>{
     setIsAdmin(true)
     setIsAuthorized(true)
     setUserData(data)
  }
  const login = (data) => {
    setIsAuthorized(true);
    setUserData(data);
    setIsAdmin(false)
  };

  const logout = () => {
    setIsAuthorized(false);
    setUserData(null);
    setIsAdmin(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, userData, login, logout,isAdmin,adminLogin}}>
      {children}
    </AuthContext.Provider>
  );
};
