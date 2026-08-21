import { useRef } from 'react'

export default function SpecularButton({ children, href, className = '', onClick, ...props }) {
  const ref = useRef(null)
  const move = (event) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--specular-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--specular-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
    el.style.setProperty('--specular-opacity', '1')
  }
  const leave = () => ref.current?.style.setProperty('--specular-opacity', '0')
  const cls = `specular-button ${className}`
  const shared = { ref, className: cls, onPointerMove: move, onPointerLeave: leave, onClick, ...props }
  return href ? <a href={href} {...shared}>{children}</a> : <button type="button" {...shared}>{children}</button>
}
