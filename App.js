import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {jwtDecode} from 'jwt-decode';
import { Auth } from 'aws-amplify';
import * as SplashScreen from 'expo-splash-screen';

import {CustomHeader} from './src/screens/CustomHeader';
import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import BottomTabNavigator from './src/screens/BottomTabNavigator';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import HomeScreen from './src/screens/HomeScreen';

import { AuthProvider } from './src/context/AuthProvider'; 
import './src/screens/ClientAmplifyConfig';


import {Amplify} from "@aws-amplify/core";
import awsConfig from './src/screens/ClientAmplifyConfig'; 

Amplify.configure(awsConfig);
console.log('Aws config:', awsConfig);
console.log('Amplify configured:', Amplify);
console.log('Auth object:', Auth);

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken');

        if (accessToken) {
          // console.log('access token present', accessToken);
          // const jwtDecode = (await import('jwt-decode')).default;
          const decodedToken = jwtDecode(accessToken);
          // console.log('decoded token', decodedToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            try {
              const session = await Auth.currentSession();
              const newAccessToken = session.getAccessToken().getJwtToken();
              await SecureStore.setItemAsync('accessToken', newAccessToken);
              setIsLoggedIn(true);
            } catch (refreshError) {
              console.log('Error refreshing token:', refreshError);
              setIsLoggedIn(false);
            }
          } else {
            setIsLoggedIn(true);
          }
        } else {
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
                options={({ navigation }) => ({
                  header: () => <CustomHeader title="" navigation={navigation} />
                })} 
              />
              <Stack.Screen 
                name="SignUp" 
                component={SignupScreen} 
                options={({ navigation }) => ({
                  header: () => <CustomHeader title="" navigation={navigation} />
                })} 
              />
             
              <Stack.Screen 
                name="SignIn" 
                component={LoginScreen} 
                options={({ navigation }) => ({
                  header: () => <CustomHeader title="" navigation={navigation} />
                  
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
