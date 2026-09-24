import { motion, useReducedMotion } from 'framer-motion'
import SceneSection from './SceneSection'
import { projects } from '../content'
import SectionHeading from './SectionHeading'
import ArrowIcon from './ArrowIcon'

export default function Projects() {
  const reduceMotion = useReducedMotion()

  return (
    <SceneSection className="content-section projects-section" id="work" labelledBy="work-title">
      <div className="section-shell">
        <SectionHeading index="02" eyebrow="ИЗБРАННОЕ" title="Проекты и направления" id="work-title" />
        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.number}
              initial={reduceMotion ? false : { opacity: 0, y: 44, scale: 0.965 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.72, delay: index * 0.08, ease: 'easeOut' }}
            >
              <div className="project-number">{project.number} <span>/ {String(projects.length).padStart(2, '0')}</span></div>
              <div className="project-main">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              {'href' in project && <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.linkLabel}: ${project.title}`}><ArrowIcon className="project-arrow" /><span>{project.linkLabel}</span></a>}
            </motion.article>
          ))}
        </div>
      </div>
    </SceneSection>
  )
}
