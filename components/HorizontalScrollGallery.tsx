"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, ShoppingBag, Tag, TrendingUp } from "lucide-react"

const items = [
  {
    id: 1,
    color: "#E5E4E2",
    label: "Summer Deals",
    subtitle: "Up to 70% Off",
    image: "/images/banners/summer-deals.jpg",
    icon: Tag,
  },
  {
    id: 2,
    color: "#F4F1E8",
    label: "New in Store",
    subtitle: "Fresh Arrivals",
    image: "/images/banners/new-in-store.jpg",
    icon: Sparkles,
  },
  {
    id: 3,
    color: "#C0C0C0",
    label: "New Bags",
    subtitle: "Exclusive Collection",
    image: "/images/banners/new-bags.jpg",
    icon: ShoppingBag,
  },
  {
    id: 4,
    color: "#E5E4E2",
    label: "Hot Deals",
    subtitle: "Limited Time Offers",
    image: "/images/banners/hot-deals.jpg",
    icon: TrendingUp,
  },
]

export default function HorizontalScrollGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      // Card dimensions
      const cardWidth = viewportWidth < 768 ? 340 : 450
      const gap = 40

      // Calculate initial offset to center first card
      const initialOffset = (viewportWidth / 2) - (cardWidth / 2)
      
      // Calculate total distance to move (from first card centered to last card centered)
      const totalDistance = (items.length - 1) * (cardWidth + gap)

      // Calculate how much of the section has been scrolled through
      if (rect.top <= 0 && rect.bottom > viewportHeight) {
        // Section is active and locked in viewport
        const scrolledIntoSection = -rect.top
        const scrollableHeight = sectionHeight - viewportHeight
        const progress = Math.min(Math.max(scrolledIntoSection / scrollableHeight, 0), 1)

        // Start with first card centered, end with last card centered
        setTranslateX(initialOffset - (progress * totalDistance))
      } else if (rect.top > 0) {
        // Before section - first card ready to be centered
        setTranslateX(initialOffset)
      } else {
        // After section - last card centered
        setTranslateX(initialOffset - totalDistance)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: '300vh' }}
    >
      {/* Sticky container that locks when section enters viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Title */}
        <div className="text-center mb-8 px-4">
          <h2 className="font-playfair text-4xl md:text-6xl text-silver tracking-wider uppercase mb-3">
            Explore Collections
          </h2>
          <p className="text-white-gold/60 text-xs uppercase tracking-[0.3em]">
            Scroll to discover
          </p>
        </div>

        {/* Cards container - positioned from left edge */}
        <div className="flex items-center w-full overflow-hidden">
          <div
            className="flex gap-[40px] will-change-transform"
            style={{ 
              transform: `translateX(${translateX}px)`,
              transition: 'transform 0.05s linear'
            }}
          >
            {items.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-[340px] md:w-[450px] h-[420px] md:h-[550px] rounded-xl relative overflow-hidden group cursor-pointer shadow-2xl bg-gradient-to-br from-neutral-900 to-black"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                      style={{
                        background: `linear-gradient(to bottom, transparent 30%, ${item.color}10 60%, ${item.color}30)`,
                      }}
                    />

                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all duration-500" />

                    {/* Content */}
                    <div className="absolute bottom-8 left-8 z-10 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          className="w-8 h-8 transition-all duration-500 group-hover:scale-110"
                          style={{ color: item.color }}
                        />
                        <span
                          className="font-mono text-sm tracking-wider"
                          style={{ color: item.color }}
                        >
                          0{item.id}
                        </span>
                      </div>
                      <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-white mb-2">
                        {item.label}
                      </h3>
                      <p className="text-white-gold text-lg font-light">
                        {item.subtitle}
                      </p>
                      <button className="mt-4 px-6 py-2 border border-silver text-silver hover:bg-silver hover:text-black transition-all duration-300 text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                        Shop Now
                      </button>
                    </div>

                    {/* Number Badge */}
                    <div
                      className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center font-mono text-lg font-bold border-2 backdrop-blur-sm"
                      style={{
                        borderColor: item.color,
                        color: item.color,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {item.id}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
