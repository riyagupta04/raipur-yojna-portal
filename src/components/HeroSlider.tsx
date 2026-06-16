'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  '/hero1.png',
  '/hero2.png',
  '/hero3.png',
  '/hero4.png',
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // NEXT
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  // PREVIOUS
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">

      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            current === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide})`,
          }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/55" />

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/40"
      >
        <ChevronLeft size={28} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur hover:bg-white/40"
      >
        <ChevronRight size={28} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              current === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}