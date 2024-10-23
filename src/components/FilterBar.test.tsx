import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FilterBar } from './FilterBar';

describe('FilterBar', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);
  });

  it('renders all filter dropdowns', () => {
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter is changed', () => {
    const statusSelect = screen.getByLabelText('Status');
    fireEvent.change(statusSelect, { target: { value: 'open' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({ status: 'open' }));
  });

  it('resets filters when reset button is clicked', () => {
    const resetButton = screen.getByText('Reset Filters');
    fireEvent.click(resetButton);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      status: '',
      priority: '',
      category: '',
    });
  });
});