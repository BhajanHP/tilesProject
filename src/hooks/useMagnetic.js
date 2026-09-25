import { useEffect } from 'react'

const FINE_POINTER = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(hover: hover) and (pointer: fine)')
  : null

export default function useMagnetic(deps = []) {
  useEffect(() => {
    if (FINE_POINTER && !FINE_POINTER.matches) return

    const els = document.querySelectorAll('.magnetic')

    function handleMove(e) {
      const el = e.currentTarget
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${(x * 0.3).toFixed(1)}px, ${(y * 0.3).toFixed(1)}px)`
    }

    function handleLeave(e) {
      e.currentTarget.style.transform = ''
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
