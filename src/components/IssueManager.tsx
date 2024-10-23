import React, { useEffect } from 'react';
import { IssueList, CreateIssueForm, FilterBar, Pagination } from '@/components';
import { useIssuesStore } from '@/hooks/useIssuesStore';
import type { CreateIssuePayload, FilterParams } from '@/types';

export function IssueManager() {
  const { 
    state: { issues, isLoading, error, pagination, filters },
    fetchIssues,
    createNewIssue,
    updateExistingIssue,
    deleteExistingIssue
  } = useIssuesStore();

  useEffect(() => {
    fetchIssues({
      page: pagination.page,
      perPage: pagination.perPage,
      ...filters
    });
  }, [fetchIssues, pagination.page, pagination.perPage, filters]);

  const handleCreateIssue = async (payload: CreateIssuePayload) => {
    await createNewIssue(payload);
  };

  const handleFilterChange = (newFilters: FilterParams) => {
    fetchIssues({
      page: 1,
      perPage: pagination.perPage,
      ...newFilters
    });
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded">
        {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FilterBar
        selectedStatus={filters.status}
        selectedPriority={filters.priority}
        selectedLabels={filters.labels}
        onFilterChange={handleFilterChange}
      />
      
      <CreateIssueForm
        onSubmit={handleCreateIssue}
        isLoading={isLoading}
      />
      
      <IssueList
        issues={issues}
        isLoading={isLoading}
        onStatusChange={async (id, status) => {
          await updateExistingIssue(id, { status });
        }}
        onDelete={async (id) => {
          await deleteExistingIssue(id);
        }}
      />
      
      <Pagination
        currentPage={pagination.page}
        totalPages={Math.ceil(pagination.total / pagination.perPage)}
        onPageChange={(page) => fetchIssues({
          page,
          perPage: pagination.perPage,
          ...filters
        })}
      />
    </div>
  );
}