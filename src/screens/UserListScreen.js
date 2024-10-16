import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { HomeDashboardScreenStyles as styles } from '../styles/HomeDashboardScreenStyles';
import { GlobalStyles } from '../styles/GlobalStyles';
import * as SecureStore from 'expo-secure-store';

const UserListScreen = ({ route, navigation }) => {
  const { title, users } = route.params;
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
        {users.map((user) => (
          <TouchableOpacity 
            key={user.id} 
            style={styles.profileCardContainer} 
            onPress={() => handleCardPress(user)}
          >
            <View style={styles.profileCard}>
              <Image source={{ uri: 'https://via.placeholder.com/60' }} style={styles.profileImage} />
              <Text style={GlobalStyles.text}>{user.name}</Text>
              <Text style={GlobalStyles.text}>Type: {user.type}</Text>
              <Text style={GlobalStyles.text}>Location: {user.location}</Text>
              <Text style={GlobalStyles.text}>Rating: {user.rating}</Text>
              {user.certification && <Text style={styles.certificationBadge}>Certified</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserListScreen;
