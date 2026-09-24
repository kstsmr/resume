import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navigation } from '../content'

export default function Navbar() {
  const [active, setActive] = useState<string>('home')

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

  return (
    <motion.nav
      className="dock"
      aria-label="Навигация по сайту"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
    >
      {navigation.map(({ id, label, symbol }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`dock-item ${active === id ? 'is-active' : ''}`}
          aria-label={label}
          aria-current={active === id ? 'location' : undefined}
          title={label}
          onClick={() => setActive(id)}
        >
          {active === id && <motion.span className="dock-active" layoutId="dock-active" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
          <span className="dock-symbol" aria-hidden="true">{symbol}</span>
          <span className="dock-tooltip">{label}</span>
        </a>
      ))}
    </motion.nav>
  )
}
