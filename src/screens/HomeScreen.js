import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeScreenStyles as styles } from "../styles/HomeScreenStyles";
import { colors } from '../styles/GlobalStyles'; // Import global styles and colors

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/images/hero-image.png')} // Adjust the path as necessary
          style={styles.appLogo}
        />
        <Text style={styles.title}>FITNESS CLUB</Text>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.socialMediaText}>Login with Social Media</Text>
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/instagram-icon.png')} // Adjust the path as necessary
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/twitter-icon.png')} // Adjust the path as necessary
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/facebook-icon.png')} // Adjust the path as necessary
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View> */}
    </LinearGradient>
  );
};

export default HomeScreen;