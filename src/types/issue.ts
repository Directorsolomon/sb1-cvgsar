export type IssueStatus = 'open' | 'in-progress' | 'closed';
export type IssuePriority = 'low' | 'medium' | 'high';
export type IssueLabel = 'bug' | 'feature' | 'documentation' | 'enhancement';

export interface IssueBase {
  title: string;
  description: string;
  status: IssueStatus;
  priority?: IssuePriority;
  labels?: IssueLabel[];
  category: string;
  location: string;
}

export interface Issue extends IssueBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  assignedTo?: string;
  upvotes: number;
}

export type CreateIssuePayload = Omit<IssueBase, 'status'> & {
  status?: IssueStatus;
};

export type UpdateIssuePayload = Partial<IssueBase>;