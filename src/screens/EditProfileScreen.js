import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect for navigation listener
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'; 
import * as ImageManipulator from 'expo-image-manipulator'; 
import Icon from 'react-native-vector-icons/Ionicons'; 
import { Picker } from '@react-native-picker/picker';
import { EditProfileScreenStyles as styles } from '../styles/EditProfileScreenStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur'; // Import BlurView


const EditProfileScreen = ({ route, navigation }) => {
  const { userName, userHeight, userWeight, userEmail, userProfileImage } = route.params;

  // Existing states
  const [name, setName] = useState(userName);
  const [height, setHeight] = useState(userHeight);
  const [weight, setWeight] = useState(userWeight);
  const [email, setEmail] = useState(userEmail);
  const [profileImage, setProfileImage] = useState(userProfileImage);
  const [gallery, setGallery] = useState([]);
  const [uploadedGalleryImages, setUploadedGalleryImages] = useState([]);

  // New states for additional fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false); // Modal for address
  const [gender, setGender] = useState('Male'); 
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [goal, setGoal] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [isGymGoer, setIsGymGoer] = useState(false);

  // New state for the warning modal
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // Track unsaved changes
  const [navigationAction, setNavigationAction] = useState(null);

  // Listen for input changes and set unsaved changes flag
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [name, height, weight, email, profileImage]);

  // Navigation listener to handle back navigation
  useFocusEffect(
    React.useCallback(() => {
      const handleBackPress = () => {
        if (hasUnsavedChanges) {
          setShowWarningModal(true);
          return true; // Prevent default back action
        }
        return false; // Allow back navigation if no unsaved changes
      };

      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if (hasUnsavedChanges) {
          e.preventDefault(); // Prevent the default behavior of navigating away
          setShowWarningModal(true); // Show warning modal
          setNavigationAction(e.data.action); // Store the navigation action
        }
      });

      return () => unsubscribe();
    }, [hasUnsavedChanges])
  );

  const handleLeave = () => {
    setShowWarningModal(false);
    navigation.dispatch(navigationAction); // Use the stored navigation action to go back
  };

  const handleCancelLeave = () => {
    setShowWarningModal(false);
  };

  const handleSave = async () => {
    try {
      console.log("Profile Updated:", { 
        firstName, lastName, phoneNumber, street, state, zip, gender, dob, goal, healthConditions, 
        activityLevel, isGymGoer, name, height, weight, email, profileImage, uploadedGalleryImages 
      });
      
      await updateProfileInDB(profileImage, uploadedGalleryImages);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  const openAddressModal = () => setShowAddressModal(true);
  const closeAddressModal = () => setShowAddressModal(false);


  const pickProfileImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }
  
      // Pick an image and allow cropping
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square crop
        quality: 0.8,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
  
        // Manipulate the image (resize and crop)
        const croppedImage = await ImageManipulator.manipulateAsync(
          selectedImage.uri,
          [{ resize: { width: 300, height: 300 } }], // Resize to 300x300
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
  
        // Call the API to get the pre-signed URL
        const presignedUrlResponse = await getPresignedUrl();
  
        if (presignedUrlResponse.uploadUrl) {
          // Upload the image to S3 using the pre-signed URL
          await uploadImageToS3(presignedUrlResponse.uploadUrl, croppedImage);
  
          // Set the S3 path to profile image state
          setProfileImage(presignedUrlResponse.s3Path);
  
          // Optionally, update this in your DB if necessary
          await updateProfileImageInDB(presignedUrlResponse.s3Path);
        }
      } else {
        console.log("Image selection was cancelled or no assets found.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "There was an error while picking the image.");
    }
  };

  const getPresignedUrl = async () => {
    try {
      const storedUserId = await SecureStore.getItemAsync('userId');
      const token = await SecureStore.getItemAsync('idToken'); // Your authorization token
  
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://yn489g9iwb.execute-api.us-east-1.amazonaws.com/api/trainers/${storedUserId}/upload-url`,
        headers: {
          'Authorization': token,
        },
      };
  
      const response = await axios.request(config);
      return response.data; // Returns the pre-signed URL and S3 path
    } catch (error) {
      console.error('Error fetching pre-signed URL:', error);
      Alert.alert("Error", "Could not fetch upload URL.");
      return {};
    }
  };

  const uploadImageToS3 = async (uploadUrl, image) => {
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: await fetch(image.uri).then(res => res.blob()), // Convert image URI to Blob
        headers: {
          'Content-Type': 'image/jpeg',
        },
      });
  
      if (response.ok) {
        console.log('Image uploaded successfully!');
      } else {
        console.error('Error uploading image to S3:', response);
        Alert.alert('Error', 'Failed to upload image to the server.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'There was an error uploading the image.');
    }
  };

  const updateProfileImageInDB = async (profileImagePath, galleryImagePaths) => {
    try {
      const storedUserId = await SecureStore.getItemAsync('userId');
      const token = await SecureStore.getItemAsync('idToken');

      const data = { 
        profile_image: profileImagePath,
        gallery: galleryImagePaths 
      };

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `https://yn489g9iwb.execute-api.us-east-1.amazonaws.com/api/trainers/${storedUserId}`,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };

      const response = await axios.request(config);
      console.log('Profile updated with image and gallery:', response.data);
    } catch (error) {
      console.error('Error updating profile image in DB:', error);
      Alert.alert('Error', 'Failed to update profile image.');
    }
  };

  
  const addImageToGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission to access camera roll is required!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];

        // Manipulate the image (resize and crop)
        const croppedImage = await ImageManipulator.manipulateAsync(
          selectedImage.uri,
          [{ resize: { width: 300, height: 300 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Call the API to get the pre-signed URL for gallery image
        const presignedUrlResponse = await getPresignedUrl();

        if (presignedUrlResponse.uploadUrl) {
          // Upload the image to S3 using the pre-signed URL
          await uploadImageToS3(presignedUrlResponse.uploadUrl, croppedImage);

          // Add the S3 path to the uploadedGalleryImages state
          setUploadedGalleryImages([...uploadedGalleryImages, presignedUrlResponse.s3Path]);

          // Add the local URI to the gallery for immediate display
          setGallery([...gallery, croppedImage.uri]);
        }
      } else {
        console.log("Image selection was cancelled or no assets found.");
      }
    } catch (error) {
      console.error("Error adding image to gallery:", error);
      Alert.alert("Error", "There was an error while adding the image to the gallery.");
    }
  };

  const removeImageFromGallery = (imageUri) => {
    setGallery(gallery.filter(image => image !== imageUri)); // Remove the selected image from the gallery
    const updatedGalleryImages = uploadedGalleryImages.filter((_, index) => gallery[index] !== imageUri);
    setUploadedGalleryImages(updatedGalleryImages);
  };



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Edit Profile</Text>

      {/* Profile Image Section */}
      <TouchableOpacity onPress={pickProfileImage}>
        <View style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.dummyProfileIcon}>
              <Icon name="person-circle-outline" size={100} color="#ccc" />
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Warning Modal */}
      <Modal visible={showWarningModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setShowWarningModal(false)}>
          <BlurView intensity={50} style={styles.blurContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Unsaved Changes</Text>
              <Text style={styles.modalText}>You have unsaved changes. Do you want to leave without saving?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.leaveButton} onPress={handleLeave}>
                  <Text style={styles.buttonText}>Leave Anyways</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelLeave}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>

      {/* New Input Fields */}
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="Enter your first name" />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Enter your last name" />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter your phone number" keyboardType="phone-pad" />

      <Text style={styles.label}>Address</Text>
      <TouchableOpacity style={styles.input} onPress={openAddressModal}>
        <Text>{street ? `${street}, ${state}, ${zip}` : 'Enter your address'}</Text>
      </TouchableOpacity>

     {/* Address Modal with Blur Effect */}
     <Modal visible={showAddressModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={closeAddressModal}>
          <BlurView intensity={50} style={styles.blurContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Enter Address</Text>
              <TextInput style={styles.modalInput} value={street} onChangeText={setStreet} placeholder="Street Address" />
              <TextInput style={styles.modalInput} value={state} onChangeText={setState} placeholder="State" />
              <TextInput style={styles.modalInput} value={zip} onChangeText={setZip} placeholder="ZIP Code" keyboardType="numeric" />
              <TouchableOpacity style={styles.saveButton} onPress={closeAddressModal}>
                <Text style={styles.saveButtonText}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.label}>Gender</Text>
      <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{dob.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

<Text style={styles.label}>Gym Goer?</Text>
      <View style={styles.radioGroupHorizontal}>
        <TouchableOpacity onPress={() => setIsGymGoer(true)} style={styles.radioButton}>
          <Icon name={isGymGoer ? "radio-button-on" : "radio-button-off"} size={20} color={isGymGoer ? colors.primary : "#ccc"} />
          <Text style={styles.radioText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsGymGoer(false)} style={styles.radioButton}>
          <Icon name={!isGymGoer ? "radio-button-on" : "radio-button-off"} size={20} color={!isGymGoer ? colors.primary : "#ccc"} />
          <Text style={styles.radioText}>No</Text>
        </TouchableOpacity>
      </View>

      {/* Existing Input Fields */}
      <Text style={styles.label}>Height</Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} placeholder="Enter your height" keyboardType="numeric" />

      <Text style={styles.label}>Weight</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Enter your weight" keyboardType="numeric" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />

      {/* Gallery Section */}
      <Text style={styles.label}>Gallery</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryContainer}>
        {gallery.map((image, index) => (
          <View key={index} style={styles.galleryImageContainer}>
            <Image source={{ uri: image }} style={styles.galleryImage} />
            {/* Cross mark to delete image */}
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={() => removeImageFromGallery(image)}
            >
              <Icon name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addImageButton} onPress={addImageToGallery}>
          <Text style={styles.addImageText}>+ Add Image</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradientButton} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default EditProfileScreen;

