import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { ProgressBar } from '../../components/ProgressBar';
import { mockDownloadVideo } from '../../services/downloader';
import { useMediaStore } from '../../store/useMediaStore';
import { saveToGallery } from '../../utils/fileHelpers';
import { requestMediaPermissions } from '../../utils/permissions';
import * as FileSystem from 'expo-file-system/legacy';
import Toast from 'react-native-toast-message';

interface VideoQuality {
  label: string;
  value: 'high' | 'medium' | 'low';
  size: string;
}

const AVAILABLE_QUALITIES: VideoQuality[] = [
  { label: '1080p (HD)', value: 'high', size: '45 MB' },
  { label: '720p (SD)', value: 'medium', size: '20 MB' },
  { label: '480p (Basic)', value: 'low', size: '8 MB' },
];

export default function DownloadScreen() {
  const [url, setUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const addDownload = useMediaStore((state) => state.addDownload);

  const fetchVideoInfo = () => {
    if (!url) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter a valid video URL' });
      return;
    }
    
    setIsFetchingInfo(true);
    
    // Simulate fetching video qualities from the given URL
    setTimeout(() => {
      // Mock scraping the title from the webpage
      const fakeTitle = url.includes('youtube.com') 
        ? 'YouTube Video - Funny Moments' 
        : url.includes('instagram.com') 
          ? 'Instagram Reel' 
          : 'MediaForge Direct Download';
          
      setVideoTitle(fakeTitle);
      setIsFetchingInfo(false);
      setShowQualityModal(true);
    }, 1500);
  };

  const startDownload = async (selectedQuality: 'high' | 'medium' | 'low') => {
    setShowQualityModal(false);
    setQuality(selectedQuality);
    
    const hasPerm = await requestMediaPermissions();
    if (!hasPerm) {
      return;
    }
    
    setLoading(true);
    setProgress(0);
    
    try {
      const actualUrl = url.trim();
      
      const uri = await mockDownloadVideo(actualUrl, selectedQuality, (p) => setProgress(p));
      
      const { saveLocation } = useMediaStore.getState();
      let finalPathDisplay = 'Device Gallery';

      if (saveLocation) {
        try {
          const filename = `Video_${Date.now()}.mp4`;
          // Create empty file in SAF directory
          const newFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
            saveLocation,
            filename,
            'video/mp4'
          );
          // Copy data into it
          // Copy data directly to avoid Java OutOfMemoryError
          await FileSystem.copyAsync({ from: uri, to: newFileUri });
          
          finalPathDisplay = String(decodeURIComponent(saveLocation)).replace('content://com.android.externalstorage.documents/tree/primary:', 'Internal Storage: ') + '/' + filename;
        } catch (storageError) {
          console.error(storageError);
          // Fallback to gallery
          await saveToGallery(uri);
        }
      } else {
        await saveToGallery(uri);
        finalPathDisplay = 'Phone Storage / DCIM / MediaForge';
      }

      Alert.alert(
        'Download Complete!',
        `Your video has been successfully saved to:\n\n${finalPathDisplay}`,
        [{ text: 'Great!', style: 'default' }]
      );

      addDownload({
        id: Date.now().toString(),
        name: videoTitle,
        uri,
        type: 'video',
        size: selectedQuality === 'high' ? 45000000 : selectedQuality === 'medium' ? 20000000 : 8000000
      });
      
      setUrl('');
      setVideoTitle('');
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Failed', text2: 'Could not download media from URL' });
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-950 px-6 py-6" keyboardShouldPersistTaps="handled">
      <View className="bg-blue-900/30 border border-blue-800 p-4 rounded-xl mb-6">
        <Text className="text-blue-300 text-sm">
          Enter a video URL. We will fetch the available formats before downloading.
        </Text>
      </View>

      <Text className="text-white text-lg font-medium mb-3">Video URL</Text>
      <TextInput
        className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 text-white text-base mb-6"
        placeholder="https://..."
        placeholderTextColor="#6B7280"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {loading ? (
        <View className="mb-6">
          <ProgressBar progress={progress} label={`Downloading ${quality.toUpperCase()}...`} />
        </View>
      ) : (
        <Button
          title={isFetchingInfo ? "Fetching Video Info..." : "Fetch Video"}
          onPress={fetchVideoInfo}
          loading={isFetchingInfo}
        />
      )}

      <Modal
        visible={showQualityModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowQualityModal(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-gray-900 rounded-t-3xl p-6 border-t border-gray-800">
            <View className="flex-row justify-between items-start mb-6">
              <View className="flex-1 pr-4">
                <Text className="text-white text-xl font-bold mb-1">Select Quality</Text>
                <Text className="text-gray-400 text-sm" numberOfLines={1}>{videoTitle}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowQualityModal(false)} className="p-2 bg-gray-800 rounded-full">
                <MaterialIcons name="close" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <View className="mb-6">
              {AVAILABLE_QUALITIES.map((q) => (
                <TouchableOpacity
                  key={q.value}
                  onPress={() => startDownload(q.value)}
                  className="flex-row items-center justify-between p-4 mb-3 rounded-2xl border border-gray-700 bg-gray-800"
                >
                  <View className="flex-row items-center">
                    <MaterialIcons name="hd" size={28} color="#3B82F6" />
                    <View className="ml-4">
                      <Text className="text-white text-base font-semibold">{q.label}</Text>
                      <Text className="text-green-400 text-xs mt-1">MP4</Text>
                    </View>
                  </View>
                  <Text className="text-gray-400 font-medium">{q.size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
