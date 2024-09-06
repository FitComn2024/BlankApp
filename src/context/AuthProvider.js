import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Auth } from 'aws-amplify';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            await refreshToken();  // Refresh token if expired
          } else {
            setUser(decodedToken);
          }
        }
      } catch (error) {
        console.log('Error checking user', error);
      }
    };

    checkUser();
  }, []);

  const refreshToken = async () => {
    try {
      const session = await Auth.currentSession();
      const newAccessToken = session.getAccessToken().getJwtToken();
      await SecureStore.setItemAsync('accessToken', newAccessToken);
      setUser(jwtDecode(newAccessToken));
    } catch (error) {
      console.log('Error refreshing token', error);
      setUser(null);  // Logout user on failure
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);