import { createContext, useState, useEffect } from "react";
import { refresh_token_api } from "../api/auth_api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  console.log("AuthContext");

  //  Automatically refresh token on app start
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await refresh_token_api();
        if (response?.data?.accessToken) {
          console.log("Refresh token:", response.data.accessToken);
          localStorage.setItem("l_token", response.data.accessToken);
          setToken(response.data.accessToken);
        }
      } catch (error) {
        console.log("Token refresh failed:", error);
        localStorage.removeItem("l_token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
  
    if (!token && localStorage.getItem("l_token")) {
      refreshToken();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
