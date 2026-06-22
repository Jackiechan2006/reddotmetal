"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import AnimatedSection from "@/components/AnimatedSection"

export default function ServiceAreaSection() {
  const t = useTranslations("home.serviceArea")
  const areas = t.raw("areas") as { name: string; districts: string }[]

  return (
    <AnimatedSection className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-gray-400">{t("subtitle")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#1e293b] p-5"
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
              <div>
                <h3 className="font-semibold text-white">{area.name} Singapore</h3>
                <p className="mt-1 text-xs text-gray-400">{area.districts}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-400">{t("cta")}</p>
      </div>
    </AnimatedSection>
  )
}
