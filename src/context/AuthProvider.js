import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from 'jwt-decode';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { getUserPoolData } from '../data/Config';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime && refreshToken) {
            await refreshTokenFunction(refreshToken);  // Refresh token if expired
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

  const refreshTokenFunction = async (storedRefreshToken) => {
    const poolData = await getUserPoolData();
    const userPool = new CognitoUserPool(poolData);
    const storedUsername = await SecureStore.getItemAsync('userName'); // Assuming the username is stored in SecureStore
    const cognitoUser = new CognitoUser({
      Username: storedUsername,
      Pool: userPool,
    });

    const RefreshToken = {
      getToken: () => storedRefreshToken,
    };

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
      if (err) {
        console.log('Error refreshing token:', err);
        setUser(null);  // Logout user on failure
      } else {
        const newAccessToken = session.getAccessToken().getJwtToken();
        const newRefreshToken = session.getRefreshToken().getToken();

        SecureStore.setItemAsync('accessToken', newAccessToken);
        SecureStore.setItemAsync('refreshToken', newRefreshToken);

        const decodedToken = jwtDecode(newAccessToken);
        setUser(decodedToken);
      }
    });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
