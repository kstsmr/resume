import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: 'easeOut' as const },
  })

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true" preload="metadata">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <motion.div className="brand-lockup" {...rise(0.1)}>
          <span className="brand-mark" aria-hidden="true">A<span>1</span></span>
        </motion.div>

        <motion.p className="hero-eyebrow" {...rise(0.18)}>FULL-STACK · TON · AI</motion.p>
        <motion.h1 id="hero-title" {...rise(0.27)}>
          <span className="hero-line-light">Разработчик</span>
          <span className="hero-line-bold">полного цикла</span>
        </motion.h1>
        <motion.p className="hero-intro" {...rise(0.42)}>
          Веб-разработка, блокчейн и искусственный интеллект.
        </motion.p>
        <motion.a className="ellipse-button" href="#work" {...rise(0.55)} whileHover={{ scale: 1.035, backgroundColor: 'rgba(255,255,255,.13)' }} whileTap={{ scale: 0.97 }}>
          Смотреть проекты <span aria-hidden="true">↗</span>
        </motion.a>
      </div>
      <div className="hero-bottom">
        <span>01 / 04 <span className="bottom-muted">— РЕЗЮМЕ</span></span>
        <a href="#about">ЛИСТАЙТЕ ВНИЗ <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
