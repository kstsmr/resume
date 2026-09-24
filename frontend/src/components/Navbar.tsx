import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { navigation } from '../content'
import ArrowIcon from './ArrowIcon'

export default function Navbar() {
  const [active, setActive] = useState<string>('home')
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const pointerRef = useRef<{ id: number; grabOffset: number } | null>(null)
  const ignoreClickUntil = useRef(0)
  const position = useMotionValue(0)
  const springPosition = useSpring(position, { stiffness: 480, damping: 36, mass: 0.65 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75] },
    )
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const align = () => {
      if (pointerRef.current) return
      const index = navigation.findIndex(({ id }) => id === active)
      const item = itemRefs.current[index]
      if (item) position.set(item.offsetLeft)
    }
    align()
    const observer = new ResizeObserver(align)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [active, position])

  const closestIndex = (x: number) => itemRefs.current.reduce((best, item, index) => {
    if (!item) return best
    const bestItem = itemRefs.current[best]
    const distance = Math.abs(item.offsetLeft - x)
    const bestDistance = bestItem ? Math.abs(bestItem.offsetLeft - x) : Infinity
    return distance < bestDistance ? index : best
  }, 0)

  const moveSlider = (clientX: number) => {
    const nav = navRef.current
    const pointer = pointerRef.current
    const first = itemRefs.current[0]
    const last = itemRefs.current[navigation.length - 1]
    if (!nav || !pointer || !first || !last) return

    const left = nav.getBoundingClientRect().left
    const x = Math.max(first.offsetLeft, Math.min(last.offsetLeft, clientX - left - pointer.grabOffset))
    position.set(x)
    setPreview(navigation[closestIndex(x)].id)
    const light = Math.max(0, Math.min(100, (clientX - left - x) / first.offsetWidth * 100))
    nav.style.setProperty('--glass-light-x', `${light}%`)
  }

  const finishDrag = (clientX: number, cancelled = false) => {
    const nav = navRef.current
    const pointer = pointerRef.current
    if (!pointer) return
    if (!cancelled) moveSlider(clientX)
    const index = closestIndex(position.get())
    pointerRef.current = null
    setDragging(false)
    setPreview(null)
    nav?.style.removeProperty('--glass-light-x')
    if (nav?.hasPointerCapture(pointer.id)) nav.releasePointerCapture(pointer.id)
    if (cancelled) {
      const current = itemRefs.current[navigation.findIndex(({ id }) => id === active)]
      if (current) position.set(current.offsetLeft)
      return
    }

    const id = navigation[index].id
    const item = itemRefs.current[index]
    if (item) position.set(item.offsetLeft)
    setActive(id)
    ignoreClickUntil.current = Date.now() + 500
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
  }

  return (
    <motion.nav
      ref={navRef}
      className={`dock${dragging ? ' is-dragging' : ''}`}
      aria-label="Навигация по сайту"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      onPointerDown={(event) => {
        if (event.button !== 0) return
        const item = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('.dock-item') : null
        const index = itemRefs.current.indexOf(item)
        const nav = navRef.current
        if (index < 0 || !item || !nav) return
        event.preventDefault()
        pointerRef.current = {
          id: event.pointerId,
          grabOffset: event.clientX - nav.getBoundingClientRect().left - item.offsetLeft,
        }
        nav.setPointerCapture(event.pointerId)
        position.set(item.offsetLeft)
        setPreview(navigation[index].id)
        setDragging(true)
      }}
      onPointerMove={(event) => {
        if (pointerRef.current?.id === event.pointerId) moveSlider(event.clientX)
      }}
      onPointerUp={(event) => {
        if (pointerRef.current?.id === event.pointerId) finishDrag(event.clientX)
      }}
      onPointerCancel={(event) => {
        if (pointerRef.current?.id === event.pointerId) finishDrag(event.clientX, true)
      }}
    >
      <motion.span
        className="dock-active"
        aria-hidden="true"
        style={{ x: reduceMotion ? position : springPosition }}
        animate={{ scaleX: dragging ? 1.08 : 1, scaleY: dragging ? 0.97 : 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      />
      {navigation.map(({ id, label, symbol }, index) => (
        <a
          key={id}
          ref={(item) => { itemRefs.current[index] = item }}
          href={`#${id}`}
          className={`dock-item ${(dragging ? preview : active) === id ? 'is-active' : ''}`}
          aria-label={label}
          aria-current={active === id ? 'location' : undefined}
          title={label}
          onClick={(event) => {
            if (event.detail > 0 && Date.now() < ignoreClickUntil.current) {
              event.preventDefault()
              return
            }
            setActive(id)
          }}
        >
          <span className="dock-symbol" aria-hidden="true">{id === 'contact' ? <ArrowIcon /> : symbol}</span>
          <span className="dock-tooltip">{label}</span>
        </a>
      ))}
    </motion.nav>
  )
}
