import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from './GlobalStyles';
const { width } = Dimensions.get('window');

export const ProfileScreenStyles = StyleSheet.create({
  gradientStart: colors.gradientStart,  // Start color of the gradient
  gradientEnd: colors.gradientEnd,      // End color of the gradient

  scrollContainer: {
    paddingBottom: spacing.large,
  },
  profileHeader: {
    padding: spacing.large,
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
  profileDetails: {
    justifyContent: 'center',
  },
  profileName: {
    color: '#FFF',
    fontSize: typography.heading2,
    fontWeight: typography.bold,
  },
  profileSpecialization: {
    color: '#FFF',
    fontSize: typography.bodyText,
  },
  profileLocation: {
    color: '#FFF',
    fontSize: typography.bodyText,
  },
  profileClients: {
    color: '#FFF',
    fontSize: typography.bodyText,
  },
  messageButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    marginTop: spacing.small,
  },
  messageButtonText: {
    color: '#FFF',
    fontWeight: typography.bold,
  },
  gallerySection: {
    marginVertical: spacing.large,
    paddingHorizontal: spacing.large,
  },
  sectionTitle: {
    fontSize: typography.heading2,
    fontWeight: typography.bold,
    marginBottom: spacing.medium,
  },
  galleryScroll: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: spacing.small,
  },
  detailsSection: {
    marginVertical: spacing.large,
    paddingHorizontal: spacing.large,
  },
  detailText: {
    fontSize: typography.bodyText,
    marginBottom: spacing.small,
  },
  certificationBadge: {
    marginTop: spacing.medium,
    backgroundColor: colors.primary,
    color: '#FFF',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.large,
    borderRadius: 20,
    textAlign: 'center',
  },
  reviewsSection: {
    marginVertical: spacing.large,
    paddingHorizontal: spacing.large,
  },
  reviewCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: spacing.medium,
    marginBottom: spacing.small,
  },
  reviewText: {
    fontSize: typography.bodyText,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
