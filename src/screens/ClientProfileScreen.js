import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { ClientProfileScreenStyles as styles } from '../styles/ClientProfileScreenStyles';
import { GlobalStyles, colors } from '../styles/GlobalStyles';

const ClientProfileScreen = ({ route, navigation }) => {
  const { client={} } = route.params || {};
  useEffect(() => {
    console.log('received data', client);
  }, [client]);
  const [personalInfoExpanded, setPersonalInfoExpanded] = useState(false);
  const [gymRoutineExpanded, setGymRoutineExpanded] = useState(false);
  const [nonGymRoutineExpanded, setNonGymRoutineExpanded] = useState(false);

  const toggleSection = (section) => {
    if (section === 'personal') {
      setPersonalInfoExpanded(!personalInfoExpanded);
    } else if (section === 'gymRoutine') {
      setGymRoutineExpanded(!gymRoutineExpanded);
    } else if (section === 'nonGymRoutine') {
      setNonGymRoutineExpanded(!nonGymRoutineExpanded);
    }
  };

  const handleMessagePress = () => {
    navigation.navigate('Messaging', { userId: client.userId, userName: client.name });
  };

  return (
    <ScrollView style={GlobalStyles.container3} contentContainerStyle={styles.scrollContainer}>
      {/* Profile Header with Gradient */}
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.headerContainer}>
      <View style={styles.profileHeaderContent}>
        <Image source={{ uri: client.dp }} style={styles.profileImage} />
        <View style={styles.headerDetails}>
          <Text style={styles.clientName}>{client.name}</Text>
          <Text style={styles.location}>Location: {client.location}</Text>
          <Text style={styles.goal}>Goal: {client.goal}</Text>
          </View>
        </View>
          <TouchableOpacity style={styles.messageButton} onPress={handleMessagePress}>
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
      </LinearGradient>

      {/* Gallery Section */}
      {client.photos && client.photos.length > 0 && (
        <View style={styles.galleryContainer}>
          <Text style={GlobalStyles.heading2}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {client.photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.galleryImage} />
            ))}
          </ScrollView>
        </View>
      )}

      {/* Personal Information Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('personal')}>
        <Text style={GlobalStyles.heading2}>Personal Information</Text>
        <Icon name={personalInfoExpanded ? 'remove-circle-outline' : 'add-circle-outline'} size={24} color={styles.iconColor} />
      </TouchableOpacity>
      {personalInfoExpanded && (
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>Date of Birth: {client.dob}</Text>
          <Text style={styles.sectionText}>Gender: {client.gender}</Text>
          <Text style={styles.sectionText}>Height: {client.height} cm</Text>
          <Text style={styles.sectionText}>Weight: {client.weight} kg</Text>
          <Text style={styles.sectionText}>Languages: {client.languages.join(', ')}</Text>
        </View>
      )}

      {/* Gym Routine Section (if Gym Goer) */}
      {client.isGymGoer && (
        <>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('gymRoutine')}>
            <Text style={GlobalStyles.heading2}>Gym Routine</Text>
            <Icon name={gymRoutineExpanded ? 'remove-circle-outline' : 'add-circle-outline'} size={24} color={styles.iconColor} />
          </TouchableOpacity>
          {gymRoutineExpanded && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>Frequency: {client.gymGoerQuestions.frequency}</Text>
              <Text style={styles.sectionText}>Workout Type: {client.gymGoerQuestions.workoutType}</Text>
              <Text style={styles.sectionText}>Personal Trainer: {client.gymGoerQuestions.personalTrainer}</Text>
              <Text style={styles.sectionText}>Preferred Equipment: {client.gymGoerQuestions.preferredEquipment}</Text>
              <Text style={styles.sectionText}>Workout Structure: {client.gymGoerQuestions.workoutStructure}</Text>
              <Text style={styles.sectionText}>Main Focus: {client.gymGoerQuestions.mainFocus}</Text>
              <Text style={styles.sectionText}>Track Progress: {client.gymGoerQuestions.trackProgress}</Text>
              <Text style={styles.sectionText}>Gym Satisfaction: {client.gymGoerQuestions.gymSatisfaction}</Text>
              <Text style={styles.sectionText}>Diet: {client.gymGoerQuestions.diet}</Text>
              <Text style={styles.sectionText}>Short Term Goals: {client.gymGoerQuestions.shortTermGoals}</Text>
            </View>
          )}
        </>
      )}

      {/* Non-Gym Routine Section (if Non-Gym Goer) */}
      {!client.isGymGoer && (
        <>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('nonGymRoutine')}>
            <Text style={GlobalStyles.heading2}>Non-Gym Routine</Text>
            <Icon name={nonGymRoutineExpanded ? 'remove-circle-outline' : 'add-circle-outline'} size={24} color={styles.iconColor} />
          </TouchableOpacity>
          {nonGymRoutineExpanded && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionText}>Activity Type: {client.nonGymGoerQuestions.activityType}</Text>
              <Text style={styles.sectionText}>Frequency: {client.nonGymGoerQuestions.frequency}</Text>
              <Text style={styles.sectionText}>Workout Type: {client.nonGymGoerQuestions.workoutType}</Text>
              <Text style={styles.sectionText}>Fitness Apps: {client.nonGymGoerQuestions.fitnessApps}</Text>
              <Text style={styles.sectionText}>Home Equipment: {client.nonGymGoerQuestions.homeEquipment}</Text>
              <Text style={styles.sectionText}>Motivation: {client.nonGymGoerQuestions.motivation}</Text>
              <Text style={styles.sectionText}>Diet: {client.nonGymGoerQuestions.diet}</Text>
              <Text style={styles.sectionText}>Challenges: {client.nonGymGoerQuestions.challenges}</Text>
              <Text style={styles.sectionText}>Progress Measurement: {client.nonGymGoerQuestions.progressMeasurement}</Text>
              <Text style={styles.sectionText}>Short Term Goals: {client.nonGymGoerQuestions.shortTermGoals}</Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ClientProfileScreen;
