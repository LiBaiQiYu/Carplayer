'use client'
import { motion } from 'framer-motion';
import * as React from 'react';
import type { Brand } from '@/data/types';

interface MobileBrandSelectorProps {
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

export default function MobileBrandSelector({ click, brands, selectedIndex }: MobileBrandSelectorProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    click(index);

    setTimeout(() => {
      const container = scrollRef.current;
      if (container) {
        const items = container.querySelectorAll('.brand-pill');
        // Adjust index for "全部" which is at index 0
        const adjustedIndex = index === -1 ? 0 : index + 1;
        const item = items[adjustedIndex] as HTMLButtonElement;
        if (item) {
          const containerWidth = container.offsetWidth;
          const itemLeft = item.offsetLeft;
          const itemWidth = item.offsetWidth;
          const targetScroll = itemLeft - (containerWidth / 2) + (itemWidth / 2);
          container.scrollTo({ left: targetScroll, behavior: 'smooth' });
        }
      }
    }, 50);
  };

  const brandList = [
    { name: '全部', country: 'world' as const, isAll: true },
    ...brands
  ];

  return (
    <div className="brand-pills-container">
      <div ref={scrollRef} className="brand-pills-scroll">
        {brandList.map((item, idx) => {
          const isAll = 'isAll' in item && item.isAll;
          const actualIndex = isAll ? -1 : idx - 1;
          const isSelected = isAll ? selectedIndex === -1 : selectedIndex === actualIndex;
          return (
            <motion.button
              key={isAll ? 'all' : item.name}
              onClick={() => handleClick(actualIndex)}
              className={`brand-pill ${isSelected ? 'selected' : ''}`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.015 }}
            >
              <motion.div
                className="brand-pill-inner"
                initial={false}
                animate={isSelected ? 'selected' : 'default'}
                variants={{
                  default: {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  selected: {
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.25))',
                    borderColor: 'rgba(6, 182, 212, 0.7)',
                  }
                }}
              >
                <span className="brand-pill-flag">
                  {isAll ? '🌐' : countryFlags[item.country] || '🌐'}
                </span>
                <span className="brand-pill-name">
                  {isAll ? '全部' : item.name.split(' ')[0]}
                </span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
