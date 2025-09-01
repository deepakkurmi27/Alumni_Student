// screens/AlumniDashboard.js
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatScreen from './ChatScreen';


const Tab = createBottomTabNavigator();

// --- Home Screen ---
function HomeScreen() {
  const alumniName = "Rahul Sharma";
  const instituteName = "Sagar Institute of Science & Technology (SISTEC)";
  const year = "Batch 2020";
  const logoUri = "https://i.ibb.co/7Q0YpB7/sistec-logo.png";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7' }}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.greeting}>Welcome Back</Text>
          <Text style={styles.alumniName}>{alumniName}</Text>
        </View>
        <Avatar.Image size={60} source={{ uri: logoUri }} />
      </View>

      <Card style={styles.instituteCard}>
        <Card.Content>
          <Text style={styles.instituteName}>{instituteName}</Text>
          <Text style={styles.instituteYear}>{year}</Text>
        </Card.Content>
      </Card>

      {/* Placeholder before latest jobs */}
      <Text style={styles.sectionTitle}>📢 Latest Jobs & Guidance</Text>
      <Text style={{ textAlign: 'center', color: '#777', marginBottom: 15 }}>
        Check Jobs and Guidance tabs below to post or view updates.
      </Text>
    </ScrollView>
  );
}

// --- Jobs Screen ---
function JobsScreen() {
  const [jobs, setJobs] = useState([
    { id: '1', title: 'Software Engineer', company: 'ABC Corp', location: 'Remote', deadline: '30th Aug' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const addJob = () => {
    if (newTitle && newCompany && newLocation && newDeadline) {
      const newJob = {
        id: (jobs.length + 1).toString(),
        title: newTitle,
        company: newCompany,
        location: newLocation,
        deadline: newDeadline,
      };
      setJobs([newJob, ...jobs]);
      setNewTitle(''); setNewCompany(''); setNewLocation(''); setNewDeadline('');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7', padding: 15 }}>
      {/* Job Input Form */}
      <TextInput placeholder="Job Title" value={newTitle} onChangeText={setNewTitle} style={styles.input} />
      <TextInput placeholder="Company" value={newCompany} onChangeText={setNewCompany} style={styles.input} />
      <TextInput placeholder="Location" value={newLocation} onChangeText={setNewLocation} style={styles.input} />
      <TextInput placeholder="Deadline" value={newDeadline} onChangeText={setNewDeadline} style={styles.input} />
      <TouchableOpacity style={styles.button} onPress={addJob}>
        <Text style={styles.buttonText}>Post Job</Text>
      </TouchableOpacity>

      {/* Jobs List */}
      {jobs.map((job) => (
        <Card key={job.id} style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{job.title}</Text>
            <Text>{job.company}</Text>
            <Text>{job.location}</Text>
            <Text style={{ color: '#007bff', marginTop: 5 }}>{job.deadline}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// --- Guidance Screen ---
function GuidanceScreen() {
  const [guidanceList, setGuidanceList] = useState([
    { id: '1', title: 'Interview Tips', content: 'Prepare for coding interviews with these strategies.', date: '25th Aug' },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addGuidance = () => {
    if (newTitle && newContent) {
      const newPost = { id: (guidanceList.length + 1).toString(), title: newTitle, content: newContent, date: new Date().toLocaleDateString() };
      setGuidanceList([newPost, ...guidanceList]);
      setNewTitle(''); setNewContent('');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7', padding: 15 }}>
      <TextInput placeholder="Title" value={newTitle} onChangeText={setNewTitle} style={styles.input} />
      <TextInput placeholder="Content" value={newContent} onChangeText={setNewContent} multiline style={[styles.input, { height: 80 }]} />
      <TouchableOpacity style={styles.button} onPress={addGuidance}>
        <Text style={styles.buttonText}>Post Guidance</Text>
      </TouchableOpacity>

      {guidanceList.map((item) => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
            <Text style={{ color: '#555', fontSize: 12 }}>{item.date}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// --- Events Screen ---
function EventsScreen() {
  const events = [
    { id: '1', title: 'Alumni Meetup', description: 'Networking session', date: '30th Aug' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7', padding: 15 }}>
      {events.map((event) => (
        <Card key={event.id} style={[styles.card, { backgroundColor: '#e0f0ff' }]}>
          <Card.Content>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={{ marginVertical: 5 }}>{event.date}</Text>
            <Text>{event.description}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// --- Profile Screen ---
function ProfileScreen() {
  const alumni = {
    name: "Rahul Sharma",
    branch: "Computer Science & Engineering",
    year: "Batch 2020",
    avatar: "https://i.pravatar.cc/300",
    about: "Alumni with 3 years experience. Interested in mentoring students.",
    connections: 120,
    postedJobs: 10,
    events: 5,
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7' }}>
      <Card style={styles.profileCard}>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=800&q=80' }} style={styles.coverImage} />
        <View style={styles.avatarContainer}>
          <Avatar.Image size={100} source={{ uri: alumni.avatar }} />
        </View>
        <View style={{ marginTop: 60, paddingHorizontal: 20, paddingBottom: 20 }}>
          <Text style={styles.name}>{alumni.name}</Text>
          <Text style={styles.details}>{alumni.branch} • {alumni.year}</Text>
          <Text style={styles.about}>{alumni.about}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Icon name="account-multiple" size={22} color="#007bff" />
              <Text style={styles.statText}>{alumni.connections} Connections</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="briefcase" size={22} color="#007bff" />
              <Text style={styles.statText}>{alumni.postedJobs} Jobs Posted</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="calendar" size={22} color="#007bff" />
              <Text style={styles.statText}>{alumni.events} Events</Text>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

// --- Bottom Tab Navigator ---
export default function AlumniDashboard() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { height: 60, paddingBottom: 10, backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Jobs') iconName = 'briefcase';
          else if (route.name === 'Events') iconName = 'calendar';
          else if (route.name === 'Guidance') iconName = 'lightbulb-on-outline';
          else if (route.name === 'Chat') iconName = 'chat';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Guidance" component={GuidanceScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  topSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', padding: 20, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  greeting: { color: '#fff', fontSize: 16 },
  alumniName: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  instituteCard: { margin: 15, padding: 15, borderRadius: 12, backgroundColor: '#fff', elevation: 4 },
  instituteName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  instituteYear: { fontSize: 14, textAlign: 'center', marginTop: 5, color: '#555' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#007bff' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginVertical: 5 },
  button: { backgroundColor: '#007bff', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: { marginVertical: 10, borderRadius: 12, elevation: 3, backgroundColor: '#fff', padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  profileCard: { margin: 15, borderRadius: 15, elevation: 5, backgroundColor: '#fff' },
  coverImage: { width: '100%', height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  avatarContainer: { position: 'absolute', top: 90, left: 20, borderWidth: 4, borderColor: '#fff', borderRadius: 50 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#007bff' },
  details: { fontSize: 16, color: '#555', marginVertical: 5 },
  about: { fontSize: 14, color: '#777', marginTop: 10, lineHeight: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  statBox: { alignItems: 'center', flex: 1 },
  statText: { fontSize: 12, color: '#555', marginTop: 4, textAlign: 'center' },
});
