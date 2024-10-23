import axios from 'axios';
import axiosRetryDefault from 'axios-retry';
import { Issue, CreateIssuePayload, UpdateIssuePayload, PaginationParams, FilterParams } from '../types';
import { CustomError, handleApiError } from './errorHandling';

// Type the axiosRetry properly
const axiosRetry = axiosRetryDefault as any; // We'll replace 'any' with proper types

// Add User interface
interface User {
  id: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

// Create the API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Configure axios-retry
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
  },
});

// API endpoints with improved typing
export const getIssues = async (params?: PaginationParams & FilterParams): Promise<Issue[]> => {
  try {
    const response = await api.get<{ data: Issue[] }>('/issues', { params });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getIssueById = async (id: string): Promise<Issue> => {
  try {
    const response = await api.get<{ data: Issue }>(`/issues/${id}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createIssue = async (payload: CreateIssuePayload): Promise<Issue> => {
  try {
    const response = await api.post<{ data: Issue }>('/issues', payload);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateIssue = async (id: string, payload: UpdateIssuePayload): Promise<Issue> => {
  try {
    const response = await api.put<{ data: Issue }>(`/issues/${id}`, payload);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteIssue = async (id: string): Promise<void> => {
  try {
    await api.delete(`/issues/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

export const upvoteIssue = async (id: string): Promise<Issue> => {
  try {
    const response = await api.post<{ data: Issue }>(`/issues/${id}/upvote`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Auth endpoints with improved typing
export const login = async (username: string, password: string): Promise<{ token: string; user: User }> => {
  try {
    const response = await api.post<{ token: string; user: User }>('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const register = async (
  username: string, 
  password: string, 
  phoneNumber: string,
  captchaToken: string
): Promise<{ token: string; user: User }> => {
  try {
    const response = await api.post<{ token: string; user: User }>('/auth/register', {
      username,
      password,
      phoneNumber,
      captchaToken,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};