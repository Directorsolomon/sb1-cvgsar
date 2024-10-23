import { ReactNode } from 'react';
import type { Issue, IssueStatus, IssuePriority, IssueLabel } from './issue';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface IssueCardProps {
  issue: Issue;
  onStatusChange?: (id: string, status: IssueStatus) => Promise<void>;
  onPriorityChange?: (id: string, priority: IssuePriority) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export interface IssueListProps {
  issues: Issue[];
  isLoading?: boolean;
  error?: Error | null;
  onStatusChange?: (id: string, status: IssueStatus) => Promise<void>;
  onPriorityChange?: (id: string, priority: IssuePriority) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export interface CreateIssueFormProps {
  onSubmit: (data: CreateIssuePayload) => Promise<void>;
  isLoading?: boolean;
  error?: Error | null;
}

export interface FilterBarProps {
  selectedStatus?: IssueStatus[];
  selectedPriority?: IssuePriority[];
  selectedLabels?: IssueLabel[];
  onStatusChange: (status: IssueStatus[]) => void;
  onPriorityChange: (priority: IssuePriority[]) => void;
  onLabelChange: (labels: IssueLabel[]) => void;
  onSearchChange: (search: string) => void;
}