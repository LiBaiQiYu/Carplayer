# 深色/浅色主题切换动画实现文档

> 基于 View Transitions API + CSS clip-path 的圆形扩散动画，完美复刻 antfu.me 主题切换效果

---

## 效果预览

点击主题切换按钮时，以鼠标点击位置为圆心，圆形从 0 扩散到全屏，同时背景色平滑过渡。

---

## 核心技术

| 技术 | 用途 |
|---|---|
| View Transitions API | 浏览器原生页面过渡动画 |
| CSS clip-path | 圆形裁剪扩散效果 |
| CSS Custom Properties | 主题颜色变量 |
| localStorage | 主题偏好持久化 |

---

## 目录结构

```
src/
├── components/
│   └── ThemeToggle.tsx       # React 版本切换按钮
├── hooks/
│   └── useThemeToggle.ts     # 核心切换逻辑 Hook
├── styles/
│   └── theme.css             # CSS 变量与 View Transition 样式
├── App.tsx
└── main.tsx
```

---

## 1. CSS 样式 (theme.css)

```css
:root {
  --c-bg: #ffffff;
  --c-scrollbar: #eeeeee;
  --c-scrollbar-hover: #bbbbbb;
  color-scheme: light dark;
}

html {
  background-color: var(--c-bg);
  transition: background-color 0.3s ease;
}

html.dark {
  --c-bg: #050505;
  --c-scrollbar: #111111;
  --c-scrollbar-hover: #222222;
  color-scheme: dark;
}

/* View Transition 基础配置 */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}

/* 深色模式下 z-index 反转（动画方向反转） */
html.dark::view-transition-old(root) {
  z-index: 9999;
}

html.dark::view-transition-new(root) {
  z-index: 1;
}

/* 图片切换 */
html.dark [data-theme-img-light] {
  display: none;
}

html:not(.dark) [data-theme-img-dark] {
  display: none;
}
```

---

## 2. 核心 Hook (useThemeToggle.ts)

```typescript
import { useEffect, useCallback, useState } from 'react';

const STORAGE_KEY = 'color-scheme';

function getSystemPreference(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getStoredPreference(): 'light' | 'dark' | 'auto' {
  return (localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | 'auto') || 'auto';
}

function isDarkMode(): boolean {
  const stored = getStoredPreference();
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return getSystemPreference();
}

export function useThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => isDarkMode());

  // 初始化时应用主题
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // 切换主题核心函数
  const toggleTheme = useCallback((event: MouseEvent) => {
    const isAppearanceTransition =
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 浏览器不支持 View Transitions，直接切换
    if (!isAppearanceTransition) {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      localStorage.setItem(STORAGE_KEY, newIsDark ? 'dark' : 'light');
      return;
    }

    // 计算从点击位置到屏幕边缘的最大距离
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // 开始 View Transition
    const transition = document.startViewTransition(async () => {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      localStorage.setItem(STORAGE_KEY, newIsDark ? 'dark' : 'light');

      // 等待 DOM 更新完成
      await document.fonts.ready;
    });

    // 动画就绪后执行 clip-path 动画
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // 根据切换方向选择动画路径
      // 从亮到暗: 圆形扩散 (0 -> endRadius)
      // 从暗到亮: 圆形收缩 (endRadius -> 0)
      const animationPath = isDark ? clipPath : [...clipPath].reverse();

      document.documentElement.animate(
        {
          clipPath: animationPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          fill: 'forwards',
          pseudoElement: isDark
            ? '::view-transition-new(root)'
            : '::view-transition-old(root)',
        }
      );
    });
  }, [isDark]);

  // 主动设置主题
  const setTheme = useCallback((theme: 'light' | 'dark' | 'auto') => {
    localStorage.setItem(STORAGE_KEY, theme);
    if (theme === 'auto') {
      setIsDark(getSystemPreference());
    } else {
      setIsDark(theme === 'dark');
    }
  }, []);

  return { isDark, toggleTheme, setTheme };
}
```

---

## 3. 切换按钮组件 (ThemeToggle.tsx)

```tsx
import { useThemeToggle } from '../hooks/useThemeToggle';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-lg flex items-center justify-center
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* 太阳图标 - 深色模式显示 */}
      <svg
        className={`absolute w-5 h-5 transition-opacity duration-300
                    ${isDark ? 'opacity-100' : 'opacity-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* 月亮图标 - 浅色模式显示 */}
      <svg
        className={`absolute w-5 h-5 transition-opacity duration-300
                    ${isDark ? 'opacity-0' : 'opacity-100'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
```

---

## 4. 防止闪烁 (index.html)

在 `<head>` 中添加内联脚本，在 JS 加载前应用主题：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your App</title>
    <script>
      (function () {
        const prefersDark = window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
        const setting = localStorage.getItem('color-scheme') || 'auto';
        if (setting === 'dark' || (prefersDark && setting !== 'light')) {
          document.documentElement.classList.toggle('dark', true);
        }
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 5. 基础 CSS 样式

```css
/* 全局重置与基础样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--c-scrollbar) var(--c-bg);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--c-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--c-scrollbar);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--c-scrollbar-hover);
}

::selection {
  background: rgba(128, 128, 128, 0.25);
}

/* 文本颜色过渡 */
body {
  background-color: var(--c-bg);
  color: var(--c-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

---

## 6. 使用示例 (App.tsx)

```tsx
import { ThemeToggle } from './components/ThemeToggle';
import './styles/theme.css';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--c-bg)] text-[var(--c-text)]">
      {/* 导航栏 */}
      <nav className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </nav>

      {/* 内容区域 */}
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">主题切换动画</h1>
        <p>点击右上角的按钮体验圆形扩散动画效果。</p>

        {/* 图片示例 */}
        <div className="mt-8">
          <img
            src="/sun-icon.svg"
            data-theme-img-light
            alt="Sun"
            className="w-16 h-16"
          />
          <img
            src="/moon-icon.svg"
            data-theme-img-dark
            alt="Moon"
            className="w-16 h-16"
          />
        </div>
      </main>
    </div>
  );
}
```

---

## 动画原理图解

```
点击位置 (x, y)
       │
       │  endRadius = hypot(max(x, w-x), max(y, h-y))
       │
       ▼
    ┌─────────────────────────────────────┐
    │                                     │
    │         screen                      │
    │                                     │
    │              ● ← 点击位置             │
    │             ╱ ╲                      │
    │            ╱   ╲                     │
    │           ╱     ╲                    │
    │          ╱       ╲                   │
    │         ╱    ┌─────┐                  │
    │        ╱     │     │                 │
    │       ╱      │  ●  │  ← 圆形扩散      │
    │      ╱       │     │                 │
    │     ╱        └─────┘                  │
    │    ╱                                   │
    │   ╱                                     │
    │  ╱                                       │
    └─────────────────────────────────────┘

浅色 → 深色: clip-path 从 circle(0) 扩散到 circle(endRadius)
深色 → 浅色: clip-path 从 circle(endRadius) 收缩到 circle(0)
```

---

## 浏览器兼容性

| 特性 | 最低版本 |
|---|---|
| View Transitions API | Chrome 111+, Edge 111+, Safari 18+ |
| CSS clip-path | 全平台支持 |
| localStorage | 全平台支持 |

### 不支持时的降级处理

当浏览器不支持 View Transitions API 时，直接切换主题，无动画效果：

```typescript
if (!isAppearanceTransition) {
  setIsDark(!isDark);
  return;
}
```

### 减弱动效偏好

用户开启 `prefers-reduced-motion: reduce` 时，跳过动画：

```typescript
const isAppearanceTransition =
  'startViewTransition' in document &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## 完整文件清单

```
src/
├── components/
│   └── ThemeToggle.tsx
├── hooks/
│   └── useThemeToggle.ts
├── styles/
│   └── theme.css
├── App.tsx
└── main.tsx
index.html
```

---

## 参考来源

- [VueUse useDark()](https://vueuse.org/core/useDark/)
- [VitePress Theme Toggle PR #2347](https://github.com/vuejs/vitepress/pull/2347)
- [View Transitions API MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
