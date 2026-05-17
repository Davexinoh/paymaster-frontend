import { useState } from 'react'
import axios from 'axios'

const API = 'https://paymaster-zero-backend.onrender.com'
const TYPES = [{ id: 'code_review', label: 'Code Review', icon: '⌥' }, { id: 'content', label: 'Content', icon: '✦' }, { id: 'analysis', label: 'Analysis', icon: '◈' }]
const LEVELS = [{ id: 'short', label: 'Short', price: 2, time: '15s' }, { id: 'medium', label: 'Medium', price: 5, time: '30s' }, { id: 'long', label: 'Long', price: 10, time: '45s' }]

const glass = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderTop: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(36px) saturate(200%)', WebkitBackdropFilter: 'blur(36px) saturate(200%)', borderRadius: 22, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 72px rgba(0,0,0,0.5)' }

const Label = ({ children }) => <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 11, fontWeight: 400 }}>{children}</div>

export default function SubmitJob({ wallet }) {
  const [type, setType] = useState('code_review')
  const [level, setLevel] = useState('medium')
  const [desc, setDesc] = useState('')
  const [phase, setPhase] = useState('form')
  const [job, setJob] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const lv = LEVELS.find(l => l.id === level)

  async function submit() {
    if (!desc.trim()) { setError('Add a description'); return }
    setLoading(true); setError('')
    try {
      const r = await axios.post(`${API}/api/job/submit`, { description: desc, taskType: type, inputLength: level, clientAddress: wallet })
      if (r.data.decision === 'reject') { setJob(r.data); setPhase('rejected') }
    } catch (e) {
      if (e.response?.status === 402) { setJob(e.response.data); setPhase('payment') }
      else setError('Submission failed.')
    }
    setLoading(false)
  }

  async function pay() {
    setLoading(true); setPhase('executing')
    try {
      const hdr = btoa(JSON.stringify({ authorization: { jobId: job.jobId, amount: lv.price, asset: 'USDT', network: 'kite-testnet' }, signature: '0xmock_' + Date.now() }))
      const r = await axios.post(`${API}/api/job/execute`, { jobId: job.jobId }, { headers: { 'X-PAYMENT': hdr } })
      setResult(r.data); setPhase('delivered')
    } catch { setError('Execution failed.'); setPhase('payment') }
    setLoading(false)
  }

  function reset() { setPhase('form'); setJob(null); setResult(null); setDesc(''); setError('') }

  const btnWhite = { padding: '15px 26px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.92)', color: '#080810', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }

  if (phase === 'rejected') return (
    <div style={{ ...glass, padding: '36px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 36, marginBottom: 14, opacity: 0.5 }}>✕</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: 'rgba(251,113,133,0.9)', marginBottom: 10 }}>Job Rejected</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.26)', marginBottom: 26, lineHeight: 1.8, fontWeight: 300 }}>{job?.reason}</div>
      <button onClick={reset} style={{ padding: '12px 26px', borderRadius: 11, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Try Again</button>
    </div>
  )

  if (phase === 'payment') return (
    <div style={{ ...glass, padding: 26, background: 'rgba(94,234,212,0.04)', border: '1px solid rgba(94,234,212,0.16)', borderTop: '1px solid rgba(94,234,212,0.26)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(94,234,212,0.09)', border: '1px solid rgba(94,234,212,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔒</div>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: 'rgba(94,234,212,0.9)' }}>Escrow Required</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.24)', marginTop: 3, fontWeight: 300 }}>x402 Protocol · Kite Testnet</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
        {[{ k: 'Amount', v: `$${lv.price} USDT`, c: 'rgba(94,234,212,0.88)' }, { k: 'Est. Time', v: lv.time, c: 'rgba(52,211,153,0.88)' }, { k: 'Protocol', v: 'x402', c: 'rgba(255,255,255,0.78)' }, { k: 'Network', v: 'kite-testnet', c: 'rgba(255,255,255,0.78)' }].map(d => (
          <div key={d.k} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '13px 14px' }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5, fontWeight: 400 }}>{d.k}</div>
            <div style={{ fontSize: 14, color: d.c, fontWeight: 500 }}>{d.v}</div>
          </div>
        ))}
      </div>
      {error && <div style={{ padding: '11px 14px', borderRadius: 11, background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.16)', fontSize: 11, color: '#fb7185', marginBottom: 14 }}>{error}</div>}
      <button onClick={pay} disabled={loading} style={{ width: '100%', padding: 16, borderRadius: 14, border: '1px solid rgba(94,234,212,0.25)', background: 'rgba(94,234,212,0.08)', color: 'rgba(94,234,212,0.88)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, cursor: 'pointer', transition: 'all 0.18s' }}>
        {loading ? 'Processing...' : '🔐 Confirm & Lock Escrow'}
      </button>
    </div>
  )

  if (phase === 'executing') return (
    <div style={{ ...glass, padding: '52px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 36, marginBottom: 18, display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: 'rgba(255,255,255,0.88)', marginBottom: 10 }}>Agent Executing</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.26)', lineHeight: 1.8, fontWeight: 300 }}>Groq → Gemini synthesis pipeline running...</div>
    </div>
  )

  if (phase === 'delivered') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ ...glass, padding: 26, background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.16)', borderTop: '1px solid rgba(52,211,153,0.26)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: 'rgba(52,211,153,0.9)' }}>✦ Output Ready</div>
          <div style={{ fontSize: 9, padding: '4px 12px', borderRadius: 100, background: 'rgba(52,211,153,0.09)', border: '1px solid rgba(52,211,153,0.2)', color: 'rgba(52,211,153,0.88)', letterSpacing: '0.08em', fontWeight: 400 }}>✓ SETTLED</div>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, marginBottom: 16, maxHeight: 200, overflowY: 'auto', whiteSpace: 'pre-wrap', fontWeight: 300 }}>{result?.result}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 15px', borderRadius: 12, background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.1)' }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3, fontWeight: 400 }}>Payment Settled</div>
            <div style={{ fontSize: 11, color: 'rgba(52,211,153,0.88)' }}>+${lv.price} USDT → agent wallet</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: 3, fontWeight: 400 }}>Network</div>
            <div style={{ fontSize: 11, color: 'rgba(52,211,153,0.88)' }}>kite-testnet</div>
          </div>
        </div>
      </div>
      <button onClick={reset} style={{ width: '100%', padding: 15, borderRadius: 14, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.38)', fontSize: 12, letterSpacing: '0.07em', cursor: 'pointer' }}>
        ⇠ Submit Another Job
      </button>
    </div>
  )

  return (
    <div style={{ ...glass, padding: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <Label>Task Type</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {TYPES.map(t => (
              <button key={t.id} onClick={() => setType(t.id)} style={{ padding: '15px 8px', borderRadius: 15, border: `1px solid ${type === t.id ? 'rgba(94,234,212,0.28)' : 'rgba(255,255,255,0.09)'}`, background: type === t.id ? 'rgba(94,234,212,0.08)' : 'rgba(255,255,255,0.04)', color: type === t.id ? 'rgba(94,234,212,0.88)' : 'rgba(255,255,255,0.28)', fontSize: 11, letterSpacing: '0.03em', textAlign: 'center', cursor: 'pointer', transition: 'all 0.18s', boxShadow: type === t.id ? 'inset 0 1px 0 rgba(94,234,212,0.12), 0 0 22px rgba(94,234,212,0.07)' : 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: 20, marginBottom: 7 }}>{t.icon}</div>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the task you need completed..." rows={3}
            style={{ width: '100%', background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 15, padding: '15px 17px', color: 'rgba(255,255,255,0.8)', fontSize: 13, resize: 'none', outline: 'none', lineHeight: 1.8, fontWeight: 300, transition: 'border-color 0.18s', boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25)' }}
            onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.18)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.09)'} />
        </div>

        <div>
          <Label>Complexity</Label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {LEVELS.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)} style={{ padding: '15px 8px', borderRadius: 15, border: `1px solid ${level === l.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.09)'}`, background: level === l.id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)', color: level === l.id ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.28)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.18s', boxShadow: level === l.id ? 'inset 0 1px 0 rgba(255,255,255,0.12)' : 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>${l.price}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.5, fontWeight: 400 }}>{l.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '17px 19px', borderRadius: 15, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderTop: '1px solid rgba(255,255,255,0.18)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09)' }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 400 }}>Quote</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>${lv.price} USDT</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 12, color: 'rgba(255,255,255,0.22)', lineHeight: 1.8, fontWeight: 300 }}>
            ~{lv.time} estimated<br />kite-testnet
          </div>
        </div>

        {error && <div style={{ padding: '11px 14px', borderRadius: 11, background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.15)', fontSize: 11, color: '#fb7185' }}>{error}</div>}

        <button onClick={submit} disabled={loading} style={{ width: '100%', padding: 17, borderRadius: 15, border: 'none', background: loading ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.92)', color: loading ? 'rgba(255,255,255,0.25)' : '#080810', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.09em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.18s', boxShadow: loading ? 'none' : '0 4px 26px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.5)' }}>
          {loading ? 'Evaluating...' : 'Submit to Agent'}
        </button>
      </div>
    </div>
  )
}
