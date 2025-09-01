// screens/MyInstituteScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

export default function MyInstituteScreen() {
  const [institute, setInstitute] = useState({
    name: "",
    email: "",
    location: "",
    logo: null,
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState("form"); // form | otp | saved | edit

  // Pick institute logo
  const pickLogo = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setInstitute((prev) => ({ ...prev, logo: result.assets[0].uri }));
      }
    } catch (error) {
      console.error("Image picking error:", error);
    }
  };

  // Simulate sending OTP
  const sendOtp = () => {
    if (!institute.email.includes("edu")) {
      Alert.alert("Invalid Email", "Please use a valid institute email.");
      return;
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    Alert.alert("OTP Sent", `Your OTP is ${otpCode}`);
    setStep("otp");
  };

  // Verify OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      Alert.alert("Success", "Institute verified successfully!");
      setStep("saved");
    } else {
      Alert.alert("Error", "Invalid OTP. Try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* FORM STEP */}
      {step === "form" && (
        <Card style={styles.card}>
          <Card.Title title="Register Your Institute" titleStyle={styles.title} />
          <Card.Content>
            <TouchableOpacity style={styles.logoPicker} onPress={pickLogo}>
              {institute.logo ? (
                <Image source={{ uri: institute.logo }} style={styles.logo} />
              ) : (
                <Text style={{ color: "#666" }}>Pick Institute Logo</Text>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Institute Name"
              value={institute.name}
              onChangeText={(text) => setInstitute({ ...institute, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Institute Email (only official)"
              keyboardType="email-address"
              value={institute.email}
              onChangeText={(text) => setInstitute({ ...institute, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Institute Location"
              value={institute.location}
              onChangeText={(text) => setInstitute({ ...institute, location: text })}
            />

            <TouchableOpacity style={styles.button} onPress={sendOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}

      {/* OTP STEP */}
      {step === "otp" && (
        <Card style={styles.card}>
          <Card.Title title="Email Verification" titleStyle={styles.title} />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={otp}
              onChangeText={(text) => setOtp(text)}
            />
            <TouchableOpacity style={styles.button} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      )}

      {/* SAVED INSTITUTE CARD */}
      {step === "saved" && (
        <Card style={styles.savedCard}>
          <Card.Content style={{ alignItems: "center" }}>
            {institute.logo && <Image source={{ uri: institute.logo }} style={styles.savedLogo} />}
            <Text style={styles.savedName}>{institute.name}</Text>
            <Text style={styles.savedText}>{institute.email}</Text>
            <Text style={styles.savedText}>{institute.location}</Text>
          </Card.Content>

          <TouchableOpacity
            style={[styles.button, { margin: 15 }]}
            onPress={() => setStep("form")}
          >
            <Text style={styles.buttonText}>Edit Institute</Text>
          </TouchableOpacity>
        </Card>
      )}
    </ScrollView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 15,
  },
  card: {
    borderRadius: 15,
    padding: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007bff",
    textAlign: "center",
  },
  logoPicker: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#eaeaea",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  savedCard: {
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    elevation: 6,
    alignItems: "center",
  },
  savedLogo: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  savedName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  savedText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});
