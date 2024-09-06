import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeDashboardScreenStyles as styles } from '../styles/HomeDashboardScreenStyles';
import { GlobalStyles } from '../styles/GlobalStyles';
import { SampleUsersTrainers as sampleTrainers } from '../data/SampleUsersTrainers';
import { SampleUsersClients as sampleClients } from '../data/SampleUsersClients';

const HomeDashboardScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('Trainer'); // State to toggle between Client and Trainer
  const userName = "John Doe"; // Replace with dynamic user name as needed

  const handleSeeAll = (title, filterFn) => {
    const filteredUsers = userType === 'Client' 
      ? sampleTrainers.filter(filterFn) 
      : sampleClients.filter(filterFn);
  
    if (userType === 'Client') {
      navigation.navigate('UserList', { title, users: filteredUsers.length ? filteredUsers : [] });
    } else {
      navigation.navigate('ClientList', { title, clients: filteredUsers.length ? filteredUsers : [] });
    }
  };

  const handleCardPress = (user) => {
    if (userType === 'Client') {
      navigation.navigate('TrainerProfile', { user });
    } else {
      var client = user
      navigation.navigate('ClientProfile', { client });
    }
  };

  const filters = userType === 'Client' 
    ? ['Highest rated Trainers', 'Trainers near me', 'Certified Trainers', 'Nutritionists']
    : ['Clients near me', 'Weight loss clients', 'weight gain clients', 'Gym Goers', 'Non Gym Goers'];

  const sampleUsers = userType === 'Client' ? sampleTrainers : sampleClients;

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Top Bar Section */}
      <View style={styles.topBar}>
        <TextInput
          style={[GlobalStyles.input, styles.searchBar]}
          placeholder="Search for profiles or content"
          placeholderTextColor={styles.placeholderTextColor}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => { /* Handle filter action */ }}>
          <Icon name="filter" size={24} color={styles.iconColor || "#BBBBBB"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => { /* Handle sort action */ }}>
          <Icon name="swap-vertical" size={24} color={styles.iconColor || "#BBBBBB"} />
        </TouchableOpacity>
      </View>

      <Text style={GlobalStyles.heading1}>Welcome back, {userName}!</Text>

      {/* Toggle between Client and Trainer */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          onPress={() => setUserType('Client')} 
          style={[styles.toggleButton, userType === 'Client' && styles.activeToggle]}
        >
          <Text style={styles.toggleButtonText}>Client</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setUserType('Trainer')} 
          style={[styles.toggleButton, userType === 'Trainer' && styles.activeToggle]}
        >
          <Text style={styles.toggleButtonText}>Trainer</Text>
        </TouchableOpacity>
      </View>

      {/* User Profile Sections */}
      {filters.map((filterTitle, index) => (
        <View style={styles.section} key={index}>
          <View style={styles.sectionHeader}>
            <Text style={GlobalStyles.heading2}>{filterTitle}</Text>
            <TouchableOpacity onPress={() => handleSeeAll(filterTitle, () => true)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.row}>
              {sampleUsers.map((user) => (
                <TouchableOpacity key={user.userId} style={styles.profileCard} onPress={() => handleCardPress(user)}>
                  <Image source={{ uri: user.dp }} style={styles.profileImage} />
                  <Text style={GlobalStyles.text}>{user.name}</Text>
                  <Text style={GlobalStyles.text}>Location: {user.location}</Text>
                  {userType === 'Client' ? (
                    <>
                      <Text style={GlobalStyles.text}>Rating: {user.rating}</Text>
                      <Text style={GlobalStyles.text}>Type: {user.type}</Text>
                      {user.certification && <Text style={styles.certificationBadge}>Certified</Text>}
                    </>
                  ) : (
                    <>
                      <Text style={GlobalStyles.text}>Goal: {user.goal}</Text>
                      <Text style={GlobalStyles.text}>{user.isGymGoer ? "Gym Goer" : "Non-Gym Goer"}</Text>
                    </>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}

      {/* Upcoming Events and Recent Activities Sections */}
      <View style={styles.section}>
        <Text style={GlobalStyles.heading2}>Upcoming Events</Text>
        {/* Schedule List and Reminders go here */}
      </View>

      <View style={styles.section}>
        <Text style={GlobalStyles.heading2}>Recent Activities</Text>
        {/* Activity Feed Items go here */}
      </View>
    </ScrollView>
  );
};

export default HomeDashboardScreen;
