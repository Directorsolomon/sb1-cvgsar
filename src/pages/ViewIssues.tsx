import { useState, useEffect } from 'react';
import ComplaintCard from '../components/ComplaintCard';

interface Issue {
  id: number;
  title: string;
  category: string;
  location: {
    state: string;
    lga: string;
  };
  description: string;
  imageUrl: string;
  date: string;
  upvotes: number;
}

// Mock data - replace with actual API call
const MOCK_ISSUES: Issue[] = [
  {
    id: 1,
    title: 'Pothole on Third Mainland Bridge',
    category: 'Roads',
    location: {
      state: 'Lagos',
      lga: 'Lagos Island'
    },
    description: 'Large pothole causing traffic and damage to vehicles',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/475569?text=Road+Infrastructure',
    date: '2024-03-15',
    upvotes: 45
  },
  {
    id: 2,
    title: 'Faulty Transformer in Ikeja',
    category: 'Electricity',
    location: {
      state: 'Lagos',
      lga: 'Ikeja'
    },
    description: 'Transformer has been malfunctioning for the past week',
    imageUrl: 'https://placehold.co/600x400/e2e8f0/475569?text=Electricity+Infrastructure',
    date: '2024-03-14',
    upvotes: 32
  }
];

export default function ViewIssues() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchIssues = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
        setIssues(MOCK_ISSUES);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filter === 'all' || issue.category.toLowerCase() === filter;
    const matchesSearch = searchTerm === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Infrastructure Issues</h1>

      {/* Filters and Search */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          aria-label="Filter issues by category"
          disabled={isLoading}
        >
          <option value="all">All Categories</option>
          <option value="roads">Roads</option>
          <option value="electricity">Electricity</option>
          <option value="water">Water Supply</option>
          <option value="drainage">Drainage</option>
          <option value="waste">Waste Management</option>
        </select>

        <input
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          disabled={isLoading}
        />
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Show skeleton cards while loading
          Array.from({ length: 6 }).map((_, index) => (
            <ComplaintCard key={index} isLoading={true} />
          ))
        ) : (
          filteredIssues.map((issue) => (
            <ComplaintCard
              key={issue.id}
              {...issue}
              isLoading={false}
            />
          ))
        )}
      </div>

      {!isLoading && filteredIssues.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No issues found matching your criteria
        </div>
      )}
    </div>
  );
}
