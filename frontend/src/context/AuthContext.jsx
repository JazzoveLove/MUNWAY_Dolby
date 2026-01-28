import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const startedToken = localStorage.getItem("access");

    if (startedToken) {
      setUser(startedToken);
    }
  }, []);

  const loginUser = (token) => {
    localStorage.setItem("access", token);
    setUser(token);
  };

  const logOutUser = () => {
    localStorage.removeItem("access");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
