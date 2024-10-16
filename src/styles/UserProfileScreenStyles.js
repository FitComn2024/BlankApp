import { StyleSheet, Dimensions } from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles'; // Import global styles and colors

const screenWidth = Dimensions.get('window').width;

export const UserProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    padding: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: colors.gradientStart,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 3,
  },
  headerText: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    paddingHorizontal: 20,
    color: colors.primary,
  },
  galleryContainer: {
    paddingHorizontal: 20,
  },
  galleryImage: {
    width: screenWidth - 60,
    height: 200,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: '#e0e0e0', // Placeholder color
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  collapsibleContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#fafafa',
    borderRadius: 10,
  },
  sectionText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  arrowButtonLeft: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex: 1,
  },
  arrowButtonRight: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
});
