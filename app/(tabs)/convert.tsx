import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { mockConvertVideoToAudio, mockConvertAudioToVideo } from '../../services/converter';
import { useMediaStore } from '../../store/useMediaStore';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';

interface SelectedMedia {
  uri: string;
  name: string;
  type: 'video' | 'audio';
}

export default function ConvertScreen() {
  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const addConversion = useMediaStore((state) => state.addConversion);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedMedia({
        uri: asset.uri,
        name: asset.uri.split('/').pop() || 'video.mp4',
        type: 'video'
      });
    }
  };

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedMedia({
        uri: asset.uri,
        name: asset.name,
        type: 'audio'
      });
    }
  };

  const handleConvert = async () => {
    if (!selectedMedia) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please select a file to convert' });
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const isVideo = selectedMedia.type === 'video';
      
      let uri = '';
      if (isVideo) {
        uri = await mockConvertVideoToAudio(selectedMedia.uri, 'MP3', '128k', (p) => setProgress(p));
      } else {
        uri = await mockConvertAudioToVideo(selectedMedia.uri, 'gradient', (p) => setProgress(p));
      }

      addConversion({
        id: Date.now().toString(),
        name: isVideo ? 'Converted_Audio.mp3' : 'Generated_Video.mp4',
        uri,
        type: isVideo ? 'audio' : 'video',
        size: 5 * 1024 * 1024 // 5 MB mock size
      });

      Toast.show({ type: 'success', text1: 'Success', text2: 'Conversion complete!' });
      setSelectedMedia(null);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed', text2: 'Conversion failed' });
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-950 px-6 py-6" contentContainerStyle={{ paddingBottom: 40 }}>
      <Text className="text-white text-lg font-medium mb-3">Select Media to Convert</Text>

      <View className="flex-row gap-4 mb-6">
        <Button
          title="Pick Video"
          onPress={pickVideo}
          variant="secondary"
          className="flex-1"
        />
        <Button
          title="Pick Audio"
          onPress={pickAudio}
          variant="secondary"
          className="flex-1"
        />
      </View>

      {selectedMedia ? (
        <View className="bg-gray-900 border border-gray-800 p-4 rounded-xl mb-6 flex-row items-center">
          <MaterialIcons name={selectedMedia.type === 'video' ? 'movie' : 'audiotrack'} size={24} color="#3B82F6" />
          <Text className="text-white ml-3 flex-1 truncate" numberOfLines={1}>
            {selectedMedia.name}
          </Text>
        </View>
      ) : (
        <View className="bg-gray-900/50 border border-gray-800 border-dashed p-8 rounded-xl mb-6 items-center justify-center">
          <MaterialIcons name="upload-file" size={48} color="#4B5563" />
          <Text className="text-gray-400 mt-2 text-center">No media selected yet</Text>
        </View>
      )}

      {loading && (
        <View className="mb-6">
          <ProgressBar progress={progress} label="Converting..." />
        </View>
      )}

      <Button
        title={selectedMedia?.type === 'video' ? "Convert to Audio (MP3)" : "Create Video from Audio"}
        onPress={handleConvert}
        disabled={!selectedMedia}
        loading={loading}
      />
    </ScrollView>
  );
}
