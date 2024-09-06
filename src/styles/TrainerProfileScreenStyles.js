import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './GlobalStyles';

export const TrainerProfileScreenStyles = StyleSheet.create({
  scrollContainer: {
    padding: spacing.large,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginBottom: spacing.large,
  },
  certificationBadge: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 20,
    marginTop: spacing.small,
    textAlign: 'center',
    alignSelf: 'center',
  },
  photoGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: spacing.large,
  },
  userPhoto: {
    width: 100,
    height: 100,
    margin: spacing.small,
    borderRadius: 8,
  },
  messageButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: spacing.large,
  },
  messageButtonText: {
    color: '#FFFFFF',
    fontWeight: typography.bold,
  },
});
