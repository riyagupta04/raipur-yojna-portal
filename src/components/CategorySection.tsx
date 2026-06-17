'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Baby,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  Leaf,
  Palette,
  Users,
} from 'lucide-react'

const categoryIcons = {
  baby: Baby,
  'graduation-cap': GraduationCap,
  handshake: Handshake,
  'heart-pulse': HeartPulse,
  landmark: Landmark,
  leaf: Leaf,
  palette: Palette,
  users: Users,
}

export default function CategorySection({
  categories,
  allYojnas,
}: any) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.[0]?.slug || '',
  )

  const filteredYojnas = allYojnas.filter((yojna: any) => {
    return (
      typeof yojna.category === 'object' &&
      yojna.category?.slug === selectedCategory
    )
  })

  return (
    <section className="container py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">
          Scheme Categories
        </h2>

        <p className="mt-2 text-muted-foreground">
          Select a category to explore available government schemes
        </p>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category: any) => {
          const Icon =
            categoryIcons[
              (category.icon || 'landmark') as keyof typeof categoryIcons
            ] || Landmark

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`
                rounded-2xl
                border
                p-5
                text-center
                transition-all
                duration-300
                ${
                  selectedCategory === category.slug
                    ? 'border-green-600 bg-green-600 text-white shadow-lg'
                    : 'bg-white hover:border-green-500 hover:shadow-md'
                }
              `}
            >
              <div
                className={`
                  mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full
                  ${
                    selectedCategory === category.slug
                      ? 'bg-white text-green-600'
                      : 'bg-green-100 text-green-700'
                  }
                `}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="font-bold">
                {category.title}
              </h3>
            </button>
          )
        })}
      </div>

      {/* SCHEMES SECTION */}
      <div className="mt-12">
        <h3 className="mb-6 text-2xl font-bold">
          Available Schemes
        </h3>

        {filteredYojnas.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {filteredYojnas.map((yojna: any) => (
              <Link
                key={yojna.slug}
                href={`/yojnas/${yojna.slug}`}
                className="
                  rounded-xl
                  border
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  hover:-translate-y-1
                  hover:border-green-500
                  hover:shadow-lg
                "
              >
                <h4 className="font-bold text-lg">
                  {yojna.title}
                </h4>

                <p className="mt-3 text-sm text-muted-foreground">
                  Click to view scheme details, eligibility,
                  benefits and application process.
                </p>

                <div className="mt-4 font-semibold text-green-600">
                  View Details →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-white p-6 text-center">
            No schemes available in this category.
          </div>
        )}
      </div>
    </section>
  )
}