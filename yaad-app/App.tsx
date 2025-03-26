import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "@/screens/WelcomeScreen";  // Using alias
import SignUpScreen from "@/screens/SignUpScreen";
import ImageDetectionScreen from "@/screens/ImageDetectionScreen"; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ImageDetection" component={ImageDetectionScreen} />
       </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
