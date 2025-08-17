import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import dayjs from 'dayjs';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

export default function TicketChatScreen() {
  const route = useRoute<RouteProp<{ params: { ticketId: string } }, 'params'>>();
  const ticketId = route.params.ticketId;
  const tickets = useAppStore((s) => s.tickets);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const closeTicket = useAppStore((s) => s.closeTicket);
  const [input, setInput] = useState('');
  const nav = useNavigation();

  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return <Text>Ticket not found</Text>;

  const expiresIn = dayjs(ticket.expiresAt).diff(dayjs(), 'hour');

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 12, backgroundColor: '#ffe4ec', textAlign: 'center' }}>
        ⏳ Ticket expires in {expiresIn} hours
      </Text>

      <FlatList
        data={ticket.messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{
            alignSelf: item.from === 'me' ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === 'me' ? '#ff4f81' : '#eee',
            padding: 8,
            borderRadius: 8,
            margin: 4,
          }}>
            <Text style={{ color: item.from === 'me' ? '#fff' : '#000' }}>{item.text}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection: 'row', padding: 8 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message"
          style={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: 8, paddingHorizontal: 8 }}
        />
        <TouchableOpacity
          style={{ marginLeft: 8, backgroundColor: '#ff4f81', padding: 12, borderRadius: 8 }}
          onPress={() => {
            if (input.trim()) {
              sendMessage(ticketId, input.trim(), 'me');
              setInput('');
            }
          }}
        >
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ margin: 12, backgroundColor: '#222', padding: 12, borderRadius: 8 }}
        onPress={() => {
          closeTicket(ticketId);
          // @ts-ignore
          nav.navigate('TicketResult', { ticketId });
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>End Ticket</Text>
      </TouchableOpacity>
    </View>
  );
}
