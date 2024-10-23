export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  category: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  upvotes: number;
}

export interface CreateIssuePayload {
  title: string;
  description: string;
  category: string;
  location: string;
  status?: 'open' | 'in-progress' | 'closed';
}

export interface UpdateIssuePayload {
  title?: string;
  description?: string;
  category?: string;
  location?: string;
  status?: 'open' | 'in-progress' | 'closed';
}