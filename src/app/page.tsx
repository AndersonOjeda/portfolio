import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"

/**
 * Componente principal de la página de inicio
 *
 * Este componente implementa:
 * - Patrón de Composición: Combina múltiples componentes para crear la página completa
 * - Arquitectura basada en componentes: Cada sección es un componente independiente
 * - Principio de Responsabilidad Única: Cada componente tiene una única responsabilidad
 *
 * La estructura sigue un flujo lógico de presentación:
 * 1. Hero (Bienvenida/Presentación)
 * 2. About (Información personal)
 * 3. Experience (Experiencia académica y laboral)
 * 4. Skills (Habilidades técnicas y blandas)
 * 5. Projects (Proyectos realizados)
 * 6. Testimonials (Opiniones de terceros)
 * 7. Contact (Información de contacto)
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  )
}
