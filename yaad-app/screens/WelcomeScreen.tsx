import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack"; // Import navigation types
import { RootStackParamList } from "../types"; // Import the types

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Welcome">;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/yaadlogoo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to Yaad!</Text>
      <Button
        title="Proceed"
        onPress={() => navigation.navigate("SignUp")} // Navigate to SignUpScreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40A7C4",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },  
});

export default WelcomeScreen;
