import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';
import TopicButton from '../components/TopicButton';

export default function TicketChatScreen() {
  const route = useRoute<RouteProp<{ params: { ticketId: string } }, 'params'>>();
  const ticketId = route.params.ticketId;
  const tickets = useAppStore((s) => s.tickets);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const endChat = useAppStore((s) => s.endChat);
  const nav = useNavigation();

  const ticket = tickets.find((t) => t.id === ticketId);
  const [message, setMessage] = useState('');

  if (!ticket) return <Text>Ticket not found</Text>;

  const suggestedTopics = ['Favorite Movie', 'Travel', 'Hobbies', 'Music', 'Food'];

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f8f9fa' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ff6b81', marginBottom: 12 }}>
        Chat with {ticket.match.name}
      </Text>

      <FlatList
        data={ticket.messages || []}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 4, alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start', backgroundColor: item.sender === 'me' ? '#ff6b81' : '#4ecdc4', padding: 8, borderRadius: 12 }}>
            <Text style={{ color: '#fff' }}>{item.text}</Text>
          </View>
        )}
      />

      <ScrollView horizontal style={{ marginVertical: 12 }}>
        {suggestedTopics.map((topic) => (
          <TopicButton key={topic} title={topic} onPress={() => sendMessage(ticket.id, topic, 'me')} />
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TextInput
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12, marginRight: 8 }}
        />
        <Button title="Send" onPress={() => { sendMessage(ticket.id, message, 'me'); setMessage(''); }} />
      </View>

      <Button
        title="End Chat"
        color="#ff6b81"
        onPress={() => { endChat(ticket.id); nav.navigate('TicketResult', { ticketId: ticket.id }); }}
      />
    </View>
  );
}
