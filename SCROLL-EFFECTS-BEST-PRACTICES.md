# 🎢 Scroll Effects Best Practices

## Current Issue
Multiple components are using `window.scrollY` with separate scroll listeners, which causes:
- ❌ Performance issues (multiple event listeners)
- ❌ Scroll conflicts between effects
- ❌ Inconsistent animation timing
- ❌ Higher battery/CPU usage

## Current Setup (Before Optimization)

```
ParallaxHero.tsx        → window.scrollY listener
ProductBanner.tsx       → window.scrollY listener  
HorizontalScrollGallery.tsx → window.scrollY listener
= 3 separate scroll listeners on one page!
```

---

## ✅ Recommended Solutions

### Option 1: Intersection Observer API (Best for Production)

**Benefits:**
- ✅ Only triggers when section is visible
- ✅ Better performance (built-in browser API)
- ✅ No scroll listener needed
- ✅ Works with lazy loading

**Implementation:**
```typescript
'use client'

import { useEffect, useRef, useState } from 'react'

export default function OptimizedParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    if (ref.current) observer.observe(ref.current)
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return // Only listen when visible

    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const progress = 1 - (rect.top / window.innerHeight)
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <div ref={ref}>
      {/* Effect only active when visible */}
    </div>
  )
}
```

---

### Option 2: Single Scroll Manager (For Multiple Effects)

**Benefits:**
- ✅ One scroll listener for entire site
- ✅ All components subscribe to same data
- ✅ Easy to debug
- ✅ Centralized control

**Implementation:**

1. **Create scroll context:**
```typescript
// lib/scroll-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type ScrollData = {
  scrollY: number
  scrollX: number
  scrollDirection: 'up' | 'down'
}

const ScrollContext = createContext<ScrollData>({
  scrollY: 0,
  scrollX: 0,
  scrollDirection: 'down'
})

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: 'down'
  })

  useEffect(() => {
    let lastY = 0
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY
        setScrollData({
          scrollY: currentY,
          scrollX: window.scrollX,
          scrollDirection: currentY > lastY ? 'down' : 'up'
        })
        lastY = currentY
        ticking = false
      })
      
      ticking = true
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ScrollContext.Provider value={scrollData}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext)
```

2. **Add to layout:**
```typescript
// app/layout.tsx
import { ScrollProvider } from '@/lib/scroll-context'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ScrollProvider>
          <Header />
          {children}
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  )
}
```

3. **Use in components:**
```typescript
// components/ParallaxHero.tsx
import { useScroll } from '@/lib/scroll-context'

export default function ParallaxHero() {
  const { scrollY } = useScroll() // No new listener!

  return (
    <div style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
      {/* Content */}
    </div>
  )
}
```

---

### Option 3: CSS-Only Scroll Effects (Fastest)

**Benefits:**
- ✅ No JavaScript needed
- ✅ Hardware accelerated
- ✅ Best performance
- ✅ Works without JS

**Limitations:**
- ⚠️ Less control
- ⚠️ Limited to simple effects

**Implementation:**
```css
/* Use CSS scroll-timeline (experimental) */
@supports (animation-timeline: scroll()) {
  .parallax-element {
    animation: parallax linear;
    animation-timeline: scroll();
  }

  @keyframes parallax {
    from { transform: translateY(0); }
    to { transform: translateY(-100px); }
  }
}

/* Or use position: sticky creatively */
.sticky-effect {
  position: sticky;
  top: 0;
  transform: translateZ(0); /* Hardware acceleration */
}
```

---

## 🔧 Optimizations for Current Site

### Quick Fixes (Apply Now):

1. **Add `passive: true` to all scroll listeners:**
```typescript
window.addEventListener('scroll', handleScroll, { passive: true })
```

2. **Use `requestAnimationFrame` for scroll updates:**
```typescript
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateScrollEffect()
      ticking = false
    })
    ticking = true
  }
}
```

3. **Add `will-change` to animated elements:**
```tsx
<div style={{ willChange: 'transform' }}>
```

4. **Debounce or throttle scroll handlers:**
```typescript
import { useEffect, useRef } from 'react'

function useThrottledScroll(callback: () => void, delay: number) {
  const lastRun = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() - lastRun.current >= delay) {
        callback()
        lastRun.current = Date.now()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback, delay])
}
```

---

## 📊 Performance Comparison

| Method | Performance | Complexity | Browser Support |
|--------|-------------|------------|-----------------|
| CSS Only | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ (limited) |
| Intersection Observer | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Single Scroll Manager | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Multiple Listeners | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎯 Recommended Migration Path

### Phase 1: Quick Wins (Do Now)
1. ✅ Add `{ passive: true }` to all scroll listeners
2. ✅ Wrap scroll updates in `requestAnimationFrame`
3. ✅ Add `will-change: transform` to animated elements
4. ✅ Fix HorizontalScrollGallery card positioning

### Phase 2: Optimize (Next Update)
1. Implement Intersection Observer for each section
2. Only animate sections that are visible
3. Remove scroll listeners when not needed

### Phase 3: Refactor (Future)
1. Create centralized ScrollProvider
2. Convert all components to use context
3. Add scroll-based route transitions

---

## 🐛 Common Issues & Fixes

### Issue: Choppy scroll animations
**Fix:** Use `requestAnimationFrame` + `passive: true`

### Issue: High CPU usage when scrolling
**Fix:** Use Intersection Observer, only animate visible sections

### Issue: Mobile performance poor
**Fix:** Reduce animation complexity, use CSS transforms only

### Issue: Conflicts between scroll effects
**Fix:** Use single scroll manager or Intersection Observer per section

---

## 📱 Mobile Considerations

1. **Reduce motion on mobile:**
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (!prefersReducedMotion) {
  // Apply scroll effects
}
```

2. **Disable complex effects on low-end devices:**
```typescript
const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

if (!isLowEndDevice) {
  // Apply parallax effects
}
```

3. **Touch vs Scroll optimization:**
```typescript
const isTouchDevice = 'ontouchstart' in window

if (isTouchDevice) {
  // Simpler scroll effects for touch
}
```

---

## 🔗 Resources

- [Intersection Observer MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [requestAnimationFrame MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [CSS Scroll-Timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll)
- [Web Performance Best Practices](https://web.dev/performance/)

---

## Current Site Status

| Component | Scroll Listener | Status | Recommendation |
|-----------|----------------|--------|----------------|
| ParallaxHero | ✅ Yes | ⚠️ Needs optimization | Add Intersection Observer |
| ProductBanner | ✅ Yes | ⚠️ Needs optimization | Add Intersection Observer |
| HorizontalScrollGallery | ✅ Yes | ✅ Optimized | Already using passive + RAF |
| BrandCarousel | ❌ No (CSS) | ✅ Perfect | Keep as-is |

**Total Active Listeners:** 3 → Should be: 1 (with ScrollProvider) or 0 (with Intersection Observer)
