import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from './GlobalStyles';

const { width, height } = Dimensions.get('window');
export const SignupScreenStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerBackground: {
    // height: height * 0.1,  // 20% of screen height
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,  // 5% of screen width
    paddingTop: 0,
    paddingBottom: 90,
    paddingLeft: 30
  },
  headerTitle: {
    fontSize: width * 0.07,  // Adjust font size based on screen width
    color: colors.buttonText,
    fontWeight: typography.bold,
    textAlign: 'left',
  },
  headerSubtitle: {
    fontSize: width * 0.07,  // Adjust font size based on screen width
    color: colors.buttonText,
    fontWeight: typography.bold,
    textAlign: 'left',
  },
  formContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: spacing.large,  // Apply border radius to top-left corner
    borderTopRightRadius: spacing.large, // Apply border radius to top-right corner
    padding: spacing.large,
    marginTop: -30,
    width: '100%',
    flex: 1,  // Ensure the form container grows to fill the available space
    justifyContent: 'flex-start',  // Align content to the top
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  inputContainer: {
    marginBottom: spacing.medium,
  },
  label: {
    fontSize: typography.bodyText,
    color: colors.text,
    marginBottom: spacing.small,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    color: colors.text,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  icon: {
    marginLeft: spacing.small,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpButton: {
    marginTop: spacing.medium,
    borderRadius: 8,
  },
  signUpButtonGradient: {
    paddingVertical: spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: colors.buttonText,
    fontSize: typography.bodyText,
    fontWeight: typography.bold,
  },
  signInText: {
    marginTop: spacing.large,
    textAlign: 'center',
    color: colors.text,
  },
  signInLink: {
    color: colors.primary,
    fontWeight: typography.bold,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.small,
  },
  confirmationText: {
    fontSize: typography.bodyText,
    color: colors.text,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  resendButton: {
    marginTop: spacing.medium,
    alignSelf: 'center',
    padding: spacing.small,
    backgroundColor: 'transparent',
  },
  resendButtonText: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontSize: typography.bodyText,
  },
  radioGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left', // Adjust space between buttons as needed
    marginBottom: 5, // Adjust margin as needed
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15, // Adjust space between radio buttons as needed
  },
  radioText: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.text, // Assuming you have a text color in your colors file
  },
});