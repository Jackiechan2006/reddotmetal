"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, MessageCircle, Phone } from "lucide-react"
import AnimatedSection from "@/components/AnimatedSection"

export default function ServiceAreaContent() {
  const t = useTranslations("serviceArea")
  const areas = t.raw("areas") as { name: string; districts: string }[]

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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-12 text-center text-gray-300 leading-relaxed">{t("coverage")}</p>
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
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <h3 className="font-semibold text-white">{area.name} Singapore</h3>
                  <p className="mt-1 text-xs text-gray-400">{area.districts}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-white/10 bg-[#1e293b] p-6">
            <p className="text-sm text-gray-300">{t("industrialEstates")}</p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/6567891234"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-400"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a
              href="tel:+6567891234"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-[#0f172a] transition-colors hover:bg-amber-400"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?q=362%20Upper%20Paya%20Lebar%20Rd%2C%20%2305-15%20Da%20Jin%20Factory%20Building%2C%20Singapore%20534963&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Red Dot Metal Service Area"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
