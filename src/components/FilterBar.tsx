import React from 'react';
import { nigeriaStates, lgasByState } from '../utils/nigeriaData';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    status: '',
    priority: '',
    category: '',
    state: '',
    lga: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    if (name === 'state') {
      newFilters.lga = '';
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <select
        name="priority"
        value={filters.priority}
        onChange={handleFilterChange}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="roads">Roads</option>
        <option value="electricity">Electricity</option>
        <option value="water">Water</option>
        <option value="waste">Waste Management</option>
        <option value="public-buildings">Public Buildings</option>
        <option value="other">Other</option>
      </select>
      <select
        name="state"
        value={filters.state}
        onChange={handleFilterChange}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All States</option>
        {nigeriaStates.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      <select
        name="lga"
        value={filters.lga}
        onChange={handleFilterChange}
        className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!filters.state}
      >
        <option value="">All LGAs</option>
        {filters.state && lgasByState[filters.state]?.map((lga) => (
          <option key={lga} value={lga}>{lga}</option>
        ))}
      </select>
    </div>
  );
};