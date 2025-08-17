import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function TicketCard({ ticket }: { ticket: { title: string; match: { name: string }; matchPercentage: number } }) {
  return (
    <Card style={{ marginBottom: 12, padding: 16, borderRadius: 12, backgroundColor: '#fff', elevation: 4 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ff6b81' }}>{ticket.title}</Text>
      <Text style={{ fontSize: 16, marginTop: 4 }}>Match: {ticket.match.name}</Text>
      <Text style={{ fontSize: 16, marginTop: 4 }}>Compatibility: {ticket.matchPercentage}%</Text>
    </Card>
  );
}
