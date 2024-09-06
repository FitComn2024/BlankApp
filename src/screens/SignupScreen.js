import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles as styles, colors } from '../styles/GlobalStyles'; // Import global styles and colors
import { SignupScreenStyles as localStyles } from '../styles/SignupScreenStyles';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';

// Separate pool data for clients and trainers
import clientPoolData from './ClientAmplifyConfig';
import trainerPoolData from './TrainerAmplifyConfig';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('client'); // Default to 'client'
  let cognitoUser = '';

  const validate = () => {
    let valid = true;
    let errors = {};

    if (fullName.length === 0) {
      errors.fullName = 'Full name is required';
      valid = false;
    }

    if (email.length === 0) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
      valid = false;
    }

    if (password.length === 0) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const signUp = async (email, password) => {
    const userPoolData = userType === 'client' ? clientPoolData : trainerPoolData;
    const userPool = new CognitoUserPool(userPoolData);

    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: email,
    };

    try {
      const attributeEmail = new CognitoUserAttribute(dataEmail);
      attributeList.push(attributeEmail);
      userPool.signUp(email, password, attributeList, null, async function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());

        // Save the user record to DynamoDB via API Gateway
        await createUserRecord({
          username: cognitoUser.getUsername(),
          fullName,
          email,
          userType,
        });

        setIsConfirmationStep(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createUserRecord = async (user) => {
    try {
      const response = await fetch('https://ma2rlmdv7b.execute-api.us-east-1.amazonaws.com/dev/CreateUserFunction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log('User created successfully in DynamoDB:', data);
    } catch (error) {
      console.error('Error creating user in DynamoDB:', error);
    }
  };

  const confirmSignUp = async (email, code) => {
    const userPoolData = userType === 'client' ? clientPoolData : trainerPoolData;
    const userPool = new CognitoUserPool(userPoolData);

    const userData = {
      Username: email,
      Pool: userPool,
    };

    cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
      navigation.navigate('SignIn');
    });
  };

  const handleSignup = async () => {
    if (validate()) {
      await signUp(email, password);
    }
  };

  const handleConfirmCode = async () => {
    try {
      await confirmSignUp(email, confirmationCode);
      console.log('Confirmation successful');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error confirming sign-up:', error);
      setErrors({ confirmationCode: 'Invalid confirmation code. Please try again.' });
      setIsConfirmationStep(false);
    }
  };

  const resendConfirmationCode = async () => {
    try {
      cognitoUser.resendConfirmationCode(function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log('call result: ' + result);
      });
    } catch (error) {
      console.log('Error resending confirmation code:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={localStyles.keyboardContainer} behavior="padding" enabled>
      <ScrollView contentContainerStyle={localStyles.scrollContainer} bounces={false}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={localStyles.headerBackground}
          start={{ x: 0, y: 0.5 }} 
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={localStyles.headerTitle}>Create Your</Text>
          <Text style={localStyles.headerSubtitle}>Account</Text>
        </LinearGradient>

        <View style={localStyles.formContainer}>
          {!isConfirmationStep ? (
            <>
              {/* User Type Selection */}
              <View style={localStyles.inputContainer}>
                <Text style={localStyles.label}>I am a</Text>
                <View style={localStyles.radioGroupRow}>
                  <TouchableOpacity
                    style={localStyles.radioButton}
                    onPress={() => setUserType('client')}
                  >
                    <Ionicons
                      name={userType === 'client' ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={localStyles.radioText}>Client</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={localStyles.radioButton}
                    onPress={() => setUserType('trainer')}
                  >
                    <Ionicons
                      name={userType === 'trainer' ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={localStyles.radioText}>Trainer</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={localStyles.inputContainer}>
                <Text style={localStyles.label}>Full Name</Text>
                <View style={localStyles.inputWrapper}>
                  <TextInput
                    style={localStyles.input}
                    placeholder="John Smith"
                    placeholderTextColor={colors.placeholder}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  {fullName.length > 0 && <Ionicons name="checkmark-circle" size={20} color="green" style={localStyles.icon} />}
                </View>
                {errors.fullName && <Text style={localStyles.errorText}>{errors.fullName}</Text>}
              </View>

              <View style={localStyles.inputContainer}>
                <Text style={localStyles.label}>Phone or Gmail</Text>
                <View style={localStyles.inputWrapper}>
                  <TextInput
                    style={localStyles.input}
                    placeholder="joydeo@gmail.com"
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

              <View style={localStyles.inputContainer}>
                <Text style={localStyles.label}>Confirm Password</Text>
                <View style={localStyles.passwordContainer}>
                  <TextInput
                    style={localStyles.input}
                    placeholder="••••••••"
                    placeholderTextColor={colors.placeholder}
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                {errors.confirmPassword && <Text style={localStyles.errorText}>{errors.confirmPassword}</Text>}
              </View>

              <TouchableOpacity style={localStyles.signUpButton} onPress={handleSignup}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  style={localStyles.signUpButtonGradient}
                  start={{ x: 0, y: 0.5 }} 
                  end={{ x: 1, y: 0.5 }}
                >
                  <Text style={localStyles.signUpButtonText}>SIGN UP</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={localStyles.confirmationText}>Please enter the confirmation code sent to your email.</Text>

              <View style={localStyles.inputContainer}>
                <Text style={localStyles.label}>Confirmation Code</Text>
                <TextInput
                  style={localStyles.input}
                  placeholder="Enter confirmation code"
                  placeholderTextColor={colors.placeholder}
                  value={confirmationCode}
                  onChangeText={setConfirmationCode}
                  keyboardType="number-pad"
                />
                {errors.confirmationCode && <Text style={localStyles.errorText}>{errors.confirmationCode}</Text>}
              </View>

              <TouchableOpacity style={localStyles.signUpButton} onPress={handleConfirmCode}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  style={localStyles.signUpButtonGradient}
                  start={{ x: 0, y: 0.5 }} 
                  end={{ x: 1, y: 0.5 }}
                >
                  <Text style={localStyles.signUpButtonText}>VERIFY CODE</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={localStyles.resendButton} onPress={() => resendConfirmationCode(email)}>
                <Text style={localStyles.resendButtonText}>Didn’t receive the code? Resend Code</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={localStyles.signInText}>Already have an account? <Text style={localStyles.signInLink}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
