import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function StepQuestion({
  question,
  options,
  value,
  onSelect,
  onChangeText,
  isInput = false,
}: {
  question: string;
  options?: string[];
  value?: string;
  onSelect?: (option: string) => void;
  onChangeText?: (text: string) => void;
  isInput?: boolean;
}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#ff6b81', marginBottom: 32 }}>{question}</Text>

      {isInput ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Type here..."
          style={{
            width: '80%',
            padding: 12,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#ccc',
            fontSize: 18,
            textAlign: 'center',
          }}
        />
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {options?.map((opt) => (
            <TouchableOpacity
              key={opt}
              onPress={() => onSelect && onSelect(opt)}
              style={{
                backgroundColor: value === opt ? '#ff6b81' : '#f8f9fa',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 20,
                margin: 8,
                borderWidth: value === opt ? 0 : 1,
                borderColor: '#ccc',
              }}
            >
              <Text style={{ color: value === opt ? '#fff' : '#000', fontSize: 16 }}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
