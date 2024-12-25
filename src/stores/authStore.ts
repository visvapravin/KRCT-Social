import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      register: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          // Generate a random username (3 letters + 6 numbers)
          const username = `${email.substring(0, 3).toUpperCase()}${Math.random().toString().substring(2, 8)}`;
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          set({
            user: {
              id: Date.now().toString(),
              username,
              email,
              emailVerified: false
            },
            isAuthenticated: false,
            error: null
          });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // For demo, create a mock user
          set({
            user: {
              id: Date.now().toString(),
              username: `${email.substring(0, 3).toUpperCase()}${Math.random().toString().substring(2, 8)}`,
              email,
              emailVerified: true
            },
            isAuthenticated: true,
            error: null
          });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500));
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      verifyEmail: async (code: string) => {
        try {
          set({ isLoading: true });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          set(state => ({
            user: state.user ? { ...state.user, emailVerified: true } : null,
            isAuthenticated: true
          }));
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resetPassword: async (code: string, newPassword: string) => {
        try {
          set({ isLoading: true });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      sendPasswordReset: async (email: string) => {
        try {
          set({ isLoading: true });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      resendVerificationEmail: async () => {
        try {
          set({ isLoading: true });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteAccount: async (password: string) => {
        try {
          set({ isLoading: true });
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          set({ user: null, isAuthenticated: false });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);