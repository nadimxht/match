import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { useNavigation } from '@react-navigation/native';

export default function ProducerPicksScreen() {
  const picks = useAppStore((s) => s.dailyPicks);
  const startTicket = useAppStore((s) => s.startTicket);
  const nav = useNavigation();

  return (
    <FlatList
      data={picks}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, padding: 12 }}>
          <Image source={{ uri: item.photo }} style={{ width: '100%', height: 200, borderRadius: 12 }} />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>{item.name}, {item.age}</Text>
          <Text style={{ color: '#666' }}>{item.city} • {item.vibeMatch}% vibe match</Text>
          <TouchableOpacity
            style={{ marginTop: 8, backgroundColor: '#ff4f81', padding: 12, borderRadius: 8 }}
            onPress={() => {
              startTicket(item.id);
              // @ts-ignore
              nav.navigate('Tickets');
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Start Date Ticket</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
