import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons for back button
import { colors } from '../styles/GlobalStyles';

const GradientHeader = ({ title }) => {
  const navigation = useNavigation(); // Hook to get navigation prop

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}
      style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, height: 60 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 15 }}>
        <Icon name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
    </LinearGradient>
  );
};

export default GradientHeader;
