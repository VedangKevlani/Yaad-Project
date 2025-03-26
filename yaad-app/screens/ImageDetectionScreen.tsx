import React, { useState } from "react";
import { View, Text, Button, Image, ActivityIndicator, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const ImageDetectionScreen = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", 
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      detectImage(result.assets[0].uri);
    }
  };

  const detectImage = async (imageUri: string) => {
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "upload.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await axios.post("http://127.0.0.1:8000/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data.is_ai ? "This image is AI-generated." : "This is a real image.");
    } catch (error) {
      setResult("Error detecting image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Image Detection</Text>
      <Button title="Upload Image" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#00f" />}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginVertical: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
});

export default ImageDetectionScreen;
