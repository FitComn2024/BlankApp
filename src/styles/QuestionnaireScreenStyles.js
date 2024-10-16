import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, typography } from './GlobalStyles';
const { width } = Dimensions.get('window');

export const QuestionnaireScreenStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background, // White background
//     paddingHorizontal: spacing.large,
//     paddingTop: spacing.large,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     paddingBottom: spacing.large, // Add padding to ensure enough space for scrolling
//   },
  
//   headerBackground: {
//     width: width * 0.9,
//     borderRadius: 8,
//     paddingVertical: spacing.medium,
//     paddingHorizontal: spacing.large,
//     alignItems: 'center',
//     marginBottom: spacing.medium,
//     alignSelf: 'center',
//   },
//   headerText: {
//     fontSize: typography.heading2,
//     color: colors.buttonText, // Ensure the text color contrasts with the gradient background
//     textAlign: 'center',
//     fontWeight: typography.bold,
//   },
//   questionContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   questionText: {
//     fontSize: typography.heading2,
//     color: colors.text, // Dark text color to contrast with the white background
//     textAlign: 'center',
//     marginBottom: spacing.medium,
//     fontWeight: typography.bold,
//   },
//   input: {
//     backgroundColor: colors.inputBackground,
//     borderRadius: 8,
//     paddingHorizontal: spacing.medium,
//     paddingVertical: spacing.small,
//     color: colors.text,
//     marginBottom: spacing.medium,
//     borderColor: colors.borderColor,
//     borderWidth: 1,
//     width: '100%',
//   },
//   optionButton: {
//     backgroundColor: colors.inputBackground,
//     borderRadius: 8,
//     paddingVertical: spacing.medium,
//     paddingHorizontal: spacing.large,
//     marginBottom: spacing.small,
//     alignItems: 'center',
//     width: '100%',
//     borderColor: colors.borderColor,
//     borderWidth: 1,
//   },
//   selectedOptionButton: {
//     backgroundColor: colors.primary,
//     borderColor: colors.primary,
//   },
//   optionText: {
//     color: colors.text,
//     fontWeight: typography.normal,
//   },
//   selectedOptionText: {
//     fontWeight: typography.bold,
//     color: colors.buttonText,
//   },
//   navigationButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '80%',
//   },
//   navButton: {
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: spacing.small,
//     marginHorizontal: 5,
//   },
//   navButtonGradient: {
//     paddingVertical: spacing.small,
//     paddingHorizontal: spacing.medium,
//     borderRadius: 20,
//   },
//   skipButton: {
//     marginTop: spacing.medium,
//     alignSelf: 'center',
//   },
//   skipButtonText: {
//     color: colors.secondaryText,
//     textDecorationLine: 'underline',
//     fontSize: typography.smallText,
//   },
//   skipQuestionnaireButton: {
//     marginBottom: spacing.medium, // Move the button to the bottom
//     alignSelf: 'center',
//     backgroundColor: 'transparent',
//   },
//   arrowButton: {
//     alignSelf: 'center',
//     marginTop: 10,
// },


//////////

container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#fff',
},
header: {
  padding: 15,
  alignItems: 'center',
  borderRadius: 5,
},
headerText: {
  fontSize: 24,
  color: 'white',
  fontWeight: 'bold',
},
pickerContainer: {
  width: '80%',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  marginTop: 10,
},
picker: {
  height: 50,
  width: '100%',
},
progressBarBackground: {
  height: 10,
  backgroundColor: '#e0e0e0',
  borderRadius: 5,
  marginVertical: 10,
},
progressBarFill: {
  height: '100%',
  backgroundColor: '#3b5998',
  borderRadius: 5,
},
questionWrapper: {
  flex: 1,
  justifyContent: 'center', // Centers both the question and arrows vertically
  alignItems: 'center',
},
questionContainer: {
  width: '100%',
  alignItems: 'center',
  marginBottom: 20, // Space between the question and arrows
},
scrollViewContent: {
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
},
arrowContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '50%', // Adjust width to control arrow positioning
},
arrowButton: {
  padding: 10,
},
});
