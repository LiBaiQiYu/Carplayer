'use client'
import { ThemeToggle } from '@/components';
import type { FilterType } from '@/components/feature/FilterBar';
import BrandSelector from '@/components/feature/BrandSelector';
import MobileBrandSelector from '@/components/feature/MobileBrandSelector';
import StatsOverview from '@/components/feature/StatsOverview';
import FilterBar from '@/components/feature/FilterBar';
import SearchBar from '@/components/feature/SearchBar';
import BasicTable from '@/components/ui/BasicTable';
import { useState, useEffect } from "react";
import { brands } from "@/data";

export default function Home() {
  const [idx, setIdx] = useState(-1); // -1 means "全部"
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  // Search brand names and switch to matching brand, reset to all when cleared
  useEffect(() => {
    if (!search.trim()) {
      setIdx(-1);
      return;
    }

    const query = search.toLowerCase().trim();

    // Check if search matches a brand name exactly or starts with
    const matchedIndex = brands.findIndex(b =>
      b.name.toLowerCase() === query ||
      b.name.toLowerCase().startsWith(query)
    );

    if (matchedIndex !== -1) {
      setIdx(matchedIndex);
    }
  }, [search]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-title">
          <h1>CarPlay Hub</h1>
          <p>车载互联兼容查询</p>
        </div>
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
      </header>

      {/* Stats Overview */}
      <div className="stats-wrapper">
        <StatsOverview brands={brands} />
      </div>

      {/* Brand Pills */}
      <div className="mobile-brand-wrapper">
        <MobileBrandSelector click={setIdx} brands={brands} selectedIndex={idx} />
      </div>

      {/* Filter Bar */}
      <div className="filter-wrapper">
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      </div>

      {/* Search Bar */}
      <div className="search-wrapper">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Main Content */}
      <div className="main-wrapper">
        {/* Desktop: Side by side */}
        <div className="brand-wrapper-desktop">
          <BrandSelector click={setIdx} brands={brands} selectedIndex={idx} />
        </div>

        {/* Table */}
        <BasicTable index={idx} brands={brands} filter={filter} search={search} />
      </div>
    </div>
  );
}
