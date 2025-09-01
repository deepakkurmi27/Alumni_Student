import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

// Import Screens
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import RoleSelection from "./screens/RoleSelectionScreen"
import StudentDashboard from "./screens/StudentDashboard"
import AlumniDashboard from "./screens/AlumniDashboard"
import AdminDashboard from "./screens/AdminDashboard"
// later you can add AlumniDashboard.js as well

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Menu (Sidebar Navigation)
function DrawerMenu() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0066ff" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#0066ff",
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={StudentDashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={SignupScreen} // later replace with actual Profile screen
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LoginScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="log-out-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Initial onboarding screens */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="AlumniDashboard" component={AlumniDashboard} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />

        {/* Main App after login/signup */}
        <Stack.Screen name="Main" component={DrawerMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
