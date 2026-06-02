"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./LanguageSwitcher"

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/services", label: "services" },
  { href: "/contact", label: "contact" },
]

export default function Navbar() {
  const t = useTranslations("common.nav")
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0f172a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-500 text-sm font-bold text-[#0f172a]">
            RM
          </div>
          <span className="text-lg font-bold text-white">Red Dot Metal</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-amber-400",
                isActive(link.href) ? "text-amber-400" : "text-gray-300"
              )}
            >
              {t(link.label)}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link href="/quote">
            <Button className="bg-amber-500 text-[#0f172a] hover:bg-amber-400 font-semibold">
              {t("quote")}
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0f172a] md:hidden">
          <div className="space-y-2 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-amber-400",
                  isActive(link.href) ? "text-amber-400" : "text-gray-300"
                )}
              >
                {t(link.label)}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
            <Link href="/quote" onClick={() => setOpen(false)} className="block pt-2">
              <Button className="w-full bg-amber-500 text-[#0f172a] hover:bg-amber-400 font-semibold">
                {t("quote")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
