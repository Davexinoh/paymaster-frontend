const glass = { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderTop: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(36px) saturate(200%)', WebkitBackdropFilter: 'blur(36px) saturate(200%)', borderRadius: 22, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 24px 72px rgba(0,0,0,0.5)' }

export default function JobHistory() {
  return (
    <div style={{ ...glass, padding: '56px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 44, marginBottom: 18, opacity: 0.12 }}>◈</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>No jobs yet</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.18)', lineHeight: 1.85, fontWeight: 300 }}>Submit your first job to see history here</div>
    </div>
  )
}
