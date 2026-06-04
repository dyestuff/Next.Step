'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      localStorage.setItem('admin_auth', 'true')
      router.push('/admin')
    } else {
      setError(true)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center mb-8 text-3xl font-bold">
          <span className="text-white">Next</span>
          <span className="text-blue-400">Step</span>
          <span className="block text-xs text-gray-500 font-normal mt-1">Admin Panel</span>
        </Link>

        <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-5">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-center">Sign In</h1>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(false) }}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">Please enter username and password</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </main>
  )
}
