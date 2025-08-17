import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  OnboardingScreen,
  TicketsScreen,
  TicketChatScreen,
  TicketResultScreen,
  ProducerPicksScreen,
  EpisodeModeScreen,
} from '../index';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tickets" component={TicketsScreen} />
      <Stack.Screen name="TicketChat" component={TicketChatScreen} />
      <Stack.Screen name="TicketResult" component={TicketResultScreen} />
      <Stack.Screen name="Picks" component={ProducerPicksScreen} />
      <Stack.Screen name="Episode" component={EpisodeModeScreen} />
    </Stack.Navigator>
  );
}
