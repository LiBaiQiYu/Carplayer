'use client'
import { motion } from 'framer-motion';
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
      {filters.map((filter, idx) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: idx * 0.03 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
}
