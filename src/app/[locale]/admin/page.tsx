"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      router.push("/en/admin/dashboard")
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 rounded-xl border border-white/10 bg-[#1e293b] p-8">
        <div className="text-center">
          <img src="/logo.jpg" alt="Red Dot Metal" className="mx-auto mb-4 h-12 w-auto" />
          <h1 className="text-xl font-bold text-white">Admin Login</h1>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm text-white focus:border-orange-500 outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-transparent px-4 py-2 text-sm text-white focus:border-orange-500 outline-none"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">Invalid credentials. Try admin@reddotmetal.com / admin123</p>}
        <button type="submit" className="w-full rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#0f172a] transition-colors hover:bg-orange-400">
          Sign In
        </button>
      </form>
    </div>
  )
}
