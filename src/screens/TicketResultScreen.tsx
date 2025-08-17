import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';

export default function TicketResultScreen() {
  const route = useRoute<RouteProp<{ params: { ticketId: string } }, 'params'>>();
  const ticketId = route.params.ticketId;
  const tickets = useAppStore((s) => s.tickets);
  const nav = useNavigation();

  const ticket = tickets.find((t) => t.id === ticketId);
  if (!ticket) return <Text>Ticket not found</Text>;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
        Chat with {ticket.match.name} ended!
      </Text>
      <Text style={{ marginBottom: 24 }}>Would you like a second date in real life?</Text>

      <Button title="Yes ✅" onPress={() => alert('Second date confirmed!')} />
      <View style={{ height: 12 }} />
      <Button title="No ❌" onPress={() => alert('Maybe next time!')} />

      <View style={{ height: 24 }} />
      <Button title="Back to Tickets" onPress={() => nav.navigate('Tickets')} />
    </View>
  );
}
