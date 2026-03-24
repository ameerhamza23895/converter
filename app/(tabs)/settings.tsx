import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMediaStore } from '../../store/useMediaStore';
import * as FileSystem from 'expo-file-system/legacy';
import Toast from 'react-native-toast-message';

export default function SettingsScreen() {
  const { saveLocation, saveLocationName, setSaveLocation } = useMediaStore();

  const handleChangePath = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        setSaveLocation(permissions.directoryUri, 'Custom Folder');
        Toast.show({ type: 'success', text1: 'Path Updated', text2: 'Downloads will now save to the selected folder.' });
      } else {
        Toast.show({ type: 'info', text1: 'Cancelled', text2: 'Folder selection was cancelled.' });
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not open folder picker.' });
    }
  };

  const resetToGallery = () => {
    setSaveLocation(null, 'Device Gallery');
    Toast.show({ type: 'success', text1: 'Path Reset', text2: 'Downloads will now save to the default Device Gallery.' });
  };

  return (
    <ScrollView className="flex-1 bg-gray-950 px-6 py-8">
      <Text className="text-white text-2xl font-bold mb-6">Settings</Text>

      <View className="mb-8">
        <Text className="text-blue-400 font-semibold uppercase text-xs mb-3 ml-1">Download Storage</Text>
        <View className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          
          <View className="p-4 border-b border-gray-800">
            <Text className="text-white text-base font-medium mb-1">Current Save Path</Text>
            <Text className="text-gray-400 text-sm leading-5">
              {saveLocation ? String(decodeURIComponent(saveLocation)).replace('content://com.android.externalstorage.documents/tree/primary:', 'Internal Storage: ') : 'Default Device Gallery'}
            </Text>
          </View>

          <TouchableOpacity onPress={handleChangePath} className="p-4 border-b border-gray-800 flex-row items-center justify-between">
            <Text className="text-blue-400 text-base font-medium">Change Save Folder</Text>
            <MaterialIcons name="folder-open" size={22} color="#60A5FA" />
          </TouchableOpacity>

          {saveLocation && (
            <TouchableOpacity onPress={resetToGallery} className="p-4 flex-row items-center justify-between">
              <Text className="text-red-400 text-base font-medium">Reset to Gallery</Text>
              <MaterialIcons name="restore" size={22} color="#F87171" />
            </TouchableOpacity>
          )}

        </View>
        <Text className="text-gray-500 text-xs mt-3 ml-1">
          Changing your save folder allows downloads to be placed in specific directories rather than universally syncing to your camera roll.
        </Text>
      </View>
    </ScrollView>
  );
}
