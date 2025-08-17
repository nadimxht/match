import React from 'react';
import { View, Text, Button } from 'react-native';

export default function EpisodeModeScreen() {
  const [inLobby, setInLobby] = React.useState(true);
  const [round, setRound] = React.useState(1);

  if (inLobby) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>🎬 Episode starts in: 02:15</Text>
        <Button title="Join Now" onPress={() => setInLobby(false)} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Round {round}</Text>
      <Text style={{ marginVertical: 8 }}>Prompt: "What's your ideal weekend?"</Text>
      <Button title="Submit Answer" onPress={() => setRound(r => r + 1)} />
    </View>
  );
}
