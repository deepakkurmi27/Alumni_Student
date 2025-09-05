import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [selectedInstitute, setSelectedInstitute] = useState("");
const institutes = ["Select Institute", "IIT Delhi", "NIT Jaipur", "BITS Pilani"];


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🚀 Join Alumni Connect</Text>
        <Text style={styles.subtitle}>
          Create your account and start connecting with alumni & mentors!
        </Text>

        {/* Name */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#e0e0e0"
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#e0e0e0"
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#e0e0e0"
        />

        {/* Role Selector */}
<Text style={styles.label}>Select Role</Text>
<View style={styles.roleContainer}>
  {["student", "alumni", "admin"].map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.roleButton,
        role === item && styles.activeRoleButton,
      ]}
      onPress={() => setRole(item)}
    >
      <Text
        style={[
          styles.roleText,
          role === item && styles.activeRoleText,
        ]}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  ))}
</View>

{/* Institute Dropdown - only for Student & Alumni */}
{(role === "student" || role === "alumni") && (
  <>
    <Text style={styles.label}>Select Your Institute</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedInstitute}
        onValueChange={(itemValue) => setSelectedInstitute(itemValue)}
        style={styles.picker}
        dropdownIconColor="#fff" // makes arrow white
      >
        {institutes.map((inst, index) => (
          <Picker.Item
            key={index}
            label={inst}
            value={inst}
            color={inst === "Select Institute" ? "#aaa" : "#000"}
          />
        ))}
      </Picker>
    </View>
  </>
)}


        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Go to Login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1a73e8", // Blue background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#4a90e2",
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#287ae6", // lighter blue
    fontSize: 16,
    color: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
    color: "#fff",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    width: "100%",
  },
  roleButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#4a90e2",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#287ae6",
  },
  activeRoleButton: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  roleText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  activeRoleText: {
    color: "#1a73e8",
    fontWeight: "700",
  },
  signupButton: {
    backgroundColor: "#34a853", // green for CTA
    paddingVertical: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 15,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  loginText: {
    color: "#e0e0e0",
    marginTop: 10,
    fontSize: 15,
  },
  loginLink: {
    color: "#fff",
    fontWeight: "600",
  },
  pickerContainer: {
  width: "100%",
  borderWidth: 1,
  borderColor: "#4a90e2",
  borderRadius: 12,
  marginBottom: 20,
  backgroundColor: "#287ae6",
},
picker: {
  color: "#fff",
  width: "100%",
},

});
