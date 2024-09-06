import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles as styles, colors } from '../styles/GlobalStyles'; // Import global styles and colors

const CustomHeader = ({ title, navigation }) => {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 10, }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 20,}}>
          {title}
        </Text>
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
      style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 10, }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 20,}}>
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
};

export { CustomHeader, CustomHeader2};