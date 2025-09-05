// --- Chat Screen ---
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

function ChatScreen() {
  const [chats, setChats] = useState([
    {
      studentName: 'Deepak Kurmi',
      messages: [
        { sender: 'student', text: 'Hello, sir!' },
        { sender: 'alumni', text: 'Hi Deepak! How are you?' },
      ],
    },
  ]);

  const [currentStudent, setCurrentStudent] = useState(chats[0]); // open first student by default
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const updatedChats = chats.map((chat) => {
        if (chat.studentName === currentStudent.studentName) {
          return {
            ...chat,
            messages: [...chat.messages, { sender: 'alumni', text: newMessage }],
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setCurrentStudent(updatedChats.find((c) => c.studentName === currentStudent.studentName));
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f0f4f7' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Student Selection */}
      <FlatList
        horizontal
        data={chats}
        keyExtractor={(item) => item.studentName}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setCurrentStudent(item)}>
            <Avatar.Text
              size={60}
              label={item.studentName.split(' ').map((n) => n[0]).join('')}
              style={[
                styles.avatar,
                item.studentName === currentStudent.studentName ? { borderColor: '#007bff', borderWidth: 2 } : {},
              ]}
            />
            <Text style={{ textAlign: 'center', width: 70 }}>{item.studentName.split(' ')[0]}</Text>
          </TouchableOpacity>
        )}
        style={{ padding: 10 }}
      />

      {/* Chat Messages */}
      <FlatList
        data={currentStudent.messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === 'alumni' ? styles.alumniBubble : styles.studentBubble,
            ]}
          >
            <Text style={{ color: item.sender === 'alumni' ? '#fff' : '#000' }}>{item.text}</Text>
          </View>
        )}
        style={{ flex: 1, paddingHorizontal: 10 }}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          placeholderTextColor={"#888"}
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
  alumniBubble: { backgroundColor: '#007bff', alignSelf: 'flex-end' },
  studentBubble: { backgroundColor: '#e0e0e0', alignSelf: 'flex-start' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, paddingHorizontal: 15, height: 45 },
  sendButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 20, marginLeft: 10 },
});

export default ChatScreen;
