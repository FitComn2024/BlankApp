import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#D22B2B', // Red primary color for buttons and highlights
    background: '#FFF', // Light background color for the overall app
    text: '#000', // Dark text color for readability
    secondaryText: '#666', // Secondary text color for less emphasis
    inputBackground: '#F5F5F5', // Light input background to match the form fields
    buttonBackground: '#D22B2B', // Red button background, matching primary color
    buttonText: '#FFF', // White text color for buttons
    error: '#E74C3C', // Red error color for validation messages
    placeholder: '#AAA', // Lighter placeholder text color
    borderColor: '#DDD', // Light border color for input fields
    gradientStart: '#B81735', // Start color for linear gradients
    gradientEnd: '#2C193B', // End color for linear gradients
};

export const typography = {
  fontFamily: 'Arial', // Use a clean and modern font like Arial
  fontSize: 16, // Base font size
  heading1: 28, // Large headings for prominent titles
  heading2: 24, // Medium headings for section titles
  bodyText: 16, // Regular body text size
  smallText: 14, // Smaller text for secondary information
  bold: 'bold', // Bold font weight for emphasis
  normal: 'normal', // Regular font weight for standard text
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.small,
  },
  container2:{
    flex:1,
    backgroundColor: colors.background,
  },
  container3:{
    flex:1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.medium,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    color: colors.text,
    marginBottom: spacing.medium,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  button: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 25, // Rounded buttons to match the design
    paddingVertical: spacing.medium,
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: typography.bold,
    fontSize: typography.bodyText, // Consistent button text size
  },
  linkText: {
    color: colors.primary,
    marginTop: spacing.small,
    textAlign: 'center',
    fontSize: typography.smallText,
  },
  heading1: {
    fontSize: typography.heading1,
    color: colors.text,
    fontWeight: typography.bold,
    marginBottom: spacing.large,
    textAlign: 'left', // Align headings to the left to match the theme
  },
  heading2: {
    fontSize: typography.heading2,
    color: colors.text,
    fontWeight: typography.bold,
    marginBottom: spacing.small,
    textAlign: 'left', // Left-aligned subheadings
  },
  text: {
    fontSize: typography.bodyText,
    color: colors.text,
    fontWeight: typography.normal,
  },
  smallText: {
    fontSize: typography.smallText,
    color: colors.secondaryText,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.small,
    fontSize: typography.smallText,
  },
  footer: {
    marginTop: spacing.large,
    alignItems: 'center',
  },
  footerText: {
    color: colors.secondaryText,
    fontSize: typography.smallText,
    textAlign: 'center',
  },
});