import create from 'zustand';
import { Issue, CreateIssuePayload, UpdateIssuePayload } from './types';
import { getIssues, createIssue, updateIssue, deleteIssue, upvoteIssue } from './utils/api';
import { CustomError } from './utils/errorHandling';

interface IssuesState {
  issues: Issue[];
  isLoading: boolean;
  error: CustomError | null;
  fetchIssues: () => Promise<void>;
  createNewIssue: (payload: CreateIssuePayload) => Promise<void>;
  updateExistingIssue: (id: string, payload: UpdateIssuePayload) => Promise<void>;
  deleteExistingIssue: (id: string) => Promise<void>;
  upvoteExistingIssue: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useIssuesStore = create<IssuesState>((set, get) => ({
  issues: [],
  isLoading: false,
  error: null,

  fetchIssues: async () => {
    set({ isLoading: true, error: null });
    try {
      const issues = await getIssues();
      set({ issues, isLoading: false });
    } catch (error) {
      set({ error: error as CustomError, isLoading: false });
    }
  },

  createNewIssue: async (payload: CreateIssuePayload) => {
    set({ isLoading: true, error: null });
    try {
      const newIssue = await createIssue(payload);
      set(state => ({ issues: [...state.issues, newIssue], isLoading: false }));
    } catch (error) {
      set({ error: error as CustomError, isLoading: false });
    }
  },

  updateExistingIssue: async (id: string, payload: UpdateIssuePayload) => {
    set({ isLoading: true, error: null });
    try {
      const updatedIssue = await updateIssue(id, payload);
      set(state => ({
        issues: state.issues.map(issue => issue.id === id ? updatedIssue : issue),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error as CustomError, isLoading: false });
    }
  },

  deleteExistingIssue: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteIssue(id);
      set(state => ({
        issues: state.issues.filter(issue => issue.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error as CustomError, isLoading: false });
    }
  },

  upvoteExistingIssue: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const updatedIssue = await upvoteIssue(id);
      set(state => ({
        issues: state.issues.map(issue => issue.id === id ? updatedIssue : issue),
        isLoading: false
      }));
    } catch (error) {
      set({ error: error as CustomError, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: CustomError | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, phoneNumber: string, captchaToken: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.token);
      set({ user: response.user, token: response.token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error as CustomError, isLoading: false });
    }
  },

  register: async (username: string, password: string, phoneNumber: string, captchaToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await register(username, password, phoneNumber, captchaToken);
      localStorage.setItem('token', response.token);
      set({ user: response.user, token: response.token, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error as CustomError, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null }),
}));