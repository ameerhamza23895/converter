import { useLocalSearchParams, router } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { MaterialIcons } from '@expo/vector-icons';

export default function PlayerScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  
  const player = useVideoPlayer(uri || '', (player) => {
    player.loop = false;
    player.play();
  });

  if (!uri) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">No video URI provided.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-blue-600 px-6 py-2 rounded-xl">
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black justify-center relative">
      <TouchableOpacity 
        className="absolute top-12 right-6 z-50 bg-gray-800/80 p-2 rounded-full w-12 h-12 items-center justify-center"
        onPress={() => router.back()}
      >
        <MaterialIcons name="close" size={28} color="white" />
      </TouchableOpacity>
      
      <VideoView
        player={player}
        className="w-full h-3/4"
        allowsFullscreen
        allowsPictureInPicture
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '75%',
  },
});
