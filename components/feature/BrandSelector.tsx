'use client'
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

  return (
    <div className="glass-card brand-selector-desktop">
      {/* Header */}
      <div className="brand-selector-header">
        <span>品牌列表</span>
      </div>

      {/* Brand List */}
      <div ref={listRef} className="brand-selector-list">
        {/* All Brands Option */}
        <button
          onClick={() => handleClick(-1)}
          className={`brand-btn ${selectedIndex === -1 ? 'selected' : ''}`}
        >
          <span className="brand-flag">🌐</span>
          <span className="brand-name">全部</span>
        </button>

        {brands.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={item.name}
              onClick={() => handleClick(idx)}
              className={`brand-btn ${isSelected ? 'selected' : ''}`}
            >
              <span className="brand-flag">
                {countryFlags[item.country] || '🏎️'}
              </span>
              <span className="brand-name">{item.name}</span>
            </button>
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
