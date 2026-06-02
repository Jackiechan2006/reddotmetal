"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { useTransition } from "react"
import { Globe } from "lucide-react"

const locales = [
  { code: "en", label: "EN" },
  { code: "ms", label: "MS" },
  { code: "zh", label: "中文" },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as "en" | "ms" | "zh" })
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-gray-400" />
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => handleChange(l.code)}
          disabled={isPending}
          className={`rounded px-1.5 py-0.5 text-xs font-medium transition-colors ${
            locale === l.code
              ? "bg-amber-500/20 text-amber-400"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
