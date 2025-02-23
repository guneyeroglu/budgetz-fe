import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { TabBar } from '@/components/TabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name='debts'
        options={{
          title: 'Giderler',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='file-invoice-dollar' size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='incomes'
        options={{
          title: 'Gelirler',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='hand-holding-dollar' size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='index'
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='house' size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='payments'
        options={{
          title: 'Ödemeler',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='money-bill-transfer' size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Ayarlar',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='gear' size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
