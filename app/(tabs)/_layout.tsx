import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function TabLayout() {

  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Info",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={ focused ? "information-circle" : "information-circle-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Calculate",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "calculator" : "calculator-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused ? "home" : "home-outline"
                }
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
