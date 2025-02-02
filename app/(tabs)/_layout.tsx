import React from 'react';

import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { TabBar } from '@/app/components/TabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={TabBar}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='house' size={size} color={color} />,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name='debts'
        options={{
          title: 'Debts',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='file-invoice-dollar' size={size} color={color} />,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name='incomes'
        options={{
          title: 'Incomes',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='hand-holding-dollar' size={size} color={color} />,
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name='payments'
        options={{
          title: 'Payments',
          tabBarIcon: ({ size, color }) => <FontAwesome6 name='money-bill-transfer' size={size} color={color} />,
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
}
