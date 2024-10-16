import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { HomeDashboardScreenStyles as styles } from '../styles/HomeDashboardScreenStyles';
import { GlobalStyles } from '../styles/GlobalStyles';
import * as SecureStore from 'expo-secure-store';

const ClientListScreen = ({ route, navigation }) => {
  const { title, clients =[] } = route.params;

  const [userType, setUserType] = useState('client')
  
  useEffect(() => {
    const fetchUserType = async () => {
      const typeOfUser = await SecureStore.getItemAsync('userType');
      console.log('userType', userType);
      setUserType(typeOfUser);
    };

    fetchUserType();
  }, []);

  const handleCardPress = (user) => {
    console.log('passing data', user);
    if (userType === 'client') {
      // Navigate to TrainerProfile screen for a client viewing a trainer's profile
      navigation.navigate('TrainerProfile', { user });
    } else {
      // Navigate to ClientProfile screen for a trainer viewing a client's profile
      navigation.navigate('ClientProfile', { client: user });
    }
  };

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={styles.scrollContainer}>
      <Text style={GlobalStyles.heading1}>{title}</Text>

      <View style={styles.row}>
        {clients.map((client) => (
          <TouchableOpacity 
            key={client.userId} 
            style={styles.profileCardContainer} 
            onPress={() => handleCardPress(client)}
          >
            <View style={styles.profileCard}>
              <Image source={{ uri: client.dp }} style={styles.profileImage} />
              <Text style={GlobalStyles.text}>{client.name}</Text>
              <Text style={GlobalStyles.text}>Location: {client.location}</Text>
              <Text style={GlobalStyles.text}>Goal: {client.goal}</Text>
              <Text style={GlobalStyles.text}>Gym Goer: {client.isGymGoer ? 'Yes' : 'No'}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ClientListScreen;
