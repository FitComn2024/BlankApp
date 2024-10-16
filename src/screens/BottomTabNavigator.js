import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import UserProfileScreen from './UserProfileScreen';
import HomeDashboardScreen from './HomeDashboardScreen';
import TrainerProfileScreen from './TrainerProfileScreen';
import UserListScreen from './UserListScreen'; 
import {GradientHeader, GradientHeader2, GradientHeader3} from './GradientHeader'; 
import {CustomHeader2, CustomHeader} from './CustomHeader';
import ClientListScreen from './ClientListScreen';
import ClientProfileScreen from './ClientProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import NotificationsScreen from './NotificationsScreen';
import QuestionnaireScreen2 from './QuestionnaireScreen2';

// Create Stack Navigators for each entity
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeDashboard" 
      component={HomeDashboardScreen} 
      options={{
        header: () => <GradientHeader2 title="Home" />,
      }}  
    />
    <Stack.Screen 
      name="UserList" 
      component={UserListScreen} 
      options={{
        header: () => <GradientHeader title="Users List" />,
      }} 
    />
    <Stack.Screen 
      name="ClientList" 
      component={ClientListScreen} 
      options={{
        header: () => <GradientHeader title="Client List" />,
      }}  
    />
    <Stack.Screen 
      name="TrainerProfile" 
      component={TrainerProfileScreen} 
      options={{
        header: () => <GradientHeader title="Trainer Profile" />,
      }} 
    />
    <Stack.Screen 
      name="ClientProfile" 
      component={ClientProfileScreen} 
      options={{
        header: () => <GradientHeader title="Client Profile" />,
      }} 
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        header: ({ navigation }) => <GradientHeader3 navigation={navigation} title="Notifications" />,
      }}
    />
  </Stack.Navigator>
);

// Profile Stack
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="UserProfileScreen" 
      component={UserProfileScreen} 
      options={{
        header: () => <GradientHeader2 title="Profile" />,
      }}  
    />
    <Stack.Screen 
      name="EditProfileScreen" 
      component={EditProfileScreen} 
      options={{
        header: () => <GradientHeader title="Settings" />,
      }}   
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        header: ({ navigation }) => <GradientHeader3 navigation={navigation} title="Notifications" />,
      }}
    />
  </Stack.Navigator>
);

// Chats Stack
const ChatsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Questionnaire" 
      component={QuestionnaireScreen2} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        header: ({ navigation }) => <GradientHeader3 navigation={navigation} title="Notifications" />,
      }}
    />
  </Stack.Navigator>
);

// BottomTabNavigator with Home, Profile, and Chats as separate entities
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
      {/* Home Stack */}
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={({ navigation }) => ({ 
          header: () => <CustomHeader2 title="Home" navigation={navigation} />, 
          tabBarLabel: "Home" , headerShown: false
        })} 
      />
      
      {/* Profile Stack */}
      <Tab.Screen 
        name="UserProfile" 
        component={ProfileStack} 
        options={({ navigation }) => ({ 
          header: () => <CustomHeader title="" navigation={navigation} />, 
          tabBarLabel: "Profile", 
          headerShown: false 
        })} 
      />
      
      {/* Chats Stack */}
      <Tab.Screen 
        name="Chats" 
        component={ChatsStack} 
        options={{ 
          tabBarLabel: 'Chats', 
          headerShown: false 
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
