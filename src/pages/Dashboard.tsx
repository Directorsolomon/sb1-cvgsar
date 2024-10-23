import React, { useEffect } from 'react';
import { MapPin, Calendar, AlertTriangle, Filter, RefreshCcw, XCircle } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { useIssuesStore } from '../store';
import { FilterBar, IssueList, Pagination } from '../components';

const Dashboard: React.FC = () => {
  const { issues, isLoading, error, fetchIssues, clearError } = useIssuesStore();
  const [showFilters, setShowFilters] = React.useState(false);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const handleFilterChange = (filters: any) => {
    // Implement filter logic here
    console.log('Filters:', filters);
  };

  const handleRefresh = () => {
    fetchIssues();
  };

  const issueStatusCounts = {
    open: issues.filter(issue => issue.status === 'open').length,
    inProgress: issues.filter(issue => issue.status === 'in-progress').length,
    closed: issues.filter(issue => issue.status === 'closed').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        <FormattedMessage id="dashboard.title" />
      </h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="mr-2" />
              <div>
                <p className="font-bold"><FormattedMessage id="error.title" />: {error.code}</p>
                <p>{error.message}</p>
              </div>
            </div>
            <button onClick={clearError} className="text-red-700 hover:text-red-900">
              <XCircle size={24} />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Filter className="mr-2" size={18} />
          <FormattedMessage id={showFilters ? "filters.hide" : "filters.show"} />
        </button>
        <button
          onClick={handleRefresh}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <RefreshCcw className="mr-2" size={18} />
          <FormattedMessage id="dashboard.refresh" />
        </button>
      </div>

      {showFilters && (
        <div className="mb-8">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">
            <FormattedMessage id="dashboard.openIssues" />
          </h2>
          <p className="text-3xl font-bold text-blue-600">{issueStatusCounts.open}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">
            <FormattedMessage id="dashboard.inProgressIssues" />
          </h2>
          <p className="text-3xl font-bold text-yellow-600">{issueStatusCounts.inProgress}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">
            <FormattedMessage id="dashboard.closedIssues" />
          </h2>
          <p className="text-3xl font-bold text-green-600">{issueStatusCounts.closed}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : issues.length > 0 ? (
        <>
          <IssueList issues={issues} />
          <Pagination
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
          />
        </>
      ) : (
        <p className="text-center py-4 text-gray-600">
          <FormattedMessage id="dashboard.noIssues" />
        </p>
      )}
    </div>
  );
};

export default Dashboard;