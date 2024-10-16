import React,{useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for icons
import { ProfileScreenStyles as styles } from '../styles/ProfileScreenStyles';
import { GlobalStyles } from '../styles/GlobalStyles';

const TrainerProfile = ({ route, navigation }) => {
  // Use a fallback to an empty object if route.params or user is undefined
  const { user = {} } = route.params || {};

  useEffect(() => {
    console.log('received data', user);
  }, [user]);

  const handleSettingsPress = () => {
    navigation.navigate('EditProfile', { user }); // Navigate to EditProfile screen
  };

  return (
    <ScrollView style={GlobalStyles.container2} contentContainerStyle={styles.scrollContainer}>
      {/* Profile Header */}
      <LinearGradient colors={[styles.gradientStart, styles.gradientEnd]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.profileHeader}>
      <View style={styles.profileHeaderContent}>
          {/* Use placeholder if dp is not available */}
          <Image source={{ uri: user.dp || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{user.name || 'N/A'}</Text>
            <Text style={styles.profileSpecialization}>{user.type || 'N/A'}</Text>
            <Text style={styles.profileLocation}>{user.location || 'N/A'}</Text>
            <Text style={styles.profileClients}>{user.clients ? `${user.clients} Clients` : 'No Clients'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
      </LinearGradient>

      {/* Gallery */}
      <View style={styles.gallerySection}>
        <Text style={styles.sectionTitle}>Gallery</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryScroll}>
          {(user.photos || []).map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.galleryImage} />
          ))}
        </ScrollView>
      </View>

      {/* Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detailText}>Languages: {user.languages ? user.languages.join(', ') : 'N/A'}</Text>
        <Text style={styles.detailText}>Expertise: {user.expertise || 'N/A'}</Text>
        <Text style={styles.detailText}>
          Rate per Month: {user.ratePerMonth ? `$${user.ratePerMonth}` : 'N/A'}
        </Text>
        <Text style={styles.detailText}>
          Distance: {user.distance ? `${user.distance} miles` : 'N/A'}
        </Text>
        {user.certification && (
          <Text style={styles.certificationBadge}>Certified</Text>
        )}
      </View>

      {/* Reviews */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {(user.reviews || []).map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <Text style={styles.reviewText}>{review.review}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TrainerProfile;
