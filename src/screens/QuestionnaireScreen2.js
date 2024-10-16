import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { QuestionnaireScreenStyles as styles } from '../styles/QuestionnaireScreenStyles';

const QuestionnaireScreen2 = ({ navigation }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSecondSet, setIsSecondSet] = useState(false);
    const [userType, setUserType] = useState('trainer'); // Assume 'trainer' or 'client'
    
    // State to hold the number of questions in each set
    const totalFirstSetQuestions = 9; // Number of questions in the first set
    const totalSecondSetQuestions = userType === 'trainer' ? 3 : 6; // Number of questions in the second set

    // Form state variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');

    // Trainer-specific state hooks
    const [certifications, setCertifications] = useState('');
    const [experience, setExperience] = useState('');
    const [specialization, setSpecialization] = useState([]);
    const [price, setPrice] = useState('');
    const [gallery, setGallery] = useState([]);

    // Client-specific state hooks
    const [goal, setGoal] = useState('');
    const [weight, setWeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [height, setHeight] = useState('');
    const [healthCondition, setHealthCondition] = useState('');
    const [activityLevel, setActivityLevel] = useState('low');
    const [gymGoer, setGymGoer] = useState('yes');


    useEffect(() => {
        const fetchUserType = async () => {
          const userType = await SecureStore.getItemAsync('userType');
          console.log('userType', userType);
          setUserType(userType);
        };
    
        fetchUserType();
      }, []);

    // Handle date change for the date picker
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(false);
        setDob(currentDate);
    };

    const handleNextSet = () => {
        setIsSecondSet(true);
        setCurrentQuestionIndex(0); // Reset the question index for the second set
    };
  const handleMediaUpload = () => {
    // This is a placeholder function. Implement media upload functionality here.
    console.log('Media upload function called');
};
    // Get location and populate state, country, and zip code
    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let address = await Location.reverseGeocodeAsync(location.coords);
            if (address.length > 0) {
                setCountry(address[0].country || '');
                setState(address[0].region || '');
                setZipCode(address[0].postalCode || '');
            }
        };
        getLocation();
    }, []);

    // Function to move to the next question
    const goToNextQuestion = () => {
        if (!isSecondSet) {
            if (currentQuestionIndex < totalFirstSetQuestions - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Move to the second set of questions
                setIsSecondSet(true);
                setCurrentQuestionIndex(0);
            }
        } else {
            // Handle second set navigation
            if (currentQuestionIndex < totalSecondSetQuestions - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    // Function to move to the previous question
    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else if (isSecondSet) {
            setIsSecondSet(false);
            setCurrentQuestionIndex(totalFirstSetQuestions - 1);
        }
    };
    

    // Render first set of questions (common questions)
    const renderFirstSetQuestions = () => {
      switch (currentQuestionIndex) {
          case 0:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your first name?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="First Name"
                          placeholderTextColor="#888"
                          value={firstName}
                          onChangeText={setFirstName}
                      />
                  </View>
              );
          case 1:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your last name?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Last Name"
                          placeholderTextColor="#888"
                          value={lastName}
                          onChangeText={setLastName}
                      />
                  </View>
              );
              case 2:
                return (
                    <View>
                        <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your gender?</Text>
            
                        {/* Gender Dropdown */}
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5 }}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue) => setGender(itemValue)}
                                style={{ color: '#000' }}
                            >
                                <Picker.Item label="Male" value="male" />
                                <Picker.Item label="Female" value="female" />
                                <Picker.Item label="Other" value="other" />
                            </Picker>
                        </View>
                    </View>
                );
          case 3:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your phone number?</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ padding: 5, borderWidth: 1, borderColor: '#4c669f', marginRight: 5 }}>
                              <Text style={{ color: '#000' }}>+91</Text>
                          </View>
                          <TextInput
                              style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, flex: 1, color: '#000' }}
                              placeholder="Phone Number"
                              placeholderTextColor="#888"
                              value={phoneNumber}
                              onChangeText={setPhoneNumber}
                              keyboardType="phone-pad"
                          />
                      </View>
                  </View>
              );
          case 4:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your date of birth?</Text>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                          <Text style={{ color: '#000', padding: 5, borderBottomWidth: 1, borderBottomColor: '#4c669f' }}>
                              {dob.toDateString()}
                          </Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                          <DateTimePicker
                              value={dob}
                              mode="date"
                              display="default"
                              onChange={handleDateChange}
                          />
                      )}
                  </View>
              );
          case 5:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your street address?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Street"
                          placeholderTextColor="#888"
                          value={street}
                          onChangeText={setStreet}
                      />
                  </View>
              );
          case 6:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>Which state do you live in?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="State"
                          placeholderTextColor="#888"
                          value={state}
                          onChangeText={setState}
                      />
                  </View>
              );
          case 7:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>Which country do you live in?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Country"
                          placeholderTextColor="#888"
                          value={country}
                          onChangeText={setCountry}
                      />
                  </View>
              );
          case 8:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your zip code?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Zip Code"
                          placeholderTextColor="#888"
                          value={zipCode}
                          onChangeText={setZipCode}
                          keyboardType="numeric"
                      />
                  </View>
              );
          default:
              return null;
      }
  };


    // Render trainer-specific questions
    const renderTrainerQuestions = () => {
      switch (currentQuestionIndex) {
          case 0:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your specialization?</Text>
                      {/* Multiple Selection for Specializations */}
                      {['Strength Training', 'Weight Loss', 'Yoga', 'Nutrition'].map((item) => (
                          <TouchableOpacity 
                              key={item} 
                              onPress={() => {
                                  setSpecialization(prev =>
                                      prev.includes(item) 
                                          ? prev.filter(spec => spec !== item) 
                                          : [...prev, item]
                                  );
                              }}
                              style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}
                          >
                              <Icon
                                  name={specialization.includes(item) ? "checkbox" : "square-outline"}
                                  size={24}
                                  color="#4c669f"
                              />
                              <Text style={{ marginLeft: 10 }}>{item}</Text>
                          </TouchableOpacity>
                      ))}
                  </View>
              );
          case 1:
            return (
              <View>
                  <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your price per session?</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000', flex: 1 }}
                          placeholder="Price"
                          placeholderTextColor="#888"
                          value={price}
                          onChangeText={setPrice}
                          keyboardType="numeric"
                      />
                  </View>
              </View>
          );
          case 2:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>Certifications</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Certifications"
                          placeholderTextColor="#888"
                          value={certifications}
                          onChangeText={setCertifications}
                      />
                  </View>
              );
          case 3:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>Experience (in years)</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Experience"
                          placeholderTextColor="#888"
                          value={experience}
                          onChangeText={setExperience}
                          keyboardType="numeric"
                      />
                  </View>
              );
        //   case 4:
        //       return (
        //           <View>
        //               <Text style={{ color: '#4c669f', fontSize: 18 }}>Upload your gallery/media</Text>
        //               <TouchableOpacity onPress={handleMediaUpload} style={{ padding: 10, backgroundColor: '#4c669f', borderRadius: 5 }}>
        //                   <Text style={{ color: '#fff', textAlign: 'center' }}>Upload Media</Text>
        //               </TouchableOpacity>
        //           </View>
        //       );
          default:
              return null;
      }
  };

    // Render client-specific questions
    const renderClientQuestions = () => {
      switch (currentQuestionIndex) {
          case 0:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your goal?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Your goal"
                          placeholderTextColor="#888"
                          value={goal}
                          onChangeText={setGoal}
                      />
                  </View>
              );
          case 1:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your weight?</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <TextInput
                              style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000', flex: 1 }}
                              placeholder="Weight"
                              placeholderTextColor="#888"
                              value={weight}
                              onChangeText={setWeight}
                              keyboardType="numeric"
                          />
                          <Picker
                              selectedValue={weightUnit}
                              onValueChange={(itemValue) => setWeightUnit(itemValue)}
                              style={{ color: '#000', marginLeft: 10 }}
                          >
                              <Picker.Item label="Kg" value="kg" />
                              <Picker.Item label="Lbs" value="lbs" />
                          </Picker>
                      </View>
                  </View>
              );
          case 2:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your height?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Height"
                          placeholderTextColor="#888"
                          value={height}
                          onChangeText={setHeight}
                          keyboardType="numeric"
                      />
                  </View>
              );
          case 3:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>Any health conditions or medical conditions?</Text>
                      <TextInput
                          style={{ borderBottomWidth: 1, borderBottomColor: '#4c669f', padding: 5, color: '#000' }}
                          placeholder="Health conditions"
                          placeholderTextColor="#888"
                          value={healthCondition}
                          onChangeText={setHealthCondition}
                          multiline
                      />
                  </View>
              );
          case 4:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>What's your activity level?</Text>
                      <Picker
                          selectedValue={activityLevel}
                          onValueChange={(itemValue) => setActivityLevel(itemValue)}
                          style={{ color: '#000' }}
                      >
                          <Picker.Item label="Low" value="low" />
                          <Picker.Item label="Mid" value="mid" />
                          <Picker.Item label="High" value="high" />
                      </Picker>
                  </View>
              );
          case 5:
              return (
                  <View>
                      <Text style={{ color: '#4c669f', fontSize: 18 }}>Are you a gym goer?</Text>
                      <Picker
                          selectedValue={gymGoer}
                          onValueChange={(itemValue) => setGymGoer(itemValue)}
                          style={{ color: '#000' }}
                      >
                          <Picker.Item label="Yes" value="yes" />
                          <Picker.Item label="No" value="no" />
                      </Picker>
                  </View>
              );
          default:
              return null;
      }
  };

    // Render questions based on current state
    const renderQuestion = () => {
        if (!isSecondSet) {
            return renderFirstSetQuestions();
        } else {
            return userType === 'trainer' ? renderTrainerQuestions() : renderClientQuestions();
        }
    };

    const handleSubmit = () => {
        const collectedAnswers = {
            firstName,
            lastName,
            gender,
            phoneNumber,
            dob: dob.toDateString(),
            street,
            state,
            country,
            zipCode,
            ...(userType === 'trainer' && {
                specialization,
                price,
                certifications,
                experience,
                gallery,
            }),
            ...(userType === 'client' && {
                goal,
                weight,
                weightUnit,
                height,
                healthCondition,
                activityLevel,
                gymGoer,
            }),
        };
    
        console.log('Collected Answers:', collectedAnswers);
        
        // Navigate to the profile page (Replace 'UserProfileScreen' with the correct profile screen name in your app)
        navigation.navigate('UserProfile');
    };

    // Calculate progress bar width
    const totalQuestions = isSecondSet ? totalSecondSetQuestions : totalFirstSetQuestions;
    const progressWidth = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;

    return (
        <SafeAreaView style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.header}>
                <Text style={styles.headerText}>Basic Info</Text>
            </LinearGradient>

            {/* Progress Bar */}
            <View style={styles.progressBarBackground}>
                <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
            </View>

            {/* Question and Arrows Container */}
            <View style={styles.questionWrapper}>
                <View style={styles.questionContainer}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal showsHorizontalScrollIndicator={false}>
                        {renderQuestion()}
                    </ScrollView>
                </View>

                {/* Next and Back Arrows */}
                <View style={styles.arrowContainer}>
                    {currentQuestionIndex > 0 && (
                        <TouchableOpacity onPress={goToPreviousQuestion} style={styles.arrowButton}>
                            <Icon name="arrow-back" size={24} color="#4c669f" />
                        </TouchableOpacity>
                    )}

                    {!isSecondSet && currentQuestionIndex < totalFirstSetQuestions - 1 && (
                        <TouchableOpacity onPress={goToNextQuestion} style={styles.arrowButton}>
                            <Icon name="arrow-forward" size={24} color="#4c669f" />
                        </TouchableOpacity>
                    )}

                    {!isSecondSet && currentQuestionIndex === totalFirstSetQuestions - 1 && (
                        <TouchableOpacity onPress={handleNextSet} style={styles.arrowButton}>
                            <Text style={{ color: '#4c669f', fontSize: 18 }}>Next</Text>
                        </TouchableOpacity>
                    )}

                    {isSecondSet && currentQuestionIndex < totalSecondSetQuestions - 1 && (
                        <TouchableOpacity onPress={goToNextQuestion} style={styles.arrowButton}>
                            <Icon name="arrow-forward" size={24} color="#4c669f" />
                        </TouchableOpacity>
                    )}

                    {isSecondSet && currentQuestionIndex === totalSecondSetQuestions - 1 && (
                        <TouchableOpacity onPress={handleSubmit} style={styles.arrowButton}>
                            <Text style={{ color: '#4c669f', fontSize: 18 }}>Submit</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default QuestionnaireScreen2;