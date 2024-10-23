import create from 'zustand';
import { Issue, CreateIssuePayload, UpdateIssuePayload, PaginationParams, FilterParams } from '../types';
import { getIssues, createIssue, updateIssue, deleteIssue, upvoteIssue, getIssueById } from '../utils/api';
import { CustomError, logError } from '../utils/errorHandling';

interface IssuesState {
  issues: Issue[];
  isLoading: boolean;
  error: CustomError | null;
  pagination: PaginationParams;
  filters: FilterParams;
  fetchIssues: () => Promise<void>;
  fetchIssueById: (id: string) => Promise<Issue>;
  createNewIssue: (payload: CreateIssuePayload) => Promise<void>;
  updateExistingIssue: (id: string, payload: UpdateIssuePayload) => Promise<void>;
  deleteExistingIssue: (id: string) => Promise<void>;
  upvoteExistingIssue: (id: string) => Promise<void>;
  setFilters: (filters: FilterParams) => void;
  setPagination: (pagination: PaginationParams) => void;
  clearError: () => void;
}

export const useIssuesStore = create<IssuesState>((set, get) => ({
  issues: [],
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10 },
  filters: {},

  fetchIssues: async () => {
    set({ isLoading: true, error: null });
    try {
      const { pagination, filters } = get();
      const issues = await getIssues({ ...pagination, ...filters });
      set({ issues, isLoading: false });
    } catch (error) {
      const customError = error instanceof CustomError 
        ? error 
        : new CustomError('Failed to fetch issues', 'FETCH_ERROR', { originalError: error });
      logError(customError);
      set({ error: customError, isLoading: false });
    }
  },

  fetchIssueById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const issue = await getIssueById(id);
      return issue;
    } catch (error) {
      const customError = error instanceof CustomError 
        ? error 
        : new CustomError('Failed to fetch issue', 'FETCH_ERROR', { originalError: error });
      logError(customError);
      set({ error: customError, isLoading: false });
      throw customError;
    } finally {
      set({ isLoading: false });
    }
  },

  createNewIssue: async (payload: CreateIssuePayload) => {
    set({ isLoading: true, error: null });
    try {
      const newIssue = await createIssue(payload);
      set(state => ({ issues: [...state.issues, newIssue], isLoading: false }));
    } catch (error) {
      const customError = error instanceof CustomError 
        ? error 
        : new CustomError('Failed to create issue', 'CREATE_ERROR', { originalError: error });
      logError(customError);
      set({ error: customError, isLoading: false });
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
      const customError = error instanceof CustomError 
        ? error 
        : new CustomError('Failed to update issue', 'UPDATE_ERROR', { originalError: error });
      logError(customError);
      set({ error: customError, isLoading: false });
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
      const customError = error instanceof CustomError 
        ? error 
        : new CustomError('Failed to delete issue', 'DELETE_ERROR', { originalError: error });
      logError(customError);
      set({ error: customError, isLoading: false });
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
      const customError = error instanceof CustomError 
        ? error 
        : new CustomError('Failed to upvote issue', 'UPVOTE_ERROR', { originalError: error });
      logError(customError);
      set({ error: customError, isLoading: false });
    }
  },

  setFilters: (filters: FilterParams) => set({ filters }),
  setPagination: (pagination: PaginationParams) => set({ pagination }),
  clearError: () => set({ error: null }),
}));