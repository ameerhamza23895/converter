import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MediaItem } from '../store/useMediaStore';
import { router } from 'expo-router';

export const VideoCard = ({ item }: { item: MediaItem }) => {
  const handlePress = () => {
    if (item.type === 'video') {
      router.push(`/player?uri=${encodeURIComponent(item.uri)}`);
    } else {
      // Could play audio or show toast
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={handlePress}
      className="flex-row items-center p-4 bg-gray-900 rounded-2xl mb-3 border border-gray-800 shadow-sm"
    >
      <View className="w-16 h-16 bg-gray-800 rounded-xl items-center justify-center overflow-hidden">
        {item.type === 'video' ? (
          <Image
            source={{ uri: item.uri }}
            className="w-full h-full opacity-50 absolute"
          />
        ) : null}
        <MaterialIcons
          name={item.type === 'video' ? 'movie' : 'audiotrack'}
          size={32}
          color="#9CA3AF"
        />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-white text-base font-medium truncate" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          {item.type.toUpperCase()} • {item.size ? `${(item.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown size'}
        </Text>
      </View>
      <View className="pl-3">
        <MaterialIcons name={item.type === 'video' ? 'play-circle-outline' : 'chevron-right'} size={28} color="#3B82F6" />
      </View>
    </TouchableOpacity>
  );
};
