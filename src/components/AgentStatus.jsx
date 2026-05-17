import { useEffect, useState } from 'react'
import axios from 'axios'

const API = 'https://3ffa6724-d44e-4e3d-889e-3ebdfe98f205-00-u8l4r6oqnkc4.riker.replit.dev'
const glass = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderTop: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(36px) saturate(200%)', WebkitBackdropFilter: 'blur(36px) saturate(200%)', borderRadius: 22, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 72px rgba(0,0,0,0.5)' }

export default function AgentStatus() {
  const [s, setS] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/api/agent/status`).then(r => { setS(r.data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ textAlign: 'center', padding: 52, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontWeight: 300 }}>Loading agent...</div>
  if (!s) return <div style={{ textAlign: 'center', padding: 52, color: '#fb7185', fontSize: 13 }}>Agent offline</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[
          { val: s.reputation, label: 'Reputation', color: '#5eead4' },
          { val: s.jobsCompleted, label: 'Completed', color: 'rgba(255,255,255,0.88)' },
          { val: `$${s.totalEarned}`, label: 'Earned', color: 'rgba(255,255,255,0.88)' },
        ].map(x => (
          <div key={x.label} style={{ ...glass, padding: '22px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: x.color, lineHeight: 1, marginBottom: 7, letterSpacing: '-0.02em' }}>{x.val}</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 400 }}>{x.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...glass, overflow: 'hidden' }}>
        {[
          { label: 'Agent Online', desc: `Wallet: ${s.wallet?.slice(0,10)}...`, state: 'done' },
          { label: `Reputation ${s.reputation}/100`, desc: 'Performance score', state: s.reputation > 50 ? 'done' : 'active' },
          { label: `${s.jobsCompleted} Jobs Completed`, desc: `${s.jobsFailed} failed`, state: 'done' },
          { label: `$${s.totalEarned} Total Earned`, desc: 'USDT on Kite testnet', state: 'done' },
          { label: s.status === 'active' ? 'Accepting Work' : 'Suspended', desc: 'Current state', state: s.status === 'active' ? 'active' : 'pending' },
        ].map((step, i, arr) => (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 15, padding: '16px 24px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'background 0.15s', cursor: 'default' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, border: step.state === 'done' ? '2px solid rgba(52,211,153,0.6)' : step.state === 'active' ? '2px solid rgba(94,234,212,0.6)' : '2px solid rgba(255,255,255,0.12)', background: step.state === 'done' ? 'rgba(52,211,153,0.1)' : step.state === 'active' ? 'rgba(94,234,212,0.1)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: step.state === 'done' ? 'rgba(52,211,153,0.9)' : step.state === 'active' ? 'rgba(94,234,212,0.9)' : 'rgba(255,255,255,0.2)', boxShadow: step.state === 'active' ? '0 0 10px rgba(94,234,212,0.25)' : 'none' }}>
              {step.state === 'done' ? '✓' : step.state === 'active' ? '⟳' : '○'}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: step.state === 'done' ? 'rgba(52,211,153,0.88)' : step.state === 'active' ? 'rgba(94,234,212,0.88)' : 'rgba(255,255,255,0.25)', marginBottom: 3, letterSpacing: '-0.01em' }}>{step.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.24)', lineHeight: 1.6, fontWeight: 300 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
