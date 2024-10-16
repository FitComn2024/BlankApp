import * as SecureStore from 'expo-secure-store';
import { ClientPoolData } from './PoolData';
import { TrainerPoolData } from './PoolData';

export const getUserPoolData = async (userType) => {
  try {
    // If userType is passed as a parameter, use that directly
    if (userType) {
      if (userType === 'client') {
        return ClientPoolData;
      } else if (userType === 'trainer') {
        return TrainerPoolData;
      } else {
        throw new Error('Invalid user type provided.');
      }
    }

    // If no userType is passed, retrieve it from SecureStore
    const storedUserType = await SecureStore.getItemAsync('userType');
    
    if (storedUserType === 'client') {
      return ClientPoolData;
    } else if (storedUserType === 'trainer') {
      return TrainerPoolData;
    } else {
      throw new Error('User type is not defined or invalid.');
    }
  } catch (error) {
    console.error('Error fetching user pool data:', error);
    return null; // Handle error or provide default behavior
  }
};