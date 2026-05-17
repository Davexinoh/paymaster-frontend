import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Scene from '../components/Scene.jsx'
import { useReveal } from '../hooks/useReveal.js'

const API = 'https://paymaster-zero-backend.onrender.com'

const glass = {
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.13)',
  borderTop: '1px solid rgba(255,255,255,0.22)',
  backdropFilter: 'blur(36px) saturate(200%)',
  WebkitBackdropFilter: 'blur(36px) saturate(200%)',
  borderRadius: '22px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.12), 0 24px 72px rgba(0,0,0,0.5)',
}

const revealStyle = {
  opacity: 0, transform: 'translateY(28px)',
  transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)',
}

function R({ children, delay = 0, style = {}, tag: Tag = 'div' }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className="reveal" style={{
      ...revealStyle,
      transitionDelay: `${delay}s`,
      ...style
    }}>
      {children}
      <style>{`.reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </Tag>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ reputation: 100, jobsCompleted: 0, totalEarned: 0 })

  useEffect(() => {
    axios.get(`${API}/api/agent/status`).then(r => setStats(r.data)).catch(() => {})
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Scene />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '440px', margin: '0 auto', padding: '0 20px 80px' }}>

        {/* Nav */}
        <R>
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0 58px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderTop: '1px solid rgba(255,255,255,0.26)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, backdropFilter: 'blur(12px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 28px rgba(0,0,0,0.35)' }}>⚡</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Paymaster Zero</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em', marginTop: 1 }}>Autonomous Agent</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.11)', backdropFilter: 'blur(12px)', fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2dd4bf', boxShadow: '0 0 8px #2dd4bf, 0 0 18px rgba(45,212,191,0.4)', animation: 'blink 2.5s ease-in-out infinite' }} />
              Live
            </div>
          </nav>
        </R>

        {/* Hero */}
        <div style={{ marginBottom: 56 }}>
          <R delay={0.05}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 28, fontWeight: 400 }}>
              <div style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              Kite Chain · x402 Protocol
            </div>
          </R>
          <R delay={0.1}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 46, lineHeight: 1.03, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.93)', marginBottom: 22 }}>
              The Agent<br />That{' '}
              <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Works.<br />Gets Paid.
              </span>
            </h1>
          </R>
          <R delay={0.15}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', lineHeight: 1.9, maxWidth: 300, marginBottom: 36, fontWeight: 300, letterSpacing: '0.01em' }}>
              A fully autonomous commercial agent. Evaluates jobs, locks escrow onchain, executes via AI, and settles payment — without a human middleman.
            </p>
          </R>
          <R delay={0.2}>
            <button onClick={() => navigate('/auth')} style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.92)', color: '#080810', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase', boxShadow: '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)', transition: 'all 0.18s' }}
              onMouseEnter={e => { e.target.style.background = '#fff'; e.target.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.92)'; e.target.style.transform = 'translateY(0)' }}>
              Launch App →
            </button>
          </R>
        </div>

        {/* Stats */}
        <R>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 400 }}>
            Live Stats
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.09), transparent)' }} />
          </div>
        </R>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 32 }}>
          {[
            { val: stats.reputation, label: 'Reputation', accent: true },
            { val: stats.jobsCompleted, label: 'Jobs Done' },
            { val: `$${stats.totalEarned}`, label: 'Earned' },
          ].map((s, i) => (
            <R key={s.label} delay={i * 0.08}>
              <div style={{ ...glass, padding: '24px 12px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, lineHeight: 1, color: s.accent ? '#5eead4' : 'rgba(255,255,255,0.9)', marginBottom: 8, letterSpacing: '-0.02em' }}>{s.val}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 400 }}>{s.label}</div>
              </div>
            </R>
          ))}
        </div>

        {/* How it works */}
        <R>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            How It Works
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.09), transparent)' }} />
          </div>
        </R>
        <R>
          <div style={{ ...glass, overflow: 'hidden', marginBottom: 32 }}>
            {[
              { n: '01', t: 'Submit a Job', d: 'Describe your task. The agent evaluates complexity and quotes a price onchain.' },
              { n: '02', t: 'Lock Escrow', d: 'Funds lock via x402 protocol. No payment, no execution. Ever.' },
              { n: '03', t: 'Agent Executes', d: 'Groq + Gemini synthesis pipeline processes your task and delivers the result.' },
              { n: '04', t: 'Payment Settles', d: 'Approve delivery. Escrow releases to agent wallet. Reputation updates onchain.' },
            ].map((s, i, arr) => (
              <div key={s.n} style={{ display: 'flex', gap: 20, padding: '21px 24px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'background 0.18s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: 'rgba(255,255,255,0.18)', minWidth: 22, paddingTop: 2 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.78)', marginBottom: 6, letterSpacing: '-0.01em' }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.26)', lineHeight: 1.75, fontWeight: 300 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </R>

        {/* CTA */}
        <R>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            Ready?
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.09), transparent)' }} />
          </div>
        </R>
        <R>
          <div style={{ ...glass, padding: '36px 26px', textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: 'rgba(255,255,255,0.88)', marginBottom: 11, letterSpacing: '-0.02em' }}>Automate your payments.</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, marginBottom: 24, fontWeight: 300 }}>Connect your wallet and submit your first job in under 60 seconds.</div>
            <button onClick={() => navigate('/auth')} style={{ padding: '14px 28px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.92)', color: '#080810', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
              Get Started →
            </button>
          </div>
        </R>

        <R>
          <footer style={{ textAlign: 'center', fontSize: 9, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.22em', fontWeight: 400 }}>
            PAYMASTER ZERO · DAVEXINOH LABS · KITE CHAIN
          </footer>
        </R>
      </div>
    </div>
  )
}
