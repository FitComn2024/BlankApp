import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from 'jwt-decode';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';

import { CustomHeader } from './src/screens/CustomHeader';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import BottomTabNavigator from './src/screens/BottomTabNavigator';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import HomeScreen from './src/screens/HomeScreen';
import { AuthProvider } from './src/context/AuthProvider'; 
import { getUserPoolData } from './src/data/Config';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Fetch current location
      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
      showLocation(locationData);
    })();
  }, []);
  const showLocation = (locationData) => {
    if (locationData) {
      console.log(
        "Your Location",
        `Latitude: ${locationData.coords.latitude}, Longitude: ${locationData.coords.longitude}`, locationData
      );
    } else {
      console.log("Error", "Location not available.");
    }
  };

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        const username = await SecureStore.getItemAsync('userName'); // Assume username is stored

        console.log('Stored access token:', accessToken);
        console.log('Stored refresh token:', refreshToken);
        console.log('Stored username:', username);

        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          console.log('Decoded token:', decodedToken);

          const currentTime = Date.now() / 1000;
          console.log('Current time:', currentTime);
          console.log('Token expiration time:', decodedToken.exp);

          // Check if token is expired
          if (decodedToken.exp < currentTime && refreshToken) {
            console.log('Access token is expired. Trying to refresh the token...');
            await refreshTokenFunction(refreshToken, username);
          } else {
            console.log('Access token is still valid.');
            setIsLoggedIn(true);
          }
        } else {
          console.log('No access token found.');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('Error checking token:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    };

    checkUserToken();
  }, []);

  const refreshTokenFunction = async (storedRefreshToken, storedUsername) => {
    const poolData = await getUserPoolData();
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({
      Username: storedUsername,
      Pool: userPool,
    });

    console.log('Attempting to refresh session for user:', storedUsername);

    const RefreshToken = {
      getToken: () => storedRefreshToken,
    };

    cognitoUser.refreshSession(RefreshToken, (err, session) => {
      if (err) {
        console.log('Error refreshing token:', err);
        setIsLoggedIn(false);
      } else {
        console.log('Session refreshed successfully:', session);

        const newAccessToken = session.getAccessToken().getJwtToken();
        const newRefreshToken = session.getRefreshToken().getToken();

        console.log('New access token:', newAccessToken);
        console.log('New refresh token:', newRefreshToken);

        SecureStore.setItemAsync('accessToken', newAccessToken);
        SecureStore.setItemAsync('refreshToken', newRefreshToken);
        setIsLoggedIn(true);
      }
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D22B2B" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#D22B2B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {isLoggedIn   ? (
            <>
              <Stack.Screen
                name="MainTabs"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignupScreen}
                options={({ navigation }) => ({
                  header: () => <CustomHeader title="" navigation={navigation} showNotifications={false} />,
                })}
              />
              <Stack.Screen
                name="SignIn"
                component={LoginScreen}
                options={({ navigation }) => ({
                  header: () => <CustomHeader title="" navigation={navigation} showNotifications={false}/>,
                })}
              />
              <Stack.Screen
                name="QuestionnaireScreen"
                component={QuestionnaireScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MainTabs"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
