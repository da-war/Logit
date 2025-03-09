import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="home"
              focused={focused}
              color={color}
              size={24}
            />
          ),
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="log"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="clock"
              focused={focused}
              color={color}
              size={24}
            />
          ),
          title: "Log",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="account"
              focused={focused}
              color={color}
              size={24}
            />
          ),
          title: "Account",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    elevation: 8,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
    borderTopWidth: 0,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  activeIcon: {
    color: "#D02445",
    fontWeight: "700",
  },
});
