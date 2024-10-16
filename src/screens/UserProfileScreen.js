import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { UserProfileScreenStyles as styles } from '../styles/UserProfileScreenStyles';
import { URI } from '../data/URI';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const screenWidth = Dimensions.get('window').width;

const UserProfileScreen = ({ route, navigation }) => {

  const [userType, setUserType] = useState('client')
  
  useEffect(() => {
    const fetchUserType = async () => {
      const typeOfUser = await SecureStore.getItemAsync('userType');
      console.log('userType', userType);
      setUserType(typeOfUser);
    };

    fetchUserType();
  }, []);

  const [user, setUser] = useState({
    name: 'John Doe',
    age: 30,
    location: 'New York, USA',
    specialization: 'Strength Training',
    certifications: ['Certified Trainer'],
    rating: 4.8,
    reviews: ['Great trainer!', 'Very helpful.'],
    clients: ['Client A', 'Client B'],
    images: [
      require('../../assets/images/sample_gallery_image.jpeg'),
      require('../../assets/images/sample_gallery_image.jpeg'),
      require('../../assets/images/sample_gallery_image.jpeg'),
    ],
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [isBioExpanded, setBioExpanded] = useState(false);
  const [isGoalsExpanded, setGoalsExpanded] = useState(false);
  const [isSpecializationExpanded, setSpecializationExpanded] = useState(false);
  const [isCertificationsExpanded, setCertificationsExpanded] = useState(false);
  const [isClientsExpanded, setClientsExpanded] = useState(false);
  const [isRatingExpanded, setRatingExpanded] = useState(false);

  // Corrected useEffect hook to fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await SecureStore.getItemAsync('userId');
        const token = await SecureStore.getItemAsync('idToken'); // Get token from storage
        const userType = await SecureStore.getItemAsync('userType');
  
        // Build the request configuration
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${URI.URL}${URI.ENDPOINTS.GET_TRAINERS_DETAILS}${storedUserId}`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'UserType' : userType
          },
        };
        
        // Perform the GET request
        const response = await axios.request(config);
        
        // Log the response and update user state
        console.log("User data fetched successfully:", response.data);
        // setUser(response.data); // Assuming response.data has user details
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
  
    fetchUserData(); // Call the async function
  
    // Optionally, if you need cleanup, return a cleanup function here
    return () => {
      // Cleanup function if necessary
    };
  }, []);
  

  const toggleSection = (isExpanded, setExpanded) => {
    setExpanded(!isExpanded);
  };

  const openModal = (index) => {
    setActiveImageIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % user.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? user.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gradient Header with Profile Info */}
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Image source={require('../../assets/images/sample_gallery_image.jpeg')} style={styles.profileImage} />
          <View style={styles.headerText}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userDetails}>{user.age} years old</Text>
            <Text style={styles.userDetails}>{user.location}</Text>
          </View>
        </View>
        {/* Settings Icon */}
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('EditProfileScreen', { user })}>
          <Ionicons name="settings" size={25} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Gallery Section */}
      <Text style={styles.sectionTitle}>Gallery</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
        {user.images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(index)}>
            <Image source={image} style={styles.galleryImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for Image Carousel */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.arrowButtonLeft} onPress={handlePrevImage}>
            <Ionicons name="chevron-back" size={40} color="white" />
          </TouchableOpacity>

          <Image source={user.images[activeImageIndex]} style={styles.modalImage} />

          <TouchableOpacity style={styles.arrowButtonRight} onPress={handleNextImage}>
            <Ionicons name="chevron-forward" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Collapsible Sections */}
      {/* Bio Section */}
      <TouchableOpacity style={styles.collapsibleHeader} onPress={() => toggleSection(isBioExpanded, setBioExpanded)}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <Ionicons name={isBioExpanded ? "remove" : "add"} size={20} />
      </TouchableOpacity>
      {isBioExpanded && (
        <View style={styles.collapsibleContent}>
          <Text style={styles.sectionText}>Bio details here...</Text>
        </View>
      )}
      <View style={styles.separator} />

      {/* Goals and other sections */}
      {userType === 'client' ? (
        <>
          {/* Goals Section */}
          <TouchableOpacity style={styles.collapsibleHeader} onPress={() => toggleSection(isGoalsExpanded, setGoalsExpanded)}>
            <Text style={styles.sectionTitle}>Goals</Text>
            <Ionicons name={isGoalsExpanded ? "remove" : "add"} size={20} />
          </TouchableOpacity>
          {isGoalsExpanded && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.sectionText}>Goal 1: Weight Loss</Text>
              <Text style={styles.sectionText}>Goal 2: Increase Muscle Mass</Text>
            </View>
          )}
        </>
      ) : (
        <>
          {/* Specialization Section */}
          <TouchableOpacity style={styles.collapsibleHeader} onPress={() => toggleSection(isSpecializationExpanded, setSpecializationExpanded)}>
            <Text style={styles.sectionTitle}>Specialization</Text>
            <Ionicons name={isSpecializationExpanded ? "remove" : "add"} size={20} />
          </TouchableOpacity>
          {isSpecializationExpanded && (
            <View style={styles.collapsibleContent}>
              <Text style={styles.sectionText}>{user.specialization}</Text>
            </View>
          )}
          <View style={styles.separator} />

          {/* Certifications Section */}
          <TouchableOpacity style={styles.collapsibleHeader} onPress={() => toggleSection(isCertificationsExpanded, setCertificationsExpanded)}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <Ionicons name={isCertificationsExpanded ? "remove" : "add"} size={20} />
          </TouchableOpacity>
          {isCertificationsExpanded && (
            <View style={styles.collapsibleContent}>
              {user.certifications.map((cert, index) => (
                <Text key={index} style={styles.sectionText}>{cert}</Text>
              ))}
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default UserProfileScreen;
