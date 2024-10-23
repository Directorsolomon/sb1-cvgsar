import React from 'react';
import { MapPin, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { Issue, IssueStatus } from '@/types';

interface IssueListProps {
  issues: Issue[];
  onStatusChange: (id: string, status: IssueStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const IssueList: React.FC<IssueListProps> = ({ issues, onStatusChange, onDelete }) => {
  const getStatusIcon = (status: IssueStatus) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="text-red-500" />;
      case 'in-progress':
        return <Clock className="text-yellow-500" />;
      case 'closed':
        return <CheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {issues.map((issue) => (
        <div key={issue.id} className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{issue.title}</h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon(issue.status)}
              <span className={`px-2 py-1 rounded text-sm ${
                issue.status === 'open' ? 'bg-red-100 text-red-800' :
                issue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {issue.status}
              </span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{issue.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{issue.location}, {issue.lga}, {issue.state}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <select
              value={issue.status}
              onChange={(e) => onStatusChange(issue.id, e.target.value as IssueStatus)}
              className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <button 
              onClick={() => onDelete(issue.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};