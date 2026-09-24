import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  as?: 'section' | 'footer'
  className: string
  id: string
  labelledBy: string
  children: ReactNode
}

export default function SceneSection({ as = 'section', className, id, labelledBy, children }: Props) {
  const reduceMotion = useReducedMotion()
  const animation = {
    initial: reduceMotion ? false : { opacity: 0.58, y: 48, scale: 0.975 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  }
  const content = (
    <>
      <motion.span
        className="scene-ripple"
        aria-hidden="true"
        initial={reduceMotion ? false : { scale: 0.55, opacity: 0 }}
        whileInView={reduceMotion ? { opacity: 0 } : { scale: [0.55, 1.15, 1.55], opacity: [0, 0.55, 0] }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.25, ease: 'easeOut' }}
      />
      {children}
    </>
  )

  if (as === 'footer') {
    return <motion.footer {...animation} className={`${className} scene-section`} id={id} aria-labelledby={labelledBy}>{content}</motion.footer>
  }
  return <motion.section {...animation} className={`${className} scene-section`} id={id} aria-labelledby={labelledBy}>{content}</motion.section>
}
