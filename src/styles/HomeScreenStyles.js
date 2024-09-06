import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 20,
  },
  signInButton: {
    width: width * 0.8,
    padding: 15,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  signUpButton: {
    width: width * 0.8,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 25,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#D22B2B',
    fontSize: 18,
  },
  socialMediaText: {
    color: '#FFF',
    marginTop: 40,
    marginBottom: 15,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});