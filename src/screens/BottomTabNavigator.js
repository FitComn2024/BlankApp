import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import UserProfileScreen from './UserProfileScreen';
import HomeDashboardScreen from './HomeDashboardScreen';
import TrainerProfileScreen from './TrainerProfileScreen';
import UserListScreen from './UserListScreen'; 
import GradientHeader from './GradientHeader'; // Import the updated GradientHeader
import {CustomHeader2} from './CustomHeader';
import ClientListScreen from './ClientListScreen';
import ClientProfileScreen from './ClientProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeDashboard" 
      component={HomeDashboardScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="UserList" 
      component={UserListScreen} 
      options={{ headerShown: true, title: 'Trainer List' }} 
    />
    <Stack.Screen 
      name="TrainerProfile" 
      component={TrainerProfileScreen} 
      options={{
        header: () => <GradientHeader title="Trainer Profile" />,
      }} 
    />
    <Stack.Screen 
      name="ClientList" 
      component={ClientListScreen} 
      options={{ headerShown: true, title: 'Client List' }} 
    />
    <Stack.Screen 
      name="ClientProfile" 
      component={ClientProfileScreen} 
      options={{
        header: () => <GradientHeader title="Client Profile" />,
      }} 
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'UserProfile') {
            iconName = 'person';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Chats') {
            iconName = 'chatbubbles';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary, 
        tabBarInactiveTintColor: colors.secondaryText, 
        tabBarLabelStyle: {
          fontSize: GlobalStyles.text.fontSize, 
          fontFamily: GlobalStyles.text.fontFamily, 
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Dashboard', header: () => <CustomHeader2 title="Home" /> }} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{ tabBarLabel: 'Profile', header: () => <CustomHeader2 title="Profile" /> }} />
      <Tab.Screen name="Chats" component={HomeDashboardScreen} options={{ tabBarLabel: 'Chats' }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
