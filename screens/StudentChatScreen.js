// screens/StudentChatScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Avatar } from 'react-native-paper';


export default function StudentChatScreen() {
  const [chats, setChats] = useState([
    {
      alumniName: 'Rahul Sharma',
      messages: [
        { sender: 'alumni', text: 'Hello, student!' },
        { sender: 'student', text: 'Hi sir!' },
      ],
    },
    {
      alumniName: 'Priya Verma',
      messages: [
        { sender: 'alumni', text: 'Join our workshop.' },
      ],
    },
  ]);

  const [currentAlumni, setCurrentAlumni] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const updatedChats = chats.map((chat) => {
        if (chat.alumniName === currentAlumni.alumniName) {
          return {
            ...chat,
            messages: [...chat.messages, { sender: 'student', text: newMessage }],
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setCurrentAlumni(updatedChats.find(c => c.alumniName === currentAlumni.alumniName));
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f0f4f7' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Alumni Selection */}
      <FlatList
        horizontal
        data={chats}
        keyExtractor={(item) => item.alumniName}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setCurrentAlumni(item)}>
            <Avatar.Text
              size={60}
              label={item.alumniName.split(' ').map((n) => n[0]).join('')}
              style={[
                styles.avatar,
                item.alumniName === currentAlumni.alumniName ? { borderColor: '#007bff', borderWidth: 2 } : {},
              ]}
            />
            <Text style={{ textAlign: 'center', width: 70 }}>{item.alumniName.split(' ')[0]}</Text>
          </TouchableOpacity>
        )}
        style={{ padding: 10 }}
      />

      {/* Chat Messages */}
      <FlatList
        data={currentAlumni.messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'student' ? styles.studentBubble : styles.alumniBubble,
            ]}
          >
            <Text style={{ color: item.sender === 'student' ? '#fff' : '#000' }}>{item.text}</Text>
          </View>
        )}
        style={{ flex: 1, paddingHorizontal: 10 }}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avatar: { marginHorizontal: 5 },
  messageBubble: { padding: 10, marginVertical: 5, borderRadius: 12, maxWidth: '70%' },
  studentBubble: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
  alumniBubble: { backgroundColor: '#e0e0e0', alignSelf: 'flex-start' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, height: 45 },
  sendButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 20, marginLeft: 10 },
});
