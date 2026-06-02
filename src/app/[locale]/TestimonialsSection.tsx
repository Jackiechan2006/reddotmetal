"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import AnimatedSection from "@/components/AnimatedSection"

export default function TestimonialsSection() {
  const t = useTranslations("home.testimonials")
  const items = t.raw("items") as { name: string; company: string; text: string; rating: number }[]

  return (
    <AnimatedSection className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-gray-400">{t("subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-[#1e293b] p-6"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-300 italic">"{item.text}"</p>
              <div className="border-t border-white/5 pt-3">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-gray-400">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
