import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { AuthError, User as SupabaseUser } from '@supabase/supabase-js';

interface CustomUser extends SupabaseUser {
  user_metadata: {
    name: string;
  };
}

interface AuthState {
  user: CustomUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signup: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  setUser: (user: CustomUser | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      login: async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (data.user) {
          set({ user: data.user as CustomUser, isAuthenticated: true });
        }

        return { error };
      },

      signup: async (email: string, password: string, name: string) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });

        if (data.user) {
          set({ user: data.user as CustomUser, isAuthenticated: true });
        }

        return { error };
      },

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Initialize auth state from Supabase session
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setUser(session?.user as CustomUser || null);
});
