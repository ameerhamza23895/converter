import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
}: ButtonProps) => {
  const getBgColor = () => {
    if (disabled) return 'bg-gray-600';
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 active:bg-blue-700';
      case 'secondary':
        return 'bg-gray-800 active:bg-gray-700';
      case 'danger':
        return 'bg-red-600 active:bg-red-700';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <TouchableOpacity
      className={`px-6 py-4 rounded-2xl flex-row items-center justify-center ${getBgColor()} ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-semibold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
