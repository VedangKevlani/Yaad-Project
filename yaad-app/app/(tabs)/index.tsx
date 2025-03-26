import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../../screens/WelcomeScreen"; // Correct path to screens
import SignUpScreen from "../../screens/SignUpScreen"; // Correct path to screens
import { Ionicons } from "@expo/vector-icons"; // Icon library
import ImageDetectionScreen from "@/screens/ImageDetectionScreen";

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home"; 
          if (route.name === "Welcome") {
            iconName = "home"; 
          } else if (route.name === "SignUp") {
            iconName = "person"; 
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
      <Tab.Screen name="ImageDetection" component={ImageDetectionScreen}/>
    </Tab.Navigator>
  );
};

export default TabsNavigator;
