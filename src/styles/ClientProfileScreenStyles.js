import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from './GlobalStyles';
const { width } = Dimensions.get('window');

export const ClientProfileScreenStyles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: spacing.large,
  },
  headerContainer: {
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },  
  profileHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent:'space-between',
    marginBottom: spacing.medium,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.medium,
  },
  headerDetails: { 
    justifyContent:'center'
  },
  messageButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    marginTop: spacing.small,
  },
  clientName:{
    color: '#FFF',
    fontSize: typography.heading2,
    fontWeight: typography.bold,
  },
  location:{
    color: '#FFF',
    fontSize: typography.bodyText,
  },
  goal:{
    color: '#FFF',
    fontSize: typography.bodyText,
    width: '90%',
  },
  messageButtonText: {
    color: '#FFF',
    fontWeight: typography.bold,
  },
  galleryContainer: {
    marginBottom: 16,
    marginVertical: spacing.large,
    padding: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f0f0f0', // Add subtle background color to section headers
  },
  sectionContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa', // Light background for content
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionText: {
    color: colors.textPrimary, // Use primary text color
    fontSize: typography.bodyText,
    lineHeight: 22,
  },
  sectionSubText: {
    color: colors.textSecondary, // Use secondary text color for additional details
    fontSize: typography.smallText,
    lineHeight: 20,
    marginTop: 4,
  },
  iconColor: '#333333',
});
