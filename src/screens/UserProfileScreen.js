import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { UserProfileScreenStyles as styles } from '../styles/UserProfileScreenStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserProfileScreen = () => {
  const role = 'client';
  const userName = "John Doe";
  const userHeight = "180 cm";
  const userWeight = "75 kg";
  const userBMI = "23.1";
  const userCalories = 1800;
  const totalCalories = 2500;
  const userImage = null; // Assuming this comes from props or state; null means no image available

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
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView contentContainerStyle={GlobalStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {userImage ? (
            <FontAwesome name="user-circle" size={100} color={colors.primary} style={styles.profilePicture} />
          ) : (
            <FontAwesome name="user-circle" size={100} color={colors.primary} style={styles.profilePicture} /> // Placeholder icon
          )}
          <View style={styles.nameContainer}>
            <Text style={[GlobalStyles.heading1, styles.profileName]}>{userName}</Text>
            <TouchableOpacity>
              <MaterialIcons name="settings" size={25} color={colors.text} style={styles.settingsIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {role === 'client' ? (
          <>
            {/* User Statistics */}
            <View style={styles.statistics}>
              <Text style={GlobalStyles.text}>Height: {userHeight}</Text>
              <Text style={GlobalStyles.text}>Weight: {userWeight}</Text>
              <Text style={GlobalStyles.text}>BMI: {userBMI}</Text>
            </View>

            <View style={styles.caloriesContainer}>
              <Text style={GlobalStyles.text}>Calories:</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBar, styles.consumedBar, { width: `${(userCalories / totalCalories) * 100}%` }]} />
                  <View style={[styles.progressBar, styles.burnedBar, { width: `${(caloriesBurned / totalCalories) * 100}%` }]} />
                </View>
                <Text style={GlobalStyles.smallText}>Consumed: {userCalories} / Burned: {caloriesBurned}</Text>
              </View>
            </View>

            {/* Line Chart */}
            <View style={styles.graphContainer}>
              <Text style={GlobalStyles.heading2}>Weight Changes Over 30 Days</Text>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={weightData}
                  width={Dimensions.get('window').width * 1.5} // Wider for horizontal scrolling
                  height={220}
                  chartConfig={{
                    backgroundColor: colors.background,
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
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

            {/* Assigned Activities */}
            <View style={styles.activitiesContainer}>
              <Text style={GlobalStyles.heading2}>Assigned Activities</Text>
              {assignedActivities.map(activity => (
                <View key={activity.id} style={styles.activityItem}>
                  <Text style={GlobalStyles.text}>{activity.name}</Text>
                  <TouchableOpacity
                    style={[GlobalStyles.button, activity.completed && styles.activityButtonCompleted]}
                    onPress={() => handleCompleteActivity(activity.id)}
                    disabled={activity.completed}
                  >
                    <Text style={GlobalStyles.buttonText}>{activity.completed ? 'Completed' : 'Complete'}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        ) : (
          // Trainer's Clients Section
          <>
            <View style={styles.trainerSection}>
              <Text style={GlobalStyles.heading2}>Achievements</Text>
              <View style={styles.statLabelContainer}>
                <Text style={GlobalStyles.text}>Number of Clients: </Text>
                <Text style={GlobalStyles.text}>{clients.length}</Text>
              </View>
              <View style={styles.statLabelContainer}>
                <Text style={GlobalStyles.text}>Ratings: </Text>
                <Text style={GlobalStyles.text}>4.8</Text> 
              </View>
            </View>

            <View style={styles.clientsContainer}>
              <Text style={GlobalStyles.heading2}>Your Clients</Text>
              {clients.map(client => (
                <View key={client.id} style={styles.clientItem}>
                  <Text style={GlobalStyles.text}>{client.name}</Text>
                  <TouchableOpacity
                    style={GlobalStyles.button}
                    onPress={() => handleAssignActivity(client.id)}
                  >
                    <Text style={GlobalStyles.buttonText}>Assign Activity</Text>
                  </TouchableOpacity>
                  <Text style={GlobalStyles.smallText}>Progress: {client.progress}%</Text>
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