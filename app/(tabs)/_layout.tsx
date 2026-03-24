import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#111827' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#1F2937', borderTopColor: '#374151' },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="download"
        options={{
          title: 'Download',
          tabBarIcon: ({ color }) => <MaterialIcons name="file-download" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="convert"
        options={{
          title: 'Convert',
          tabBarIcon: ({ color }) => <MaterialIcons name="transform" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          title: 'Edit',
          tabBarIcon: ({ color }) => <MaterialIcons name="edit" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
