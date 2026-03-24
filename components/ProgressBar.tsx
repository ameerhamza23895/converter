import { View, Text } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 1
  label?: string;
  className?: string;
}

export const ProgressBar = ({ progress, label, className = '' }: ProgressBarProps) => {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const percentage = Math.round(clampedProgress * 100);

  return (
    <View className={`w-full ${className}`}>
      {label && (
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-300 font-medium">{label}</Text>
          <Text className="text-white font-bold">{percentage}%</Text>
        </View>
      )}
      <View className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
        <View
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
};
