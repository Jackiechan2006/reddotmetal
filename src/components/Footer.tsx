"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Phone, Mail, MapPin } from "lucide-react"
import LanguageSwitcher from "./LanguageSwitcher"

const footerLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/contact", label: "contact" },
  { href: "/quote", label: "quote" },
]

export default function Footer() {
  const t = useTranslations("common")

  return (
    <footer className="border-t border-white/10 bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-500 text-sm font-bold text-[#0f172a]">
                RM
              </div>
              <span className="text-lg font-bold text-white">Red Dot Metal</span>
            </Link>
            <p className="text-sm text-gray-400">{t("footer.description")}</p>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-amber-400"
                  >
                    {t(`nav.${link.label}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                {t("footer.phone")}
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                {t("footer.email")}
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                {t("footer.address")}
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Operating Hours
            </h3>
            <div className="text-sm text-gray-400">
              <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
              <p>Sat: 8:00 AM – 1:00 PM</p>
              <p className="mt-2">Sun & Public Holidays: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  )
}
