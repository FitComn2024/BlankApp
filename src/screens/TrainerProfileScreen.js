import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
import { ProfileScreenStyles as styles } from '../styles/ProfileScreenStyles';
import { GlobalStyles } from '../styles/GlobalStyles';

const TrainerProfile = ({ route, navigation }) => {
  const { user } = route.params;

  const handleSettingsPress = () => {
    navigation.navigate('EditProfile', { user }); // Navigate to EditProfile screen
  };

  return (
    <ScrollView style={GlobalStyles.container2} contentContainerStyle={styles.scrollContainer}>
      {/* Profile Header */}
      <LinearGradient colors={[styles.gradientStart, styles.gradientEnd]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.profileHeader}>
        <View style={styles.profileHeaderContent}>
          <Image source={{ uri: user.dp }} style={styles.profileImage} />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileSpecialization}>{user.type}</Text>
            <Text style={styles.profileLocation}>{user.location}</Text>
            <Text style={styles.profileClients}>{user.clients} Clients</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Gallery */}
      <View style={styles.gallerySection}>
        <Text style={styles.sectionTitle}>Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryScroll}>
          {user.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>

      {/* Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detailText}>Languages: {user.languages.join(', ')}</Text>
        <Text style={styles.detailText}>Expertise: {user.expertise}</Text>
        <Text style={styles.detailText}>Rate per Month: ${user.ratePerMonth}</Text>
        <Text style={styles.detailText}>Distance: {user.distance} miles</Text>
        {user.certification && <Text style={styles.certificationBadge}>Certified</Text>}
      </View>

      {/* Reviews */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {user.reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.reviewText}>{review.review}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TrainerProfile;
