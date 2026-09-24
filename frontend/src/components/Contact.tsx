import { motion, useReducedMotion } from 'framer-motion'
import SceneSection from './SceneSection'
import SectionHeading from './SectionHeading'
import ArrowIcon from './ArrowIcon'

const contacts = [
  { label: 'smirnovk234@gmail.com', href: 'mailto:smirnovk234@gmail.com' },
  { label: 'Telegram', href: 'https://telegram.me/chechech228' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/feed/' },
  { label: 'GitHub', href: 'https://github.com/kstsmr' },
] as const

export default function Contact() {
  const reduceMotion = useReducedMotion()

  return (
    <SceneSection as="footer" className="content-section contact-section" id="contact" labelledBy="contact-title">
      <div className="section-shell contact-grid">
        <SectionHeading index="04" eyebrow="ДАЛЬШЕ" title="Мои контакты" id="contact-title" />
        <div className="contact-copy">
          <p>Открыт к стажировкам, командной разработке и проектам на стыке веба, автоматизации и блокчейна.</p>
          <div className="contact-links">
            {contacts.map(({ label, href }, index) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="contact-link"
                initial={reduceMotion ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              >
                {label} <ArrowIcon className="contact-arrow" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-line section-shell"><span>A1 / PORTFOLIO</span><span>© 2026</span><a href="#home">НАВЕРХ <ArrowIcon className="footer-arrow" direction="up" /></a></div>
    </SceneSection>
  )
}
