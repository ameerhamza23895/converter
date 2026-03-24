import { View, Text, ScrollView } from 'react-native';
import { VideoCard } from '../../components/VideoCard';
import { useMediaStore } from '../../store/useMediaStore';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { downloads, conversions, edits } = useMediaStore();
  const recentFiles = [...downloads, ...conversions, ...edits].slice(-5);

  return (
    <ScrollView className="flex-1 bg-gray-950">
      <LinearGradient
        colors={['#1E3A8A', '#020617']}
        className="px-6 py-10 rounded-b-3xl"
      >
        <Text className="text-white text-3xl font-bold">MediaForge</Text>
        <Text className="text-gray-300 text-base mt-2">
          Your all-in-one local media toolkit
        </Text>
      </LinearGradient>

      <View className="px-6 py-6 border-b border-gray-800">
        <Text className="text-xl font-semibold text-white mb-4">Storage Overview</Text>
        <View className="flex-row justify-between bg-gray-900 p-4 rounded-2xl">
          <View className="items-center">
            <Text className="text-gray-400 text-xs uppercase">Downloads</Text>
            <Text className="text-white text-2xl font-bold mt-1">{downloads.length}</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-400 text-xs uppercase">Conversions</Text>
            <Text className="text-white text-2xl font-bold mt-1">{conversions.length}</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-400 text-xs uppercase">Edits</Text>
            <Text className="text-white text-2xl font-bold mt-1">{edits.length}</Text>
          </View>
        </View>
      </View>

      <View className="px-6 py-6 flex-1">
        <Text className="text-xl font-semibold text-white mb-4">Recent Files</Text>
        {recentFiles.length === 0 ? (
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-500 text-center">No recent files yet.</Text>
            <Text className="text-gray-600 text-center mt-2 text-sm">Download or convert media to get started.</Text>
          </View>
        ) : (
          recentFiles.map((item, index) => <VideoCard key={`${item.id}-${index}`} item={item} />)
        )}
      </View>
    </ScrollView>
  );
}
