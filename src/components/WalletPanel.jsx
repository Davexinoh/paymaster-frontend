const glass = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderTop: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(36px) saturate(200%)', WebkitBackdropFilter: 'blur(36px) saturate(200%)', borderRadius: 22, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 72px rgba(0,0,0,0.5)' }

export default function WalletPanel({ wallet }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ ...glass, padding: 28 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 400 }}>Connected Wallet</div>
        <div style={{ fontSize: 13, color: 'rgba(94,234,212,0.85)', wordBreak: 'break-all', lineHeight: 1.75, marginBottom: 18, fontWeight: 400 }}>{wallet}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[{ label: 'Network', val: 'KiteAI Testnet' }, { label: 'Chain ID', val: '2368' }].map(d => (
            <div key={d.label} style={{ padding: 14, borderRadius: 14, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 5, fontWeight: 400 }}>{d.label}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', fontWeight: 400 }}>{d.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...glass, padding: 28 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12, fontWeight: 400 }}>Agent Wallet</div>
        <div style={{ fontSize: 12, color: 'rgba(94,234,212,0.85)', wordBreak: 'break-all', lineHeight: 1.75, marginBottom: 10, fontWeight: 400 }}>0x9bc075d1c1c719f387e70c3bd58583a27b1e1e8d</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', lineHeight: 1.7, fontWeight: 300 }}>PayMaster Zero receives payments here</div>
      </div>

      <div style={{ ...glass, padding: '22px 28px' }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14, fontWeight: 400 }}>Resources</div>
        {[
          { label: 'Kite Faucet', url: 'https://faucet.gokite.ai' },
          { label: 'Kite Explorer', url: 'https://testnet.kitescan.ai' },
          { label: 'Agent Passport', url: 'https://agentpassport.ai' },
        ].map((r, i, arr) => (
          <a key={r.label} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'opacity 0.15s', opacity: 0.7 }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', fontWeight: 400 }}>{r.label}</span>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)' }}>→</span>
          </a>
        ))}
      </div>
    </div>
  )
}
