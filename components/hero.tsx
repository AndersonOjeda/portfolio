"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Code, Sparkles, Bike, Mountain, Zap } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

/**
 * Componente Hero (Sección de Bienvenida)
 *
 * Esta sección es lo primero que ven los visitantes y contiene:
 * - Nombre y título profesional
 * - Breve descripción
 * - Botones de llamada a la acción
 * - Imagen o avatar
 * - Elementos decorativos animados
 *
 * Implementa el patrón de Presentación (Presentational Component)
 * y el patrón de Animación con Framer Motion.
 */
export default function Hero() {
  // Función para desplazarse suavemente a la sección "Acerca de mí"
  // Implementa el patrón de Estrategia para encapsular la lógica de navegación
  /**
   * @function scrollToAbout
   * @description Maneja el desplazamiento suave hacia la sección "Acerca de"
   * @implements {ScrollBehavior}
   */
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Variantes de animación para los elementos decorativos
  // Implementa el patrón de Configuración para definir comportamientos reutilizables
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  // Datos de pasiones - Patrón de Datos Estáticos
  // Facilita el mantenimiento y la escalabilidad
  const passions = [
    { icon: <Bike className="h-5 w-5 mr-1" />, label: "Motociclismo" },
    { icon: <Mountain className="h-5 w-5 mr-1" />, label: "Aventuras" },
    { icon: <Zap className="h-5 w-5 mr-1" />, label: "Adrenalina" },
  ]

  return (
    <section id="hero" className="relative py-20 md:py-28 lg:py-36 overflow-hidden gradient-bg">
      {/* Elementos decorativos de fondo - Mejora visual */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculos decorativos animados - Patrón de Animación */}
        <motion.div
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        />

        {/* Elementos flotantes - Patrón de Animación */}
        <motion.div
          className="hidden md:block absolute top-[15%] left-[15%] text-primary/20"
          variants={floatingVariants}
          animate="animate"
        >
          <Code size={40} />
        </motion.div>
        <motion.div
          className="hidden md:block absolute bottom-[20%] right-[20%] text-primary/20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <Sparkles size={40} />
        </motion.div>

        {/* Elementos relacionados con pasiones - Personalización */}
        <motion.div
          className="hidden md:block absolute top-[40%] right-[15%] text-primary/20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <Bike size={50} /> {/* Icono de moto */}
        </motion.div>
        <motion.div
          className="hidden md:block absolute bottom-[40%] left-[10%] text-primary/20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1.5 }}
        >
          <Mountain size={45} /> {/* Icono de montaña/aventura */}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Contenido textual - Animación de entrada */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Estado inicial
            animate={{ opacity: 1, x: 0 }} // Estado final
            transition={{ duration: 0.7 }} // Configuración de transición
            className="flex flex-col gap-6 text-center md:text-left"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Hola, soy <span className="text-primary">Anderson Ojeda</span>
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Estudiante de Ingeniería de Software en la UCC, sede Pasto
              </p>
            </div>

            <p className="text-lg text-muted-foreground">
              Soy estudiante de quinto semestre, tengo 21 años. Me apasiona la tecnología, los videojuegos, el anime, el
              rap, el motociclismo y las experiencias nuevas.
              <span className="block mt-2 font-medium text-primary">
                Reservado pero presente, valoro la lealtad y tengo una mente abierta a diferentes ideas y culturas.
              </span>
            </p>

            {/* Sección de pasiones - Personalización */}
            <div className="flex flex-wrap gap-3 mt-1 justify-center md:justify-start">
              {passions.map((passion, index) => (
                <motion.span
                  key={passion.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  {passion.icon} {passion.label}
                </motion.span>
              ))}
            </div>

            {/* Botones de acción - Patrón de Llamada a la Acción */}
            <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
              <Button
                variant="outline"
                onClick={scrollToAbout}
                className="border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                Conoce más <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Indicadores de tecnologías - Patrón de Etiquetas */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">HTML5</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">CSS3</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">JavaScript</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">React</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Next.js</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Tailwind CSS</span>
            </div>
          </motion.div>

          {/* Imagen de perfil - Animación de entrada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Círculo decorativo animado - Patrón de Animación */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                animate={{ rotate: 360 }} // Rotación continua
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Imagen de perfil - Optimización de imágenes con Next.js */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary glow-border">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/5 mix-blend-overlay z-10 rounded-full"></div>
                <Image
                  src="/images/profile.png"
                  alt="Anderson Ojeda"
                  fill
                  className="object-cover object-center"
                  priority // Carga prioritaria para LCP (Largest Contentful Paint)
                />
              </div>

              {/* Insignia decorativa - Animación de entrada */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-background p-3 rounded-full border border-primary shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              >
                <Zap className="h-8 w-8 text-primary" /> {/* Icono de adrenalina */}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
