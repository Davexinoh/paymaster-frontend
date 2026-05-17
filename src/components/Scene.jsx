export default function Scene() {
  const orbs = [
    { size: 650, top: -200, left: -180, bg: 'radial-gradient(circle at 38% 38%, rgba(139,92,246,0.65) 0%, rgba(109,40,217,0.32) 38%, transparent 68%)', blur: 80, anim: 'd1 15s ease-in-out infinite' },
    { size: 540, bottom: -130, right: -110, bg: 'radial-gradient(circle at 62% 62%, rgba(20,184,166,0.58) 0%, rgba(6,182,212,0.28) 42%, transparent 68%)', blur: 80, anim: 'd2 18s ease-in-out infinite' },
    { size: 420, top: '35%', left: '38%', bg: 'radial-gradient(circle, rgba(99,102,241,0.42) 0%, rgba(79,70,229,0.18) 48%, transparent 70%)', blur: 65, anim: 'd3 22s ease-in-out infinite' },
    { size: 280, top: '52%', left: '5%', bg: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 65%)', blur: 55, anim: 'd4 13s ease-in-out infinite' },
    { size: 240, top: '10%', right: '3%', bg: 'radial-gradient(circle, rgba(34,211,238,0.28) 0%, transparent 65%)', blur: 50, anim: 'd2 10s ease-in-out infinite reverse' },
    { size: 320, top: '68%', right: '15%', bg: 'radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%)', blur: 60, anim: 'd1 25s ease-in-out infinite reverse' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {orbs.map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: o.size, height: o.size,
          borderRadius: '50%',
          background: o.bg,
          filter: `blur(${o.blur}px)`,
          animation: o.anim,
          top: o.top, left: o.left,
          bottom: o.bottom, right: o.right,
        }} />
      ))}
    </div>
  )
}
