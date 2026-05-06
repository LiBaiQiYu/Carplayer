'use client'
import { motion } from 'framer-motion';
import type { Brand, CarItem } from '@/data/types';
import type { FilterType } from '@/components/feature/FilterBar';

interface BasicTableProps {
  index: number;
  brands: Brand[];
  filter: FilterType;
  search: string;
}

function filterCars(cars: CarItem[], filter: FilterType, search: string): CarItem[] {
  let result = cars;

  if (filter !== 'all') {
    result = result.filter(car => {
      switch (filter) {
        case 'carplay': return car.carplay;
        case 'carlife': return car.carlife;
        case 'hicar': return car.hicar;
        case 'iccoa': return car.iccoa;
        default: return true;
      }
    });
  }

  if (search.trim()) {
    const query = search.toLowerCase();
    result = result.filter(car => car.name.toLowerCase().includes(query));
  }

  return result;
}

interface RowItem extends CarItem {
  brandName?: string;
}

function filterAllBrands(brands: Brand[], filter: FilterType, search: string): RowItem[] {
  let result: RowItem[] = [];

  for (const brand of brands) {
    const filteredCars = filterCars(brand.data, filter, search);
    for (const car of filteredCars) {
      result.push({ ...car, brandName: brand.name });
    }
  }

  return result;
}

export default function BasicTable({ index, brands, filter, search }: BasicTableProps) {
  const isAllBrands = index === -1;
  const brand: Brand | undefined = brands[index];
  const allRows: CarItem[] = brand?.data ?? [];
  const rows = isAllBrands
    ? filterAllBrands(brands, filter, search)
    : filterCars(allRows, filter, search);

  return (
    <div className="table-card">
      {/* Header */}
      <div className="table-header">
        <h2>{isAllBrands ? '全部品牌' : (brand?.name || '选择品牌')}</h2>
        <p>
          共 {rows.length} 款车型
          {filter !== 'all' && `（${filter === 'carplay' ? 'CarPlay' : filter === 'carlife' ? 'CarLife' : filter === 'hicar' ? 'HiCar' : 'ICCOA'}）`}
        </p>
      </div>

      {/* Table */}
      <div className="table-scroll">
        <table className="tech-table">
          <thead className="table-thead">
            <tr>
              {isAllBrands && <th>品牌</th>}
              <th>车型</th>
              <th>年份</th>
              <th>CarPlay</th>
              <th>CarLife</th>
              <th>HiCar</th>
              <th>ICCOA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.5) }}
              >
                {isAllBrands && (
                  <td>
                    <span className="car-brand">{(row as RowItem).brandName}</span>
                  </td>
                )}
                <td>
                  <div className="car-name">
                    {row.recommend && <span className="recommend-dot" />}
                    <span>{row.name}</span>
                  </div>
                </td>
                <td>
                  <span className="car-year">{row.year}</span>
                </td>
                <td>
                  <span className={`badge ${row.carplay ? 'badge-supported' : 'badge-unsupported'}`}>
                    {row.carplay ? '支持' : '不支持'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${row.carlife ? 'badge-supported' : 'badge-unsupported'}`}>
                    {row.carlife ? '支持' : '不支持'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${row.hicar ? 'badge-supported' : 'badge-unsupported'}`}>
                    {row.hicar ? '支持' : '不支持'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${row.iccoa ? 'badge-supported' : 'badge-unsupported'}`}>
                    {row.iccoa ? '支持' : '不支持'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {rows.length === 0 && (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}>
          暂无支持该协议的车款
        </div>
      )}

      {/* Footer / Legend */}
      <div className="table-footer">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--carplay)' }} />
          <span>CarPlay</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--carlife)' }} />
          <span>CarLife</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--hicar)' }} />
          <span>HiCar</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--iccoa)' }} />
          <span>ICCOA</span>
        </div>
      </div>
    </div>
  );
}
