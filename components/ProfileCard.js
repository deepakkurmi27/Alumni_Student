// screens/ProfileScreen.js
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen() {
  const student = {
    name: "john Cena",
    branch: "Computer Science & Engineering",
    section: "CSE-3",
    year: "3rd Year",
    avatar: "https://i.pravatar.cc/300",
    cover: "https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=800&q=80",
    about: "Passionate about coding, web & mobile development. Always eager to connect with alumni for mentorship and guidance.",
    connections: 50,
    appliedJobs: 5,
    events: 3
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f4f7' }}>
      <Card style={styles.card}>
        {/* Cover Image */}
        <Image source={{ uri: student.cover }} style={styles.coverImage} />

        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <Avatar.Image size={120} source={{ uri: student.avatar }} style={styles.avatar} />
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.details}>{student.branch} • {student.section} • {student.year}</Text>
          <Text style={styles.about}>{student.about}</Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Icon name="account-multiple" size={22} color="#007bff" />
              <Text style={styles.statText}>{student.connections} Connections</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="briefcase" size={22} color="#007bff" />
              <Text style={styles.statText}>{student.appliedJobs} Jobs Applied</Text>
            </View>
            <View style={styles.statBox}>
              <Icon name="calendar" size={22} color="#007bff" />
              <Text style={styles.statText}>{student.events} Events</Text>
            </View>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop:80,
    margin: 15,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#d5d7e6ff',
  },
  coverImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  avatarContainer: {
    position: 'absolute',
    top: 100,
    left: 85,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatar: {},
  infoContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007bff',
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  about: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
});
