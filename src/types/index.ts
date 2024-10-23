export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FilterParams {
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  votes: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssuePayload {
  title: string;
  description: string;
  priority: string;
}

export interface UpdateIssuePayload {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}

export interface User {
  id: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}