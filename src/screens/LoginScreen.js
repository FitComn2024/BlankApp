import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { GlobalStyles as styles, colors } from '../styles/GlobalStyles'; // Import global styles and colors
import { LoginScreenStyles as localStyles } from '../styles/LoginScreenStyles';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import poolData from './ClientAmplifyConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // 1: Enter Email, 2: Reset Password

  const validate = () => {
    let valid = true;
    let errors = {};

    if (email.length === 0) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!isForgotPassword && password.length === 0) {
      errors.password = 'Password is required';
      valid = false;
    }

    if (isForgotPassword && forgotPasswordStep === 2 && newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      const userPool = new CognitoUserPool(poolData);
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: async (data) => {
          console.log("Success: ", JSON.stringify(data));

          // Store tokens in SecureStore
          await SecureStore.setItemAsync('accessToken', data.getAccessToken().getJwtToken());
          await SecureStore.setItemAsync('idToken', data.getIdToken().getJwtToken());
          await SecureStore.setItemAsync('refreshToken', data.getRefreshToken().getToken());

          // Navigate to the main app screen
          navigation.navigate('MainTabs');
        },
        onFailure: (err) => {
          console.log("Failure: ", JSON.stringify(err));
          setErrors({ general: 'Invalid email or password. Please try again.' });
        },
        newPasswordRequired: (data) => {
          console.log("New password required: ", JSON.stringify(data));
          // Handle new password scenario if needed
        },
      });
    }
  };

  const handleForgotPassword = () => {
    if (email.length === 0) {
      setErrors({ email: 'Email is required' });
      return;
    }

    const userPool = new CognitoUserPool(poolData);
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.forgotPassword({
      onSuccess: (data) => {
        console.log("Code sent: ", data);
        setForgotPasswordStep(2); // Move to the reset password step
      },
      onFailure: (err) => {
        console.log("Error: ", err.message || JSON.stringify(err));

        // Display a user-friendly error message
        if (err.code === 'LimitExceededException') {
          setErrors({ email: 'Too many attempts. Please try again later.' });
        } else {
          setErrors({ email: 'Error sending code. Please try again.' });
        }
      },
    });
  };

  const handleResetPassword = () => {
    if (validate()) {
      const userPool = new CognitoUserPool(poolData);
      const user = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      user.confirmPassword(confirmationCode, newPassword, {
        onSuccess: () => {
          console.log("Password reset successful");
          setForgotPasswordStep(1);
          setIsForgotPassword(false);
          navigation.navigate('SignIn');
        },
        onFailure: (err) => {
          console.log("Error: ", err.message || JSON.stringify(err));

          // Handle specific errors
          if (err.message.includes('password')) {
            setErrors({ confirmNewPassword: 'Invalid password format. Please try again.' });
          } else if (err.code === 'CodeMismatchException') {
            setErrors({ confirmationCode: 'Invalid confirmation code. Please try again.' });
          } else if (err.code === 'LimitExceededException') {
            setErrors({ general: 'Too many attempts. Please try again later.' });
          } else {
            setErrors({ general: 'Error resetting password. Please try again.' });
          }
        },
      });
    }
  };

  const renderForgotPasswordStep = () => {
    if (forgotPasswordStep === 1) {
      return (
        <>
          <View style={localStyles.inputContainer}>
            <Text style={localStyles.label}>Email</Text>
            <View style={localStyles.inputWrapper}>
              <TextInput
                style={localStyles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {errors.email && <Text style={localStyles.errorText}>{errors.email}</Text>}
          </View>

          <TouchableOpacity style={localStyles.signInButton} onPress={handleForgotPassword}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              style={localStyles.signInButtonGradient}
              start={{ x: 0, y: 0.5 }} 
              end={{ x: 1, y: 0.5 }}
            >
              <Ionicons name="arrow-forward" size={24} color={colors.buttonText} />
            </LinearGradient>
          </TouchableOpacity>
        </>
      );
    } else if (forgotPasswordStep === 2) {
      return (
        <>
          <View style={localStyles.inputContainer}>
            <Text style={localStyles.label}>Confirmation Code</Text>
            <View style={localStyles.inputWrapper}>
              <TextInput
                style={localStyles.input}
                placeholder="Enter confirmation code"
                placeholderTextColor={colors.placeholder}
                value={confirmationCode}
                onChangeText={setConfirmationCode}
                keyboardType="number-pad"
              />
            </View>
            {errors.confirmationCode && <Text style={localStyles.errorText}>{errors.confirmationCode}</Text>}
          </View>

          <View style={localStyles.inputContainer}>
            <Text style={localStyles.label}>New Password</Text>
            <View style={localStyles.passwordContainer}>
              <TextInput
                style={localStyles.input}
                placeholder="Enter new password"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.placeholder}
                  style={localStyles.icon}
                />
              </TouchableOpacity>
            </View>
            {errors.newPassword && <Text style={localStyles.errorText}>{errors.newPassword}</Text>}
          </View>

          <View style={localStyles.inputContainer}>
            <Text style={localStyles.label}>Confirm New Password</Text>
            <View style={localStyles.passwordContainer}>
              <TextInput
                style={localStyles.input}
                placeholder="Confirm new password"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!showConfirmPassword}
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color={colors.placeholder}
                  style={localStyles.icon}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmNewPassword && <Text style={localStyles.errorText}>{errors.confirmNewPassword}</Text>}
          </View>

          <TouchableOpacity style={localStyles.signInButton} onPress={handleResetPassword}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              style={localStyles.signInButtonGradient}
              start={{ x: 0, y: 0.5 }} 
              end={{ x: 1, y: 0.5 }}
            >
              <Text style={localStyles.signInButtonText}>RESET PASSWORD</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <KeyboardAvoidingView style={localStyles.keyboardContainer} behavior="padding" enabled>
      <ScrollView contentContainerStyle={localStyles.scrollContainer} bounces={false}>
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={localStyles.headerBackground}>
          <Text style={localStyles.headerTitle}>Hello,</Text>
          <Text style={localStyles.headerSubtitle}>Sign in!</Text>
        </LinearGradient>

        <View style={localStyles.formContainer}>
          {!isForgotPassword ? (
            <>
              {errors.general && <Text style={localStyles.errorText}>{errors.general}</Text>}

              <View style={localStyles.inputContainer}>
                <Text style={localStyles.label}>Email</Text>
                <View style={localStyles.inputWrapper}>
                  <TextInput
                    style={localStyles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                  />
                  {email.length > 0 && <Ionicons name="checkmark-circle" size={20} color="green" style={localStyles.icon} />}
                </View>
                {errors.email && <Text style={localStyles.errorText}>{errors.email}</Text>}
              </View>

              <View style={localStyles.inputContainer}>
                <Text style={localStyles.label}>Password</Text>
                <View style={localStyles.passwordContainer}>
                  <TextInput
                    style={localStyles.input}
                    placeholder="••••••••"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color={colors.placeholder}
                      style={localStyles.icon}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={localStyles.errorText}>{errors.password}</Text>}
              </View>

              <TouchableOpacity>
                <Text style={localStyles.forgotPasswordText} onPress={() => setIsForgotPassword(true)}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={localStyles.signInButton} onPress={handleLogin}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  style={localStyles.signInButtonGradient}
                  start={{ x: 0, y: 0.5 }} 
                  end={{ x: 1, y: 0.5 }}
                >
                  <Text style={localStyles.signInButtonText}>SIGN IN</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={localStyles.signUpText}>Don’t have an account? <Text style={localStyles.signUpLink}>Sign Up</Text></Text>
              </TouchableOpacity>
            </>
          ) : (
            renderForgotPasswordStep()
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
