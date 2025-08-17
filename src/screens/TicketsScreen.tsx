import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import TicketCard from '../components/TicketCard';
import { useAppStore } from '../store/useAppStore';
import { useNavigation } from '@react-navigation/native';

export default function TicketsScreen() {
  const tickets = useAppStore((s) => s.tickets);
  const nav = useNavigation();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => nav.navigate('TicketChat', { ticketId: item.id })}>
            <TicketCard ticket={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No tickets available yet.</Text>}
      />
    </View>
  );
}
