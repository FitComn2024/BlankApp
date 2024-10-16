import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles as styles, colors } from '../styles/GlobalStyles'; // Import global styles and colors

const CustomHeader = ({ title, navigation, showBackButton = true, showNotifications = true }) => {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 10 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Back Button */}
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 20 }}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        
        {/* Title */}
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', flex: 1 }}>
          {title}
        </Text>
        
        {/* Notifications Icon */}
        {showNotifications && (
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
        )}
        
      </View>
    </LinearGradient>
  );
};
const CustomHeader2 = ({ title, navigation }) => {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 10 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Title */}
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 20 }}>
          {title}
        </Text>

        {/* Notifications Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export { CustomHeader, CustomHeader2};