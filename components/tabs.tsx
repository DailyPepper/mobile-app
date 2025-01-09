// import { Tabs } from "expo-router";
// import React from "react";
// import { Colors } from "../constant/color";
// import { useColorScheme } from "../hooks/useColorScheme";
// import { Ionicons } from "@expo/vector-icons";
// // import { Provider } from "react-redux";
// // import { store } from "@/store/store";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     // <Provider store={store}>
//     <>
//       <Tabs
//         screenOptions={{
//           tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//           headerShown: false,
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: "Info",
//             tabBarIcon: ({ color, focused }) => (
//               <Ionicons
//                 name={ focused ? "information-circle" : "information-circle-outline"}
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="cart"
//           options={{
//             title: "Calculate",
//             tabBarIcon: ({ color, focused }) => (
//               <Ionicons
//                 name={focused ? "calculator" : "calculator-outline"}
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="information"
//           options={{
//             title: "History",
//             tabBarIcon: ({ color, focused }) => (
//               <Ionicons
//                 name={
//                   focused ? "history" : "history-outline"
//                 }
//                 size={24}
//                 color={color}
//               />
//             ),
//           }}
//         />
//       </Tabs>
//     {/* </Provider> */}
//     </>
//   );
// }
