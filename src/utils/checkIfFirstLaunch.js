import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_LAUNCHED = 'hasLaunched';

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

// Basic function for first launch or not
export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);

    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    } else if (hasLaunched === true) {
      return false;
    }
  } catch (error) {
    return false;
  }
}
