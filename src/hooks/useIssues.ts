import { useState, useCallback } from 'react';
import { useIssuesStore } from '../store/issuesStore';
import { Issue, CreateIssuePayload, UpdateIssuePayload } from '../types';

export const useIssues = () => {
  const {
    issues,
    isLoading,
    error,
    fetchIssues,
    createNewIssue,
    updateExistingIssue,
    deleteExistingIssue,
    upvoteExistingIssue,
  } = useIssuesStore();

  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const handleCreateIssue = useCallback(async (payload: CreateIssuePayload) => {
    await createNewIssue(payload);
    fetchIssues();
  }, [createNewIssue, fetchIssues]);

  const handleUpdateIssue = useCallback(async (id: string, payload: UpdateIssuePayload) => {
    await updateExistingIssue(id, payload);
    fetchIssues();
  }, [updateExistingIssue, fetchIssues]);

  const handleDeleteIssue = useCallback(async (id: string) => {
    await deleteExistingIssue(id);
    fetchIssues();
  }, [deleteExistingIssue, fetchIssues]);

  const handleUpvoteIssue = useCallback(async (id: string) => {
    await upvoteExistingIssue(id);
    fetchIssues();
  }, [upvoteExistingIssue, fetchIssues]);

  return {
    issues,
    isLoading,
    error,
    selectedIssue,
    setSelectedIssue,
    fetchIssues,
    handleCreateIssue,
    handleUpdateIssue,
    handleDeleteIssue,
    handleUpvoteIssue,
  };
};