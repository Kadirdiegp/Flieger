import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // In a real app, validate credentials with backend
          set({
            user: {
              id: '1',
              email,
              name: email.split('@')[0],
            },
            isAuthenticated: true,
          });
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      register: async (email: string, password: string, name: string) => {
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // In a real app, send registration data to backend
          set({
            user: {
              id: '1',
              email,
              name,
            },
            isAuthenticated: true,
          });
        } catch (error) {
          throw new Error('Registration failed');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    }
  )
);