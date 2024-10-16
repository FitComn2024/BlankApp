import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/GlobalStyles';

const GradientHeader = ({ title }) => {
  const navigation = useNavigation(); // Hook to get navigation prop

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0.5 }} 
      end={{ x: 1, y: 0.5 }}
      style={{ paddingVertical: 10 }}
    >
      {/* SafeAreaView inside LinearGradient */}
      <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1 }}>{title}</Text>

        {/* Notifications Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginLeft: 'auto' }}>
          <Icon name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const GradientHeader2 = ({ title }) => {
    const navigation = useNavigation(); // Hook to get navigation prop
  
    return (
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0.5 }} 
        end={{ x: 1, y: 0.5 }}
        style={{ paddingVertical: 10 }}
      >
        
        {/* SafeAreaView inside LinearGradient */}
        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
          {/* Title */}
          <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1 }}>{title}</Text>
  
          {/* Notifications Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginLeft: 'auto' }}>
            <Icon name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  };

  const GradientHeader3 = ({ title }) => {
    const navigation = useNavigation(); // Hook to get navigation prop
  
    return (
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        start={{ x: 0, y: 0.5 }} 
        end={{ x: 1, y: 0.5 }}
        style={{ paddingVertical: 10 }}
      >
        {/* SafeAreaView inside LinearGradient */}
        <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
          {/* Title */}
          <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', flex: 1 }}>{title}</Text>
  
        </SafeAreaView>
      </LinearGradient>
    );
  };
  
export {GradientHeader, GradientHeader2, GradientHeader3};
