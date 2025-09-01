// screens/RoleSelectionScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";


export default function RoleSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.icons8.com/color/96/graduation-cap.png" }}
        style={styles.logo}
      />

      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>
        Select your role to continue to your personalized dashboard
      </Text>

      {/* Student */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "#3498db" }]}
        onPress={() => navigation.navigate("StudentDashboard")}
      >
        <Text style={styles.cardText}>🎓 Student</Text>
      </TouchableOpacity>

      {/* Alumni */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "#2ecc71" }]}
        onPress={() => navigation.navigate("AlumniDashboard")}
      >
        <Text style={styles.cardText}>👨‍💼 Alumni</Text>
      </TouchableOpacity>

      {/* Admin */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "#e67e22" }]}
        onPress={() => navigation.navigate("AdminDashboard")}
      >
        <Text style={styles.cardText}>⚙️ Admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f6ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 4,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
