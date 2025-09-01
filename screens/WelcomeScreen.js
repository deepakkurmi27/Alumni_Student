import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d47a1" />

      {/* Logo */}
      <Image
        source={{ uri: "https://img.icons8.com/fluency/96/graduation-cap.png" }}
        style={styles.logo}
      />

      {/* White Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Alumni–Student Connect</Text>
        <Text style={styles.subtitle}>
          Bridging the gap between students and alumni for mentorship,
          networking, and growth.
        </Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d47a1", // deep professional blue
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d47a1",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },
  buttonPrimary: {
    backgroundColor: "#0d47a1",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#1565c0",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
