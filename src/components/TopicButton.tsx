import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function TopicButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#4ecdc4',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 20,
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
  );
}
