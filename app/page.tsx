'use client'
import { motion } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-title">
          <h1>CarPlay Hub</h1>
          <p>车载互联兼容查询</p>
        </div>
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Overview */}
        <motion.div className="stats-wrapper" variants={itemVariants}>
          <StatsOverview brands={brands} />
        </motion.div>

        {/* Brand Pills */}
        <motion.div className="mobile-brand-wrapper" variants={itemVariants}>
          <MobileBrandSelector click={setIdx} brands={brands} selectedIndex={idx} />
        </motion.div>

        {/* Filter Bar */}
        <motion.div className="filter-wrapper" variants={itemVariants}>
          <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        </motion.div>

        {/* Search Bar */}
        <motion.div className="search-wrapper" variants={itemVariants}>
          <SearchBar value={search} onChange={setSearch} />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="main-wrapper"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Desktop: Side by side */}
        <div className="brand-wrapper-desktop">
          <BrandSelector click={setIdx} brands={brands} selectedIndex={idx} />
        </div>

        {/* Table */}
        <BasicTable index={idx} brands={brands} filter={filter} search={search} />
      </motion.div>
    </div>
  );
}
