import SceneSection from './SceneSection'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <SceneSection className="content-section about-section" id="about" labelledBy="about-title">
      <div className="section-shell about-grid">
        <SectionHeading index="01" eyebrow="ОБО МНЕ" title="Стек, умения и навыки" id="about-title" />
        <div className="about-copy">
          <p className="lead-copy">Я full-stack разработчик. Развиваюсь в области веб-разработки и делаю уклон во внедрение LLM моделей в скервисы1</p>
          <p>Работал над практическим сервисом цифровой очереди для Почты России и некоммерческими задачами в блокчейн-разработке. В backend использую Python и FastAPI, работаю с C# и .NET; в интерфейсах — с React. Также программирую на Swift, C и C++.</p>
          <p>Сейчас изучаю ИИ-агентов и применение языковых моделей в продуктах. Обучаюсь по специальности, связанной с прикладным искусственным интеллектом.</p>
          <div className="about-signature"><span className="signature-line" /> <span></span></div>
        </div>
      </div>
    </SceneSection>
  )
}
