import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Expertise from './components/Expertise'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#about">К содержанию</a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Expertise />
      </main>
      <Contact />
    </>
  )
}
