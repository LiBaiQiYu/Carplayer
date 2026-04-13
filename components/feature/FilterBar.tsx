'use client'
export type FilterType = 'all' | 'carplay' | 'carlife' | 'hicar' | 'iccoa';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'carplay', label: 'CarPlay' },
  { id: 'carlife', label: 'CarLife' },
  { id: 'hicar', label: 'HiCar' },
  { id: 'iccoa', label: 'ICCOA' },
];

export default function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-list">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
