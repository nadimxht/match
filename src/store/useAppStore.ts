import { create } from 'zustand';
import dayjs from 'dayjs';

type Match = {
  id: string;
  name: string;
  age: number;
  city: string;
  photo: string;
  vibe: number;
};

type Ticket = {
  id: string;
  match: Match;
  expiresAt: string;
  messages: { from: 'me' | 'them'; text: string }[];
  status: 'active' | 'closed';
};

interface AppState {
  dailyPicks: Match[];
  tickets: Ticket[];
  startTicket: (match: Match) => void;
  sendMessage: (ticketId: string, text: string, from: 'me' | 'them') => void;
  closeTicket: (ticketId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  dailyPicks: [
    { id: '1', name: 'Rania', age: 24, city: 'Tunis', photo: 'https://placekitten.com/300/300', vibe: 92 },
    { id: '2', name: 'Anis', age: 27, city: 'Sousse', photo: 'https://placekitten.com/301/300', vibe: 88 },
  ],
  tickets: [],
  startTicket: (match) => set((state) => ({
    tickets: [
      ...state.tickets,
      {
        id: Date.now().toString(),
        match,
        expiresAt: dayjs().add(24, 'hour').toISOString(),
        messages: [],
        status: 'active',
      }
    ]
  })),
  sendMessage: (ticketId, text, from) => set((state) => ({
    tickets: state.tickets.map(t => 
      t.id === ticketId ? { ...t, messages: [...t.messages, { from, text }] } : t
    )
  })),
  closeTicket: (ticketId) => set((state) => ({
    tickets: state.tickets.map(t => t.id === ticketId ? { ...t, status: 'closed' } : t)
  }))
}));
