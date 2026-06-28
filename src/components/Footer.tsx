"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"

const footerLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/testimonials", label: "testimonials" },
  { href: "/service-area", label: "serviceArea" },
  { href: "/prices", label: "prices" },
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
              <Image src="/logo.jpeg" alt="Red Dot Metals" width={120} height={40} className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-gray-400">{t("footer.description")}</p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://wa.me/6567891234"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400 transition-colors hover:bg-green-500/20"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="tel:+6567891234"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
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
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
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
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                {t("footer.phone")}
              </li>
              <li>
                <a
                  href="https://wa.me/6567891234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-gray-400 transition-colors hover:text-green-400"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {t("footer.whatsapp")}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                {t("footer.email")}
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
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
            <div className="pt-2">
              <Link href="/admin">
                <span className="text-xs text-gray-600 transition-colors hover:text-gray-400 cursor-pointer">
                  Admin Panel
                </span>
              </Link>
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
