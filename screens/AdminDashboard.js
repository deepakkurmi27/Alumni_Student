// screens/AdminDashboard.js
import React, { useState } from 'react';
import { View, ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Card, Title, Paragraph, Button, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MyInstituteScreen from './MyInstituteScreen';


const Tab = createBottomTabNavigator();

// --- Dummy Data ---
const initialStudents = [
  { id: '1', name: 'Deepak Kurmi', branch: 'CSE', year: '3rd Year', section: 'CSE-3' },
  { id: '2', name: 'Amit Patel', branch: 'IT', year: '2nd Year', section: 'IT-2' },
];

const initialAlumni = [
  { id: '1', name: 'Rahul Sharma', profession: 'Software Engineer at TCS', batch: '2020' },
  { id: '2', name: 'Priya Verma', profession: 'Data Analyst at Infosys', batch: '2019' },
];

const initialJobs = [
  { id: '1', title: 'Software Developer Internship', company: 'XYZ Corp', location: 'Remote', deadline: '28th Aug' },
];

const initialEvents = [
  { id: '1', title: 'Tech Fest 2025', date: '25th Aug', description: 'Coding competitions and workshops' },
];

const initialGuidance = [
  { id: '1', alumniName: 'Rahul Sharma', batch: '2020', title: 'Career Tips', content: 'Focus on learning DSA...', timestamp: '2h ago' },
];

// --- Reusable Card ---
function AdminCard({ item, type }) {
  return (
    <Card style={{ margin: 10,marginTop:40, borderRadius: 12, elevation: 2 }}>
      <Card.Content>
        {type === 'student' && (
          <>
            <Title>{item.name}</Title>
            <Paragraph>{item.branch} • {item.year} • {item.section}</Paragraph>
          </>
        )}
        {type === 'alumni' && (
          <>
            <Title>{item.name}</Title>
            <Paragraph>{item.profession} • Batch {item.batch}</Paragraph>
          </>
        )}
        {type === 'job' && (
          <>
            <Title>{item.title}</Title>
            <Paragraph>{item.company} • {item.location}</Paragraph>
            <Paragraph style={{ color: '#007bff' }}>{item.deadline}</Paragraph>
          </>
        )}
        {type === 'event' && (
          <>
            <Title>{item.title}</Title>
            <Paragraph>{item.date}</Paragraph>
            <Paragraph>{item.description}</Paragraph>
          </>
        )}
        {type === 'guidance' && (
          <>
            <Title>{item.title}</Title>
            <Paragraph>{item.alumniName} • Batch {item.batch}</Paragraph>
            <Paragraph>{item.content}</Paragraph>
            <Paragraph style={{ fontSize: 12, color: '#777' }}>{item.timestamp}</Paragraph>
          </>
        )}

        <Button mode="contained" buttonColor="#007bff" textColor="#fff" style={{ marginTop: 10, borderRadius: 8 }}>
          {type==='guidance'?'Moderate':'Edit / Delete'}
        </Button>
      </Card.Content>
    </Card>
  );
}

// --- Students Screen ---
function StudentsScreen() {
  const [students, setStudents] = useState(initialStudents);
  return (
    <FlatList
      data={students}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <AdminCard item={item} type="student" />}
      ListEmptyComponent={<Text style={{ textAlign:'center', marginTop:20, color:'#777' }}>No students found</Text>}
    />
  );
}

// --- Alumni Screen ---
function AlumniScreen() {
  const [alumni, setAlumni] = useState(initialAlumni);
  return (
    <FlatList
      data={alumni}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <AdminCard item={item} type="alumni" />}
      ListEmptyComponent={<Text style={{ textAlign:'center', marginTop:20, color:'#777' }}>No alumni found</Text>}
    />
  );
}


// --- Jobs Screen ---
function JobsScreen() {
  const [jobs, setJobs] = useState(initialJobs);
  return (
    <FlatList
      data={jobs}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <AdminCard item={item} type="job" />}
      ListEmptyComponent={<Text style={{ textAlign:'center', marginTop:20, color:'#777' }}>No jobs posted</Text>}
    />
  );
}

// --- Events Screen ---
function EventsScreen() {
  const [events, setEvents] = useState(initialEvents);
  return (
    <FlatList
      data={events}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <AdminCard item={item} type="event" />}
      ListEmptyComponent={<Text style={{ textAlign:'center', marginTop:20, color:'#777' }}>No events posted</Text>}
    />
  );
}

// --- Guidance Screen ---
function GuidanceScreen() {
  const [guidance, setGuidance] = useState(initialGuidance);
  return (
    <FlatList
      data={guidance}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <AdminCard item={item} type="guidance" />}
      ListEmptyComponent={<Text style={{ textAlign:'center', marginTop:20, color:'#777' }}>No guidance posts</Text>}
    />
  );
}

// --- Bottom Tab Navigator ---
export default function AdminDashboard() {
  return (
    <Tab.Navigator
      initialRouteName="Students"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { height: 60, paddingBottom: 10, backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if(route.name==='Students') iconName='account-group';
          else if(route.name==='Alumni') iconName='account-tie';
          else if(route.name==='Jobs') iconName='briefcase';
          else if(route.name==='Events') iconName='calendar';
          else if(route.name==='Guidance') iconName='lightbulb-on-outline';
          else if(route.name==='My Institute') iconName='school';

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Students" component={StudentsScreen} />
      <Tab.Screen name="Alumni" component={AlumniScreen} />
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Guidance" component={GuidanceScreen} />
      <Tab.Screen name="My Institute" component={MyInstituteScreen} />

    </Tab.Navigator>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  topSection: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#007bff', padding:23, borderBottomLeftRadius:15, borderBottomRightRadius:15 },
});
