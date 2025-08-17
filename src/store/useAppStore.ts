import { create } from 'zustand';

type Ticket = {
  id: string;
  title: string;
  match: { name: string };
  expiresAt: string;
  matchPercentage: number;
  messages?: { id: string; text: string; sender: string; timestamp: string }[];
  chatEnded?: boolean;
};

type UserProfile = {
  age?: number;
  gender?: string;
  interests?: string[];
  bodyShape?: string;
  desiredMatch?: string;
};

type AppState = {
  userProfile: UserProfile;
  tickets: Ticket[];
  setUserProfile: (profile: UserProfile) => void;
  addTicket: (ticket: Ticket) => void;
  closeTicket: (ticketId: string) => void;
  sendMessage: (ticketId: string, text: string, sender: string) => void;
  endChat: (ticketId: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  userProfile: {},
  tickets: [{ id: '1', title: 'Ticket 1', match: { name: 'Alice' }, matchPercentage: 78, messages: [], expiresAt:"te" },
    { id: '2', title: 'Ticket 2', match: { name: 'Bob' }, matchPercentage: 85, messages: [], expiresAt:"te" },
    { id: '3', title: 'Ticket 3', match: { name: 'Charlie' }, matchPercentage: 92, messages: [], expiresAt:"te" },
  ],
  setUserProfile: (profile) => set({ userProfile: profile }),
  addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
  closeTicket: (ticketId) =>
    set((state) => ({ tickets: state.tickets.filter((t) => t.id !== ticketId) })),
  sendMessage: (ticketId, text, sender) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              messages: [...(t.messages || []), { id: Date.now().toString(), text, sender, timestamp: new Date().toISOString() }],
            }
          : t
      ),
    })),
  saveProfile: (profile) => set({ profile }),
  endChat: (ticketId) =>
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === ticketId ? { ...t, chatEnded: true } : t)),
    })),
}));
