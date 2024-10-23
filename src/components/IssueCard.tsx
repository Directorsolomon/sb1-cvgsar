import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, AlertTriangle, CheckCircle, Clock, ThumbsUp } from 'lucide-react';
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import { Issue } from '../types';

interface IssueCardProps {
  issue: Issue;
  isAuthenticated: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, isAuthenticated }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle aria-hidden="true" className="text-yellow-500" />;
      case 'in-progress':
        return <Clock aria-hidden="true" className="text-blue-500" />;
      case 'closed':
        return <CheckCircle aria-hidden="true" className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Link to={`/issue/${issue.id}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" role="article" aria-labelledby={`issue-title-${issue.id}`}>
        <div className="p-6">
          <h2 id={`issue-title-${issue.id}`} className="text-xl font-semibold mb-2">{issue.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin aria-hidden="true" size={16} className="mr-2" />
            <span>{issue.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar aria-hidden="true" size={16} className="mr-2" />
            <FormattedDate
              value={new Date(issue.createdAt)}
              year="numeric"
              month="long"
              day="numeric"
            />
          </div>
          <div className="flex items-center mb-4">
            {getStatusIcon(issue.status)}
            <span className="ml-2 text-sm font-medium" aria-label={`Status: ${issue.status}`}>
              <FormattedMessage id={`issue.status.${issue.status}`} />
            </span>
          </div>
          <div className="flex items-center">
            <ThumbsUp aria-hidden="true" size={20} className="mr-1 text-blue-500" />
            <FormattedMessage
              id="issue.upvotes"
              values={{ count: <FormattedNumber value={issue.upvotes} /> }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};