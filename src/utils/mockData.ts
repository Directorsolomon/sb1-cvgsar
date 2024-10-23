import { Issue, Comment } from '../types';

const mockComments: Comment[] = [
  {
    id: '1',
    content: 'This is a serious issue that needs immediate attention.',
    author: 'John Doe',
    createdAt: '2024-03-16T10:30:00Z',
  },
  {
    id: '2',
    content: 'I\'ve noticed this problem too. Hope it gets fixed soon.',
    author: 'Jane Smith',
    createdAt: '2024-03-17T14:45:00Z',
  },
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic and potential damage to vehicles near the intersection of Main Street and Oak Avenue.',
    status: 'open',
    category: 'roads',
    location: 'Main Street, Lagos',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-15T10:30:00Z',
    priority: 'high',
    upvotes: 15,
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    comments: mockComments,
  },
  {
    id: '2',
    title: 'Faulty Street Light',
    description: 'Street light at the corner of Broad Street and King\'s Way has been flickering for weeks, causing visibility issues at night.',
    status: 'in-progress',
    category: 'electricity',
    location: 'Broad Street, Abuja',
    createdAt: '2024-03-14T15:45:00Z',
    updatedAt: '2024-03-16T09:30:00Z',
    priority: 'medium',
    upvotes: 8,
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    comments: [],
  },
  {
    id: '3',
    title: 'Broken Water Pipe',
    description: 'Water pipe burst on Eko Street, causing flooding and water waste. Urgent repair needed.',
    status: 'open',
    category: 'water',
    location: 'Eko Street, Lagos',
    createdAt: '2024-03-13T08:20:00Z',
    updatedAt: '2024-03-13T08:20:00Z',
    priority: 'high',
    upvotes: 20,
    imageUrl: 'https://images.unsplash.com/photo-1603813507806-0d06d3d10a3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    comments: [],
  },
];

export const getIssueById = (id: string): Issue | undefined => {
  return mockIssues.find(issue => issue.id === id);
};