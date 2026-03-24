import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';

export const requestMediaPermissions = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync(true);
  if (status !== 'granted') {
    Toast.show({
      type: 'error',
      text1: 'Permission Denied',
      text2: 'Sorry, we need media library permissions to make this work!',
    });
    return false;
  }
  return true;
};
