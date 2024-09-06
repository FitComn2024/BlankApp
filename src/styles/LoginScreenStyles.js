import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from './GlobalStyles';

const { width, height } = Dimensions.get('window');

export const LoginScreenStyles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderTopLeftRadius: width * 0.05,  // 5% of screen width
    borderTopRightRadius: width * 0.05, // 5% of screen width
    padding: width * 0.06,  // 6% of screen width
    marginTop: -30,  // 2% of screen height
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
    marginBottom: height * 0.02,  // 2% of screen height
  },
  label: {
    fontSize: width * 0.04,  // Adjust font size based on screen width
    color: colors.primary,
    marginBottom: height * 0.005,  // 0.5% of screen height
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingBottom: height * 0.005,  // 0.5% of screen height
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,  // Adjust font size based on screen width
    color: colors.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingBottom: height * 0.005,  // 0.5% of screen height
  },
  icon: {
    marginLeft: width * 0.02,  // 2% of screen width
  },
  errorText: {
    color: colors.error,
    fontSize: width * 0.03,  // Adjust font size based on screen width
    marginTop: height * 0.005,  // 0.5% of screen height
  },
  forgotPasswordText: {
    color: colors.secondaryText,
    textAlign: 'right',
    marginTop: height * 0.01,  // 1% of screen height
    marginBottom: height * 0.02,  // 2% of screen height
    fontSize: width * 0.035,  // Adjust font size based on screen width
  },
  signInButton: {
    marginTop: height * 0.02,  // 2% of screen height
  },
  signInButtonGradient: {
    paddingVertical: height * 0.02,  // 2% of screen height
    borderRadius: width * 0.05,  // 5% of screen width
    alignItems: 'center',
  },
  signInButtonText: {
    color: colors.buttonText,
    fontSize: width * 0.045,  // Adjust font size based on screen width
    fontWeight: typography.bold,
  },
  signUpText: {
    color: colors.secondaryText,
    textAlign: 'center',
    marginTop: height * 0.02,  // 2% of screen height
    fontSize: width * 0.035,  // Adjust font size based on screen width
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: typography.bold,
  },
});