import { useState, useCallback, useRef } from 'react';
import type { 
  Issue, 
  CreateIssuePayload, 
  UpdateIssuePayload, 
  PaginationParams, 
  FilterParams,
  ApiResponse 
} from '@/types';
import { getIssues, createIssue, updateIssue, deleteIssue } from '@/utils/api';

interface IssuesState {
  issues: Issue[];
  isLoading: boolean;
  error: Error | null;
  lastUpdated: number;
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
  filters: FilterParams;
}

export function useIssuesStore() {
  const [state, setState] = useState<IssuesState>({
    issues: [],
    isLoading: false,
    error: null,
    lastUpdated: 0,
    pagination: {
      page: 1,
      perPage: 10,
      total: 0
    },
    filters: {}
  });

  const operationCounter = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelPendingOperations = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const executeOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    errorMessage: string
  ): Promise<T> => {
    const currentOperation = ++operationCounter.current;
    
    cancelPendingOperations();
    
    abortControllerRef.current = new AbortController();
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const result = await operation();
      
      if (currentOperation === operationCounter.current) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          lastUpdated: Date.now() 
        }));
      }
      return result;
    } catch (error) {
      if (currentOperation === operationCounter.current) {
        const errorObj = error instanceof Error ? error : new Error(errorMessage);
        setState(prev => ({ ...prev, isLoading: false, error: errorObj }));
      }
      throw error;
    }
  }, [cancelPendingOperations]);

  const fetchIssues = useCallback(async (
    params?: PaginationParams & FilterParams
  ) => {
    await executeOperation(async () => {
      const response = await getIssues(params);
      setState(prev => ({
        ...prev,
        issues: response.data,
        pagination: response.metadata || prev.pagination,
        filters: params?.filters || {},
        lastUpdated: Date.now()
      }));
      return response;
    }, 'Failed to fetch issues');
  }, [executeOperation]);

  const createNewIssue = useCallback(async (
    payload: CreateIssuePayload
  ) => {
    await executeOperation(async () => {
      const newIssue = await createIssue(payload);
      setState(prev => ({
        ...prev,
        issues: [...prev.issues, newIssue],
        lastUpdated: Date.now()
      }));
      return newIssue;
    }, 'Failed to create issue');
  }, [executeOperation]);

  const updateExistingIssue = useCallback(async (
    id: string, 
    payload: UpdateIssuePayload
  ) => {
    await executeOperation(async () => {
      const updatedIssue = await updateIssue(id, payload);
      setState(prev => ({
        ...prev,
        issues: prev.issues.map(issue => 
          issue.id === id ? updatedIssue : issue
        ),
        lastUpdated: Date.now()
      }));
      return updatedIssue;
    }, 'Failed to update issue');
  }, [executeOperation]);

  const deleteExistingIssue = useCallback(async (
    id: string
  ) => {
    await executeOperation(async () => {
      await deleteIssue(id);
      setState(prev => ({
        ...prev,
        issues: prev.issues.filter(issue => issue.id !== id),
        lastUpdated: Date.now()
      }));
    }, 'Failed to delete issue');
  }, [executeOperation]);

  return {
    state,
    fetchIssues,
    createNewIssue,
    updateExistingIssue,
    deleteExistingIssue,
    cancelPendingOperations
  };
}