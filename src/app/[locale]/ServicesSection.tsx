"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import {
  Truck,
  Scale,
  Building2,
  Recycle,
  Hammer,
  Cpu,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  "Scrap Collection": <Truck className="h-8 w-8" />,
  "Metal Trading": <Scale className="h-8 w-8" />,
  "Industrial Pickup": <Building2 className="h-8 w-8" />,
  Recycling: <Recycle className="h-8 w-8" />,
  "Ferrous Metals": <Hammer className="h-8 w-8" />,
  "Non-Ferrous Metals": <Cpu className="h-8 w-8" />,
}

const iconKeys: Record<string, string> = {
  "Scrap Collection": "Scrap Collection",
  "Metal Trading": "Metal Trading",
  "Industrial Pickup": "Industrial Pickup",
  "Recycling": "Recycling",
  "Ferrous Metals": "Ferrous Metals",
  "Non-Ferrous Metals": "Non-Ferrous Metals",
}

import AnimatedSection from "@/components/AnimatedSection"

export default function ServicesSection() {
  const t = useTranslations("home.services")
  const items = t.raw("items") as { title: string; desc: string }[]

  return (
    <AnimatedSection className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-gray-400">{t("subtitle")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border border-white/10 bg-[#1e293b] p-6 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-colors group-hover:bg-amber-500/20">
                {iconMap[item.title] || <Truck className="h-8 w-8" />}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
