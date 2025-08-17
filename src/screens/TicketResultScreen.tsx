import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

export default function TicketResultScreen() {
  const route = useRoute<RouteProp<{ params: { ticketId: string } }, 'params'>>();
  const ticketId = route.params.ticketId;
  const tickets = useAppStore((s) => s.tickets);
  const ticket = tickets.find(t => t.id === ticketId);
  const nav = useNavigation();

  if (!ticket) return <Text>Ticket not found</Text>;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
        Ticket with {ticket.match.name} ended!
      </Text>
      <Text style={{ marginBottom: 24 }}>Would you like a second date?</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ backgroundColor: '#28a745', padding: 12, margin: 8, borderRadius: 8 }}
          onPress={() => alert('Second date confirmed!')}
        >
          <Text style={{ color: '#fff' }}>Yes ✅</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#dc3545', padding: 12, margin: 8, borderRadius: 8 }}
                    onPress={() => alert('Maybe next time ❌')}
        >
          <Text style={{ color: '#fff' }}>No ❌</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 32,
          padding: 12,
          backgroundColor: '#007bff',
          borderRadius: 8,
        }}
        onPress={() => nav.goBack()}
      >
        <Text style={{ color: '#fff' }}>Back to Tickets</Text>
      </TouchableOpacity>
    </View>
  );
}

