import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateIssueForm } from '../components/CreateIssueForm';
import { CreateIssuePayload } from '../types';
import { useIssuesStore } from '../store/issuesStore';

const ReportIssue: React.FC = () => {
  const navigate = useNavigate();
  const { createNewIssue } = useIssuesStore();

  const handleSubmit = async (data: CreateIssuePayload) => {
    try {
      await createNewIssue(data);
      alert('Issue reported successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error reporting issue:', error);
      alert('An error occurred while reporting the issue. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Report an Infrastructure Issue</h1>
      <div className="max-w-2xl mx-auto">
        <CreateIssueForm onSubmit={handleSubmit} isLoading={false} />
      </div>
    </div>
  );
};

export default ReportIssue;