'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'

const TIER_COLORS = {
  easy: 'text-green-400 border-green-400/30 bg-green-400/10',
  medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  hard: 'text-red-400 border-red-400/30 bg-red-400/10'
}

export default function ArenaPage() {
  const { levelId } = useParams()

  const [level, setLevel] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [historyLoad, setHistoryLoad] = useState(true)
  const [solved, setSolved] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)
  const [error, setError] = useState('')
  const [charCount, setCharCount] = useState(0)

  const chatEndRef = useRef(null)
  const textareaRef = useRef(null)

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    setMessages([])
    setSolved(false)
    setPointsEarned(0)
    setError('')
    setInput('')
    setCharCount(0)
    setLevel(null)
    setHistoryLoad(true)

    Promise.all([
      fetch(`/api/level/${levelId}`).then(r => r.json()),
      fetch(`/api/chat/${levelId}`).then(r => r.json())
    ])
      .then(([levelData, historyData]) => {
        if (levelData.level) {
          setLevel(levelData.level)
          if (levelData.level.status === 'solved') {
            setSolved(true)
            setPointsEarned(
              levelData.level.points_earned || levelData.level.points
            )
          }
        }

        if (historyData.messages?.length > 0) {
          setMessages(
            historyData.messages.map(m => ({
              role: m.role,
              text: m.message,
              solved: false
            }))
          )
        }
      })
      .catch(() => setError('Failed to load level.'))
      .finally(() => setHistoryLoad(false))
  }, [levelId])

  /* ---------------- AUTO SCROLL ---------------- */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  /* ---------------- SUBMIT ---------------- */

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || loading || solved) return

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setCharCount(0)
    setLoading(true)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ levelId, prompt: trimmed })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages(prev => prev.slice(0, -1))
        setError(data.error || 'Something went wrong.')
        return
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'agent',
          text: data.response,
          solved: data.solved,
          points: data.points
        }
      ])

      if (data.solved) {
        setSolved(true)
        setPointsEarned(data.points)
      }
    } catch {
      setMessages(prev => prev.slice(0, -1))
      setError('Network error.')
    } finally {
      setLoading(false)
      textareaRef.current?.focus()
    }
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit(e)
  }

  async function handleClearHistory() {
    if (!confirm('Clear chat history?')) return
    await fetch(`/api/chat/${levelId}`, { method: 'DELETE' })
    setMessages([])
  }

  /* ---------------- LOADING ---------------- */

  if (!level || historyLoad) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/30 font-mono text-xs">
          LOADING AGENT...
        </p>
      </div>
    )
  }

  /* ===================================================== */

  return (
    <div className="flex flex-col h-full w-full overflow-hidden overflow-x-hidden">

      {/* ---------- OBJECTIVE CARD ---------- */}

      <div className="border-b border-white/10 px-4 md:px-6 py-4 bg-white/5">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">

              <span className={`text-xs px-2 py-0.5 rounded border font-mono ${TIER_COLORS[level.tier]}`}>
                {level.tier.toUpperCase()}
              </span>

              {solved && (
                <span className="text-xs font-mono px-2 py-0.5 rounded border text-green-400 border-green-400/40 bg-green-400/10">
                  SOLVED ✓
                </span>
              )}

              {messages.length > 0 && !solved && (
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-white/30 hover:text-white"
                >
                  clear history
                </button>
              )}
            </div>

            <h2 className="text-white font-mono text-base sm:text-lg font-bold">
              &gt; {level.agent_name}
            </h2>

            <p className="text-white/50 text-xs font-mono">
              {level.objective_text}
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs text-white/30 font-mono">
              {solved ? 'EARNED' : 'REWARD'}
            </p>
            <p className="text-xl font-bold text-green-400 font-mono">
              {solved ? `+${pointsEarned}` : level.points}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- CHAT ---------- */}

      <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user'
              ? 'justify-end'
              : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-lg md:max-w-2xl
              rounded-xl px-4 py-3 font-mono text-xs sm:text-sm
              ${msg.role === 'user'
                ? 'bg-purple-600/20 border border-purple-500/30'
                : 'bg-white/5 border border-white/10'
              }`}
            >
              <p className="opacity-40 text-xs mb-1">
                {msg.role === 'user'
                  ? '> YOU'
                  : `> ${level.agent_name}`}
              </p>

              <p className="whitespace-pre-wrap break-words">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-purple-400 text-xs font-mono">
            {level.agent_name} typing...
          </p>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ---------- INPUT ---------- */}

      <div className="border-t border-white/10 px-3 sm:px-4 md:px-6 py-4 bg-white/5">

        {error && (
          <p className="text-red-400 text-xs mb-2 font-mono">
            {error}
          </p>
        )}

        {solved ? (
          <p className="text-green-400 text-center font-mono text-sm">
            ✓ LEVEL COMPLETE — +{pointsEarned}
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3">

              <textarea
                ref={textareaRef}
                value={input}
                rows={2}
                maxLength={2000}
                onChange={e => {
                  setInput(e.target.value)
                  setCharCount(e.target.value.length)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type prompt..."
                className="w-full bg-black/40 border border-white/10 rounded-xl
                px-3 py-3 text-sm text-white resize-none"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-full sm:w-auto bg-purple-600
                hover:bg-purple-500 px-5 py-3 rounded-xl
                font-mono text-sm"
              >
                {loading ? '...' : 'EXECUTE'}
              </button>
            </div>

            <p className="text-right text-white/20 text-xs mt-2">
              {charCount}/2000
            </p>
          </form>
        )}
      </div>
    </div>
  )
}