import { motion, useReducedMotion } from 'framer-motion'
import SceneSection from './SceneSection'
import { skillGroups } from '../content'
import SectionHeading from './SectionHeading'

export default function Expertise() {
  const reduceMotion = useReducedMotion()

  return (
    <SceneSection className="content-section stack-section" id="stack" labelledBy="stack-title">
      <div className="section-shell">
        <SectionHeading index="03" eyebrow="ИНСТРУМЕНТЫ" title="Технологии в работе" id="stack-title" />
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <motion.div
              className="skill-group"
              key={group.number}
              initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.68, delay: index * 0.09, ease: 'easeOut' }}
            >
              <span className="skill-number">{group.number}</span>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneSection>
  )
}
