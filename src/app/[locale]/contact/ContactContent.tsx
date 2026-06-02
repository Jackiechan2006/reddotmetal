"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import AnimatedSection from "@/components/AnimatedSection"
import ContactForm from "@/components/ContactForm"

const contactDetails = [
  { icon: Phone, label: "Phone", valueKey: "details.phone" },
  { icon: Mail, label: "Email", valueKey: "details.email" },
  { icon: MapPin, label: "Address", valueKey: "details.address" },
  { icon: Clock, label: "Hours", valueKey: "details.hours" },
]

export default function ContactContent() {
  const t = useTranslations("contact")

  return (
    <>
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1a1a2e] to-[#16213e]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white sm:text-5xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-400"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      <AnimatedSection className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="space-y-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon
                const value = t(detail.valueKey)
                return (
                  <div key={detail.label} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">{detail.label}</p>
                      <p className="text-sm text-white whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                )
              })}
              <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
                <div className="flex h-48 items-center justify-center bg-[#1e293b] text-gray-500">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8" />
                    <p className="text-sm">Map placeholder</p>
                    <p className="text-xs">15 Gul Way, Singapore 629198</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
