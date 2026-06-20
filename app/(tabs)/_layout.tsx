import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",

        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 5,
          paddingTop: 5,
          overflow: "hidden",
          position: "absolute",
        },

        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rack"
        options={{
          title: "Rack",
          tabBarIcon: ({ size, color }) => <Ionicons name="library-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default _layout