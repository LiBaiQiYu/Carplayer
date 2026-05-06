'use client'
import { motion } from 'framer-motion';
import * as React from 'react';
import type { Brand } from '@/data/types';

interface BrandSelectorProps {
  click: (index: number) => void;
  brands: Brand[];
  selectedIndex: number;
}

const countryFlags: Record<string, string> = {
  China: '🇨🇳',
  France: '🇫🇷',
  Germany: '🇩🇪',
  Japan: '🇯🇵',
  Korea: '🇰🇷',
  UK: '🇬🇧',
};

export default function BrandSelector({ click, brands, selectedIndex }: BrandSelectorProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    click(index);
  };

  React.useEffect(() => {
    const list = listRef.current;
    if (list) {
      const buttons = list.querySelectorAll('.brand-btn');
      // selectedIndex -1 (全部) is at index 0, actual brand indices are offset by 1
      const btnIndex = selectedIndex === -1 ? 0 : selectedIndex + 1;
      const btn = buttons[btnIndex] as HTMLButtonElement;
      if (btn) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedIndex]);

  const brandList = [
    { name: '全部', country: 'world' as const, isAll: true },
    ...brands
  ];

  return (
    <div className="glass-card brand-selector-desktop">
      {/* Header */}
      <div className="brand-selector-header">
        <span>品牌列表</span>
      </div>

      {/* Brand List */}
      <div ref={listRef} className="brand-selector-list">
        {brandList.map((item, idx) => {
          const isAll = 'isAll' in item && item.isAll;
          const actualIndex = isAll ? -1 : idx - 1;
          const isSelected = isAll ? selectedIndex === -1 : selectedIndex === actualIndex;
          return (
            <motion.button
              key={isAll ? 'all' : item.name}
              onClick={() => handleClick(actualIndex)}
              className={`brand-btn ${isSelected ? 'selected' : ''}`}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.02 }}
            >
              <motion.div
                className="brand-btn-inner"
                initial={false}
                animate={isSelected ? 'selected' : 'default'}
                variants={{
                  default: {
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  },
                  selected: {
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(139, 92, 246, 0.2))',
                    borderColor: 'rgba(6, 182, 212, 0.6)',
                    boxShadow: '0 8px 24px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  }
                }}
                whileHover="hover"
              >
                <span className="brand-flag">
                  {isAll ? '🌐' : countryFlags[item.country] || '🏎️'}
                </span>
                <span className="brand-name">{item.name}</span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="brand-selector-footer">
        <span>CARPLAY HUB</span>
      </div>
    </div>
  );
}
