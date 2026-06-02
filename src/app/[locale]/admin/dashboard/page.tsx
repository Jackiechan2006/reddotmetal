"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Inquiry {
  id: string
  name: string
  company?: string
  phone: string
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth !== "true") {
      router.push("/en/admin")
      return
    }
    setAuthenticated(true)
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    const res = await fetch("/api/admin?type=inquiries")
    const data = await res.json()
    if (data.inquiries) setInquiries(data.inquiries)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    router.push("/en/admin")
  }

  if (!authenticated) return null

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button onClick={handleLogout} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:text-white">
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-[#1e293b] p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Recent Inquiries</h2>
            {inquiries.length === 0 ? (
              <p className="text-sm text-gray-400">No inquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="rounded-lg border border-white/5 bg-white/5 p-4">
                    <p className="font-semibold text-white">{inq.name}</p>
                    <p className="text-xs text-gray-400">{inq.company} · {inq.phone}</p>
                    <p className="mt-1 text-sm text-gray-300">{inq.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#1e293b] p-6">
            <h2 className="mb-4 text-lg font-bold text-white">Quick Links</h2>
            <div className="space-y-2">
              <a href="/en/prices" className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-amber-500/50">View Prices Page</a>
              <a href="/en/testimonials" className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-amber-500/50">View Testimonials Page</a>
              <a href="/en/service-area" className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-amber-500/50">View Service Area Page</a>
              <a href="/en/contact" className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition-colors hover:border-amber-500/50">View Contact Page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
