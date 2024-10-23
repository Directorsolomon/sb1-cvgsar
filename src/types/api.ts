export interface ApiResponse<T> {
  data: T;
  metadata?: {
    total: number;
    page: number;
    perPage: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  status?: IssueStatus[];
  priority?: IssuePriority[];
  labels?: IssueLabel[];
  search?: string;
  createdBy?: string;
  assignedTo?: string;
  createdAfter?: string;
  createdBefore?: string;
  category?: string;
  location?: string;
}