'use client'
import { motion } from 'framer-motion';
import type { Brand } from '@/data/types';

interface StatsOverviewProps {
  brands: Brand[];
}

export default function StatsOverview({ brands }: StatsOverviewProps) {
  const totalBrands = brands.length;
  const totalCars = brands.reduce((acc, brand) => acc + brand.data.length, 0);

  const carplayCount = brands.reduce((acc, brand) =>
    acc + brand.data.filter(car => car.carplay).length, 0);
  const carlifeCount = brands.reduce((acc, brand) =>
    acc + brand.data.filter(car => car.carlife).length, 0);
  const hicarCount = brands.reduce((acc, brand) =>
    acc + brand.data.filter(car => car.hicar).length, 0);
  const iccoaCount = brands.reduce((acc, brand) =>
    acc + brand.data.filter(car => car.iccoa).length, 0);

  const stats = [
    { label: '总品牌', value: totalBrands, color: '' },
    { label: '总车型', value: totalCars, color: 'purple' },
    { label: 'CarPlay', value: carplayCount, color: 'carplay' },
    { label: 'CarLife', value: carlifeCount, color: 'carlife' },
    { label: 'HiCar', value: hicarCount, color: 'hicar' },
    { label: 'ICCOA', value: iccoaCount, color: 'iccoa' },
  ];

  return (
    <motion.div
      className="stats-card"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          className="stat-item"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
        >
          <span className="stat-label">{stat.label}</span>
          <span className={`stat-value ${stat.color}`}>{stat.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
