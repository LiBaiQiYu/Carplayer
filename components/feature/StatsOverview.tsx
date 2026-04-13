'use client'
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

  return (
    <div className="stats-card">
      <div className="stat-item">
        <span className="stat-label">总品牌</span>
        <span className="stat-value">{totalBrands}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">总车型</span>
        <span className="stat-value purple">{totalCars}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">CarPlay</span>
        <span className="stat-value carplay">{carplayCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">CarLife</span>
        <span className="stat-value carlife">{carlifeCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">HiCar</span>
        <span className="stat-value hicar">{hicarCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">ICCOA</span>
        <span className="stat-value iccoa">{iccoaCount}</span>
      </div>
    </div>
  );
}
