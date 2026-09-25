import { useEffect } from 'react'

const FINE_POINTER = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)')
  : null

export default function useTilt(deps = []) {
  useEffect(() => {
    if (FINE_POINTER && !FINE_POINTER.matches) return

    const els = document.querySelectorAll('.tilt')

    function handleMove(e) {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      const rx = (-py * 10).toFixed(2)
      const ry = (px * 10).toFixed(2)
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
      el.style.setProperty('--glow-x', `${(px + 0.5) * 100}%`)
      el.style.setProperty('--glow-y', `${(py + 0.5) * 100}%`)
      el.style.setProperty('--glow-o', '1')
    }

    function handleLeave(e) {
      const el = e.currentTarget
      el.style.transform = ''
      el.style.setProperty('--glow-o', '0')
    }

    els.forEach((el) => {
      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      els.forEach((el) => {
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
