import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from './GlobalStyles';
const { width } = Dimensions.get('window');

export const HomeDashboardScreenStyles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    padding: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconButton:{
    marginRight: 10,
  },
  profileCardContainer: {
    width: '49%', // Adjust the width to fit two cards in a row with some spacing
    marginBottom: 10,  // Add margin to create space between the cards vertically
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.large,
  },
  searchBar: {
    flex: 1,
    marginRight: spacing.medium,
    paddingVertical: spacing.small,
  },
  topBarButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 8,
    marginEnd: 3,
  },
  topBarButtonText: {
    color: '#FFFFFF',
    fontWeight: typography.bold,
  },
  section: {
    marginBottom: spacing.large,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  seeAllText: {
    color: colors.secondaryText,
    textDecorationLine: 'underline',
    fontWeight: typography.bold,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Ensure cards are spaced evenly
  },
  profileCard: {
    width: width / 2 - spacing.large, // Maintain two cards per row
    height: 230, // Set a fixed height for all cards
    marginRight: 10,
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: colors.background,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: spacing.small,
  },
  certificationBadge: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 20,
    marginTop: spacing.small,
  },
});
