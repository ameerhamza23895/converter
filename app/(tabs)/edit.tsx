import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { mockEditVideo } from '../../services/editor';
import { useMediaStore } from '../../store/useMediaStore';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';

export default function EditScreen() {
  const [selectedVideo, setSelectedVideo] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const addEdit = useMediaStore((state) => state.addEdit);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true, // Native trim option
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0]);
    }
  };

  const handleEdit = async () => {
    if (!selectedVideo) return;

    setLoading(true);
    setProgress(0);

    try {
      const uri = await mockEditVideo(selectedVideo.uri, { filter: 'cinematic' }, (p) => setProgress(p));

      addEdit({
        id: Date.now().toString(),
        name: 'Edited_Video.mp4',
        uri,
        type: 'video',
        size: 15 * 1024 * 1024 // Mock size
      });

      Toast.show({ type: 'success', text1: 'Success', text2: 'Video exported successfully!' });
      setSelectedVideo(null);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed', text2: 'Video export failed' });
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-950 px-6 py-6" contentContainerStyle={{ paddingBottom: 40 }}>
      <Text className="text-white text-lg font-medium mb-3">Select Video to Edit</Text>

      <Button
        title="Choose Video from Library"
        onPress={pickVideo}
        variant="secondary"
        className="mb-6"
      />

      {selectedVideo ? (
        <View className="bg-gray-900 border border-gray-800 p-4 rounded-xl mb-6">
          <View className="flex-row items-center mb-4">
            <MaterialIcons name="movie" size={24} color="#10B981" />
            <Text className="text-white ml-3 flex-1 truncate" numberOfLines={1}>
              {selectedVideo.uri.split('/').pop()}
            </Text>
          </View>
          <Text className="text-gray-400 text-sm mb-2">Selected filters: Cinematic Theme</Text>
          <Text className="text-gray-400 text-sm mb-2">Background Music: Default</Text>
        </View>
      ) : (
        <View className="bg-gray-900/50 border border-gray-800 border-dashed p-8 rounded-xl mb-6 items-center justify-center">
          <MaterialIcons name="video-library" size={48} color="#4B5563" />
          <Text className="text-gray-400 mt-2 text-center">Select a video to apply filters and edits</Text>
        </View>
      )}

      {loading && (
        <View className="mb-6">
          <ProgressBar progress={progress} label="Applying edits & rendering..." />
        </View>
      )}

      <Button
        title="Export Video"
        onPress={handleEdit}
        disabled={!selectedVideo}
        loading={loading}
      />
    </ScrollView>
  );
}
