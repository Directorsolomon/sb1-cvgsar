import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IssueCard } from './IssueCard';
import { Issue } from '../types';

const mockIssue: Issue = {
  id: '1',
  title: 'Test Issue',
  description: 'This is a test issue',
  status: 'open',
  category: 'roads',
  location: 'Test Location',
  createdAt: '2024-03-15T10:30:00Z',
  updatedAt: '2024-03-15T10:30:00Z',
  priority: 'high',
  upvotes: 5,
  imageUrl: 'https://example.com/image.jpg',
  comments: [],
};

describe('IssueCard', () => {
  it('renders issue details correctly', () => {
    render(
      <BrowserRouter>
        <IssueCard issue={mockIssue} isAuthenticated={true} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockIssue.title)).toBeInTheDocument();
    expect(screen.getByText(mockIssue.description)).toBeInTheDocument();
    expect(screen.getByText(mockIssue.location)).toBeInTheDocument();
    expect(screen.getByText(`Upvotes: ${mockIssue.upvotes}`)).toBeInTheDocument();
  });

  it('renders status icon correctly', () => {
    render(
      <BrowserRouter>
        <IssueCard issue={mockIssue} isAuthenticated={true} />
      </BrowserRouter>
    );

    const statusIcon = screen.getByLabelText(`Status: ${mockIssue.status}`);
    expect(statusIcon).toBeInTheDocument();
  });

  it('links to the issue details page', () => {
    render(
      <BrowserRouter>
        <IssueCard issue={mockIssue} isAuthenticated={true} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/issue/${mockIssue.id}`);
  });
});