import type { Issue, CreateIssuePayload, UpdateIssuePayload, PaginationParams, FilterParams } from './index';

export interface UseAsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export interface UseAsyncActions<T> {
  execute: (promise: () => Promise<T>) => Promise<T>;
  reset: () => void;
}

export type UseAsync<T> = UseAsyncState<T> & UseAsyncActions<T>;

export interface UseIssuesReturn {
  issues: Issue[] | null;
  error: Error | null;
  isLoading: boolean;
  pagination: {
    total: number;
    page: number;
    perPage: number;
  };
  fetchIssues: (params?: PaginationParams & FilterParams) => Promise<void>;
  createIssue: (payload: CreateIssuePayload) => Promise<void>;
  updateIssue: (id: string, payload: UpdateIssuePayload) => Promise<void>;
  deleteIssue: (id: string) => Promise<void>;
}