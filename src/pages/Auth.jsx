import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../hooks/useAuth.js'
import Scene from '../components/Scene.jsx'

const glassXL = {
  background: 'rgba(255,255,255,0.09)',
  border: '1px solid rgba(255,255,255,0.16)',
  borderTop: '1px solid rgba(255,255,255,0.28)',
  backdropFilter: 'blur(48px) saturate(220%)',
  WebkitBackdropFilter: 'blur(48px) saturate(220%)',
  borderRadius: '22px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.15), 0 32px 90px rgba(0,0,0,0.55)',
}

export default function Auth() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function connect() {
    setLoading(true); setError('')
    try {
      if (!window.ethereum) { setError('No wallet detected. Install MetaMask or OKX Wallet.'); setLoading(false); return }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      try {
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x940' }] })
      } catch (e) {
        if (e.code === 4902) await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [{ chainId: '0x940', chainName: 'KiteAI Testnet', rpcUrls: ['https://rpc-testnet.gokite.ai/'], nativeCurrency: { name: 'KITE', symbol: 'KITE', decimals: 18 }, blockExplorerUrls: ['https://testnet.kitescan.ai/'] }] })
      }
      login(accounts[0])
      navigate('/app')
    } catch { setError('Connection failed. Try again.') }
    setLoading(false)
  }

  const wbtn = (hi) => ({
    display: 'flex', alignItems: 'center', gap: 14,
    width: '100%', padding: '17px 18px', borderRadius: 15,
    border: hi ? '1px solid rgba(94,234,212,0.24)' : '1px solid rgba(255,255,255,0.11)',
    background: hi ? 'rgba(94,234,212,0.07)' : 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(16px)',
    color: hi ? 'rgba(94,234,212,0.88)' : 'rgba(255,255,255,0.6)',
    fontSize: 14, fontWeight: 400, cursor: 'pointer',
    marginBottom: 10,
    boxShadow: hi ? 'inset 0 1px 0 rgba(94,234,212,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.08)',
    transition: 'all 0.18s',
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      <Scene />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 360, animation: 'fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards' }}>

        <div style={{ textAlign: 'center', marginBottom: 34 }}>
          <div style={{ width: 66, height: 66, borderRadius: 20, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderTop: '1px solid rgba(255,255,255,0.26)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 29, margin: '0 auto 22px', backdropFilter: 'blur(14px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 14px 44px rgba(0,0,0,0.45)', animation: 'float 5s ease-in-out infinite' }}>⚡</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, color: 'rgba(255,255,255,0.9)', marginBottom: 10, letterSpacing: '-0.02em' }}>Connect Wallet</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, fontWeight: 300 }}>Access PayMaster Zero.<br />KiteAI Testnet required.</div>
        </div>

        <div style={{ ...glassXL, padding: 26, marginBottom: 16 }}>
          <button onClick={connect} disabled={loading} style={wbtn(true)}>
            <span style={{ fontSize: 22 }}>🦊</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14, letterSpacing: '-0.01em' }}>{loading ? 'Connecting...' : 'MetaMask'}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.24)', marginTop: 2, fontWeight: 300 }}>Browser extension wallet</div>
            </div>
            <span style={{ fontSize: 15, opacity: 0.3 }}>→</span>
          </button>
          <button onClick={connect} disabled={loading} style={wbtn(false)}>
            <span style={{ fontSize: 22 }}>💎</span>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14, letterSpacing: '-0.01em' }}>OKX Wallet</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.24)', marginTop: 2, fontWeight: 300 }}>Mobile & extension</div>
            </div>
            <span style={{ fontSize: 15, opacity: 0.3 }}>→</span>
          </button>

          {error && <div style={{ padding: '11px 14px', borderRadius: 11, background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.18)', fontSize: 11, color: '#fb7185', marginBottom: 14, lineHeight: 1.6 }}>{error}</div>}

          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '20px 0' }} />
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.9, fontWeight: 300 }}>
            KiteAI Testnet · Chain ID 2368<br />Any EVM-compatible wallet works
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', fontSize: 12, letterSpacing: '0.04em', transition: 'color 0.15s' }}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.2)'}>
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  )
}
