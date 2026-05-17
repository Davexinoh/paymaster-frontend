import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, logout } from '../hooks/useAuth.js'
import Scene from '../components/Scene.jsx'
import SubmitJob from '../components/SubmitJob.jsx'
import AgentStatus from '../components/AgentStatus.jsx'
import JobHistory from '../components/JobHistory.jsx'
import WalletPanel from '../components/WalletPanel.jsx'

const TABS = [
  { id: 'submit', label: 'Submit Job', icon: '⚡' },
  { id: 'status', label: 'Agent', icon: '◈' },
  { id: 'history', label: 'History', icon: '✦' },
  { id: 'wallet', label: 'Wallet', icon: '⌥' },
]

export default function Dashboard() {
  const { wallet } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('submit')

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Scene />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(8,8,16,0.75)', backdropFilter: 'blur(40px) saturate(200%)', WebkitBackdropFilter: 'blur(40px) saturate(200%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 440, margin: '0 auto', padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderTop: '1px solid rgba(255,255,255,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, backdropFilter: 'blur(10px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)' }}>⚡</div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Paymaster Zero</div>
              <div style={{ fontSize: 8, color: 'rgba(94,234,212,0.42)', letterSpacing: '0.1em', marginTop: 1 }}>{wallet ? `${wallet.slice(0,6)}...${wallet.slice(-4)}` : 'connected'}</div>
            </div>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end', padding: '10px 12px', borderRadius: 12, border: `1px solid ${menuOpen ? 'rgba(167,139,250,0.25)' : 'rgba(255,255,255,0.1)'}`, background: menuOpen ? 'rgba(167,139,250,0.08)' : 'rgba(255,255,255,0.05)', backdropFilter: 'blur(14px)', transition: 'all 0.18s', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            {[19, 13, 19].map((w, i) => <div key={i} style={{ height: 1.5, width: w, background: menuOpen ? 'rgba(167,139,250,0.8)' : 'rgba(255,255,255,0.38)', borderRadius: 1, transition: 'all 0.18s' }} />)}
          </button>

          {menuOpen && (
            <>
              <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
              <div style={{ position: 'absolute', top: 66, right: 20, background: 'rgba(10,10,18,0.97)', border: '1px solid rgba(255,255,255,0.11)', borderTop: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(48px) saturate(220%)', WebkitBackdropFilter: 'blur(48px) saturate(220%)', borderRadius: 20, padding: 8, minWidth: 196, zIndex: 100, boxShadow: '0 32px 90px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.09)', animation: 'fadeUp 0.15s ease forwards' }}>
                {TABS.map(tab => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMenuOpen(false) }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: 'none', background: activeTab === tab.id ? 'rgba(167,139,250,0.09)' : 'transparent', color: activeTab === tab.id ? 'rgba(167,139,250,0.88)' : 'rgba(255,255,255,0.42)', fontSize: 13, cursor: 'pointer', letterSpacing: '0.01em', textAlign: 'left', transition: 'all 0.14s' }}
                    onMouseEnter={e => activeTab !== tab.id && (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => activeTab !== tab.id && (e.currentTarget.style.background = 'transparent')}>
                    <span style={{ fontSize: 14 }}>{tab.icon}</span>
                    {tab.label}
                    {activeTab === tab.id && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#a78bfa', marginLeft: 'auto', boxShadow: '0 0 7px rgba(167,139,250,0.7)' }} />}
                  </button>
                ))}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '6px 5px' }} />
                <button onClick={() => { logout(); navigate('/') }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: 'none', background: 'transparent', color: 'rgba(251,113,133,0.6)', fontSize: 13, cursor: 'pointer', textAlign: 'left', transition: 'all 0.14s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,113,133,0.08)'; e.currentTarget.style.color = 'rgba(251,113,133,0.9)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(251,113,133,0.6)' }}>
                  <span>⇠</span> Disconnect
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: 440, margin: '0 auto', padding: '28px 20px 80px' }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          {TABS.find(t => t.id === activeTab)?.icon} {TABS.find(t => t.id === activeTab)?.label}
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.09), transparent)' }} />
        </div>
        {activeTab === 'submit' && <SubmitJob wallet={wallet} />}
        {activeTab === 'status' && <AgentStatus />}
        {activeTab === 'history' && <JobHistory />}
        {activeTab === 'wallet' && <WalletPanel wallet={wallet} />}
      </main>
    </div>
  )
}
