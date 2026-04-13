'use client'
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

  return (
    <div className="brand-pills-container">
      <div ref={scrollRef} className="brand-pills-scroll">
        {/* All Brands Option */}
        <button
          onClick={() => handleClick(-1)}
          className={`brand-pill ${selectedIndex === -1 ? 'selected' : ''}`}
        >
          <span className="brand-pill-flag">🌐</span>
          <span className="brand-pill-name">全部</span>
        </button>

        {brands.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={item.name}
              onClick={() => handleClick(idx)}
              className={`brand-pill ${isSelected ? 'selected' : ''}`}
            >
              <span className="brand-pill-flag">{countryFlags[item.country] || '🌐'}</span>
              <span className="brand-pill-name">{item.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
