import { StyleSheet } from 'react-native';
import { colors } from '../styles/GlobalStyles';

export const EditProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaveButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalInput: {
    width: '100%', // Make all input fields the same width
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  scrollContent: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.inputBackground,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular shape
    overflow: 'hidden', // Ensures the image is cropped in a circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0', // Optional: Background color for the profile container
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dummyProfileIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    color: colors.text,
    textAlign: 'center',
  },
  galleryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  galleryContainer: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  addImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  addImageText: {
    color: colors.buttonText,
    fontSize: 16,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 30,
    paddingVertical: 15,
  },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  galleryImageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1, // Ensure the delete button is on top of the image
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  radioGroupHorizontal: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Center items vertically
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // Add spacing between the radio buttons
  },
  radioText: {
    marginLeft: 5,
  },
  
});
