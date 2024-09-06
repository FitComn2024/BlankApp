import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';

import { UserProfileScreenStyles as styles } from '../styles/UserProfileScreenStyles';

const UserProfileScreen = () => {
  const role = 'client';
  const userName = "John Doe";
  const userHeight = "180 cm";
  const userWeight = "75 kg";
  const userBMI = "23.1";
  const userCalories = 1800;
  const totalCalories = 2500;

  const [caloriesBurned, setCaloriesBurned] = useState(500);
  const [assignedActivities, setAssignedActivities] = useState([
    { id: 1, name: '30 minutes of running', calories: 300, completed: false },
    { id: 2, name: '15 minutes of strength training', calories: 200, completed: false },
  ]);
  
  const [clients, setClients] = useState([
    { id: 1, name: 'Client A', progress: 50 },
    { id: 2, name: 'Client B', progress: 30 },
  ]);

  // Dummy weight data for 30 days
  const weightData = {
    labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()), // Days 1 to 30
    datasets: [
      {
        data: [75, 74, 76, 75, 74, 73, 74, 75, 76, 75, 77, 76, 75, 74, 73, 72, 73, 74, 75, 76, 77, 78, 77, 76, 75, 74, 73, 72, 71, 70], // Example weights
        strokeWidth: 2, // Optional
      },
    ],
  };

  const handleCompleteActivity = (activityId) => {
    const updatedActivities = assignedActivities.map(activity => {
      if (activity.id === activityId) {
        setCaloriesBurned(caloriesBurned + activity.calories);
        return { ...activity, completed: true };
      }
      return activity;
    });
    setAssignedActivities(updatedActivities);
    Alert.alert('Activity Completed', 'Great job on completing the activity!');
  };

  const handleAssignActivity = (clientId) => {
    Alert.alert('Assign Activity', `Assign activity to Client ${clientId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/hero-image.png')} style={styles.profilePicture} />
          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{userName}</Text>
            <TouchableOpacity>
              <Image source={require('../../assets/images/react-logo.png')} style={styles.settingsIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {role === 'client' ? (
          <>
            {/* Existing user statistics and activities code... */}
            <View style={styles.statistics}>
              <Text style={styles.statLabel}>Height:</Text>
              <Text style={styles.statValue}>{userHeight}</Text>
              <Text style={styles.statLabel}>Weight:</Text>
              <Text style={styles.statValue}>{userWeight}</Text>
              <Text style={styles.statLabel}>BMI:</Text>
              <Text style={styles.statValue}>{userBMI}</Text>
              <Text style={styles.statLabel}>Calories:</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBar, styles.consumedBar, { width: `${(userCalories / totalCalories) * 100}%` }]} />
                  <View style={[styles.progressBar, styles.burnedBar, { width: `${(caloriesBurned / totalCalories) * 100}%` }]} />
                </View>
                <Text style={styles.caloriesText}>Consumed: {userCalories} / Burned: {caloriesBurned}</Text>
              </View>
            </View>

            {/* Line Chart */}
            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Weight Changes Over 30 Days</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={weightData}
                  width={Dimensions.get('window').width * 1.5} // Wider for horizontal scrolling
                  height={220}
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </ScrollView>
            </View>

            {/* Existing assigned activities code... */}
            <View style={styles.activitiesContainer}>
              <Text style={styles.sectionTitle}>Assigned Activities</Text>
              {assignedActivities.map(activity => (
                <View key={activity.id} style={styles.activityItem}>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <TouchableOpacity
                    style={[styles.activityButton, activity.completed && styles.activityButtonCompleted]}
                    onPress={() => handleCompleteActivity(activity.id)}
                    disabled={activity.completed}
                  >
                    <Text style={styles.buttonText}>{activity.completed ? 'Completed' : 'Complete'}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        ) : (
          // Existing trainer code...
          <>
            <View style={styles.trainerSection}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <View style={styles.statLabelContainer}>
                <Text style={styles.statLabel}>Number of Clients: </Text>
                <Text style={styles.statValue}>{clients.length}</Text>
              </View>
              <View style={styles.statLabelContainer}>
                <Text style={styles.statLabel}>Ratings: </Text>
                <Text style={styles.statValue}>4.8</Text> 
              </View>
            </View>

            <View style={styles.clientsContainer}>
              <Text style={styles.sectionTitle}>Your Clients</Text>
              {clients.map(client => (
                <View key={client.id} style={styles.clientItem}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <TouchableOpacity
                    style={styles.assignButton}
                    onPress={() => handleAssignActivity(client.id)}
                  >
                    <Text style={styles.buttonText}>Assign Activity</Text>
                  </TouchableOpacity>
                  <Text style={styles.clientProgress}>Progress: {client.progress}%</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
