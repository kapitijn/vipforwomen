'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endDate: Date
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ endDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className={`flex gap-3 md:gap-6 ${className}`}>
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-silver/20 rounded-lg px-3 py-2 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px] shadow-lg">
              <div className="text-2xl md:text-4xl font-bold text-white text-center font-mono tabular-nums">
                {String(block.value).padStart(2, '0')}
              </div>
            </div>
            {/* Decorative shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
          </div>
          <div className="text-xs md:text-sm text-luxury-silver uppercase tracking-wider mt-2 font-medium">
            {block.label}
          </div>
          {/* Separator colon */}
          {index < timeBlocks.length - 1 && (
            <div className="absolute text-white text-2xl md:text-4xl font-bold -right-2 md:-right-4 top-2 md:top-4">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
