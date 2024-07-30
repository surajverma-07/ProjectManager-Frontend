//Creting Context for the authentication
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);//to check wheather user is authorized or not 
  const [userData, setUserData] = useState(null);//to store use data
  const [isAdmin, setIsAdmin] = useState(false);//check if user is admin 

  const adminLogin = (data) => {
    //If Admin Loging in successfully then set is admin true 
    setIsAdmin(true);
    setIsAuthorized(true);
    setUserData(data);
  };
  //student login 
  const login = (data) => {
    setIsAuthorized(true);
    setUserData(data);
    setIsAdmin(false);
  };
  //logut is common for both 
  const logout = () => {
    setIsAuthorized(false);
    setUserData(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthorized, userData, login, logout, isAdmin, adminLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
