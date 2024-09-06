import { StyleSheet } from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles'; // Import global styles and colors

export const UserProfileScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: '#e0e0e0', // Ensure visibility if image fails to load
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  profileName: {
    flex: 1,
    color: colors.text,
    fontFamily: 'System',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingsIcon: {
    width: 25,
    height: 25,
    tintColor: colors.text, // Ensure the icon matches the theme
  },
  statistics: {
    marginBottom: 20,
    marginLeft:0,
    marginRight: 'auto'
  },
  statLabel: {
    fontFamily: 'System',
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  statValue: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  caloriesContainer:{
    width: '100%'
  },
  progressBarContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  progressBarBackground: {
    flexDirection: 'row',
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
  },
  consumedBar: {
    backgroundColor: colors.primary,
  },
  burnedBar: {
    backgroundColor: colors.error,
  },
  caloriesText: {
    fontFamily: 'System',
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
  },
  graphContainer: {
    marginBottom: 20,
    height: 200,
    backgroundColor: colors.background,
    borderRadius: 10,
    
  },
  graphTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  activitiesContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
   
    borderRadius: 10,
    marginBottom: 10,
  },
  activityName: {
    fontFamily: 'System',
    fontSize: 14,
    color: colors.text,
  },
  activityButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    
    alignItems: 'center',
  },
  activityButtonCompleted: {
    backgroundColor: '#aaa', // Grey out completed activities
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.buttonText,
  },
  trainerSection: {
    marginBottom: 20,
  },
  clientsContainer: {
    marginBottom: 20,
  },
  clientItem: {
    backgroundColor: colors.background,
   
    borderRadius: 10,
    marginBottom: 10,
  },
  clientName: {
    fontFamily: 'System',
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  assignButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
   
    alignItems: 'center',
    marginBottom: 5,
  },
  clientProgress: {
    fontFamily: 'System',
    fontSize: 14,
    color: colors.text,
  },
  statLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});