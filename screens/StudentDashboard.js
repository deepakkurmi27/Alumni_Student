// screens/StudentDashboard.js
import React, { useState } from 'react';
import { View, ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, Title, Paragraph, Avatar, Button, Appbar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileCard from '../components/ProfileCard';
import StudentChatScreen from './StudentChatScreen';

const Tab = createBottomTabNavigator();

// --- Dummy Data ---
const alumniInitialData = [
  { id: '1', name: 'Rahul Sharma', profession: 'Software Engineer at TCS', year: '3rd Year', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Priya Verma', profession: 'Data Analyst at Infosys', year: '3rd Year', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Amit Patel', profession: 'Product Manager at Amazon', year: '3rd Year', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const jobsData = [
  { id: "1", title: 'Software Developer Internship', company: 'XYZ Corp', location: 'Remote', deadline: 'Apply by 28th Aug' },
  { id: "2", title: 'Marketing Intern', company: 'ABC Pvt Ltd', location: 'New Delhi', deadline: 'Apply by 30th Aug' },
  { id: "3", title: 'Data Analyst Internship', company: 'DataTech', location: 'Bangalore', deadline: 'Apply by 5th Sep' },
];

const eventsData = [
  { id: "1", title: 'Tech Fest 2025', date: '25th Aug', description: 'Participate in coding competitions and workshops.' },
  { id: "2", title: 'Alumni Meet', date: '30th Aug', description: 'Reconnect with alumni and expand your network.' },
  { id: "3", title: 'Hackathon Week', date: '5th Sep', description: 'Team coding competitions with prizes.' },
];

const guidanceData = [
  { id: "1", alumniName: "Rahul Sharma", batch: "2020", title: "Career Tips for Freshers", content: "Focus on learning data structures and algorithms thoroughly...", timestamp: "2 hours ago" },
  { id: "2", alumniName: "Priya Verma", batch: "2019", title: "Infosys Recruitment Update", content: "Infosys is hiring for Data Analyst roles in Bangalore and Pune...", timestamp: "1 day ago" },
];

const student = {
  name: "Deepak Kurmi",
  branch: "Computer Science & Engineering",
  section: "CSE-3",
  year: "3rd Year",
  avatar: "https://i.pravatar.cc/300",
  about: "Passionate about coding, web & mobile development. Always eager to connect with alumni for mentorship and guidance."
};

// --- Reusable Post Card ---
function PostCard({ post }) {
  return (
    <Card style={{ margin: 10, borderRadius: 12, elevation: 2 }}>
      <Card.Content>
        <Title>{post.title}</Title>
        <Paragraph style={{ fontWeight: 'bold' }}>{post.alumniName} • Batch {post.batch}</Paragraph>
        <Paragraph style={{ marginTop: 5 }}>{post.content}</Paragraph>
        <Paragraph style={{ marginTop: 5, fontSize: 12, color: '#777' }}>{post.timestamp}</Paragraph>
      </Card.Content>
    </Card>
  );
}

// --- Home Screen ---
function HomeScreen() {
  const [alumniData, setAlumniData] = useState(alumniInitialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState('all'); // all or favorites
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (query) => setSearchQuery(query);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredData = alumniData.filter(alumni => {
    const matchSearch = alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        alumni.profession.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'favorites') return matchSearch && favorites.includes(alumni.id);
    return matchSearch;
  });

  const studentName = "Deepak Kurmi";
  const instituteName = "Sagar Institute of Science & Technology (SISTEC)";
  const year = "2025-2026";
  const logoUri = "https://i.ibb.co/7Q0YpB7/sistec-logo.png";

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7' }}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.studentName}>{studentName}</Text>
        </View>
        <Avatar.Image size={60} source={{ uri: logoUri }} />
      </View>

      {/* Institute Card */}
      <Card style={styles.instituteCard}>
        <Card.Content>
          <Text style={styles.instituteName}>{instituteName}</Text>
          <Text style={styles.instituteYear}>{year}</Text>
        </Card.Content>
      </Card>

      {/* Search Bar */}
      <Searchbar
        placeholder="Search alumni..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ margin: 10, borderRadius: 25, backgroundColor: '#fff', elevation: 2 }}
      />

      {/* Filter Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <Button mode={filter==='all'?'contained':'outlined'} onPress={()=>setFilter('all')}>All</Button>
        <Button mode={filter==='favorites'?'contained':'outlined'} onPress={()=>setFilter('favorites')}>Favorites</Button>
      </View>

      {/* Alumni List */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={{ margin: 10, borderRadius: 12, elevation: 2 }}>
            <Card.Title
              title={item.name}
              subtitle={`${item.profession} • ${item.year}`}
              left={(props) => <Avatar.Image {...props} source={{ uri: item.avatar }} />}
              right={() => (
                <Button onPress={() => toggleFavorite(item.id)}>
                  {favorites.includes(item.id) ? '★' : '☆'}
                </Button>
              )}
            />
          </Card>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: '#777' }}>No alumni found</Text>}
      />
    </ScrollView>
  );
}

// --- Jobs Screen ---
function JobsScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7', padding: 15 }}>
      {jobsData.map(job => (
        <Card key={job.id} style={styles.jobCard}>
          <Card.Content>
            <Title style={{ fontSize: 18 }}>{job.title}</Title>
            <Paragraph style={{ color: '#555', marginTop: 3 }}>{job.company}</Paragraph>
            <Paragraph style={{ color: '#555', marginTop: 1 }}>{job.location}</Paragraph>
            <Paragraph style={{ color: '#007bff', marginTop: 3 }}>{job.deadline}</Paragraph>
            <Button mode="contained" buttonColor="#007bff" textColor="#fff" style={{ marginTop: 10, borderRadius: 8 }}>Apply Now</Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// --- Events Screen ---
function EventsScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7', padding: 15 }}>
      {eventsData.map(event => (
        <Card key={event.id} style={[styles.jobCard, { backgroundColor: '#e0f0ff' }]}>
          <Card.Content>
            <Title style={{ fontSize: 18 }}>{event.title}</Title>
            <Paragraph style={{ color: '#555', marginTop: 3 }}>{event.date}</Paragraph>
            <Paragraph style={{ marginTop: 3 }}>{event.description}</Paragraph>
            <Button mode="contained" buttonColor="#007bff" textColor="#fff" style={{ marginTop: 10, borderRadius: 8 }}>Join</Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// --- Guidance Screen ---
function GuidanceScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6f9' }}>
      <Appbar.Header style={{ backgroundColor: "#007bff" }}>
        <Appbar.Content title="Alumni Guidance & News" />
      </Appbar.Header>

      <FlatList
        data={guidanceData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>No guidance posts yet</Text>}
      />
    </View>
  );
}

// --- Profile Screen ---
function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#e3e4e6ff' }}>
      <ProfileCard student={student} />
    </ScrollView>
  );
}

// --- Bottom Tab Navigator ---
export default function StudentDashboard() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { height: 60, paddingBottom: 15, backgroundColor: '#fff' },
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
      <Tab.Screen name="Chat" component={StudentChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  topSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', padding: 23, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  greeting: { color: '#fff', fontSize: 16 },
  studentName: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 5 },
  instituteCard: { margin: 15, padding: 15, borderRadius: 12, backgroundColor: '#fff', elevation: 4 },
  instituteName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  instituteYear: { fontSize: 14, textAlign: 'center', marginTop: 5, color: '#555' },
  content: { paddingHorizontal: 15, paddingBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#007bff' },
  jobCard: { marginVertical: 10, borderRadius: 12, elevation: 4, backgroundColor: '#fff', padding: 10 },
  card: { marginVertical: 10, borderRadius: 12, elevation: 2, backgroundColor: '#fff', padding: 10 },
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  header: { backgroundColor: '#007bff', elevation: 4 },
  profileContainer: { alignItems: 'center', marginTop: 30, marginBottom: 20 },
  profileName: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  profileSubtitle: { fontSize: 16, color: '#666', marginTop: 4 },
  aboutCard: { backgroundColor: '#ffffff' },
  statsCard: { backgroundColor: '#ffffff' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  cardParagraph: { fontSize: 16, lineHeight: 22, color: '#555' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#007bff' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4 },
});
