"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, BookOpen, Lightbulb, Bike, Mountain, Zap } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

/**
 * @component About
 * @description Sección que presenta información personal y profesional
 * 
 * Estructura:
 * - Información personal
 * - Habilidades técnicas
 * - Experiencias y pasiones
 * 
 * Características:
 * - Implementa animaciones personalizadas
 * - Utiliza diseño responsivo
 * - Integra modal para visualización de imágenes
 */
const skills = [
  {
    name: "Desarrollo Frontend",
    icon: <Code className="h-8 w-8 text-primary" />,
    description: "HTML, CSS, JavaScript, React, Next.js, Tailwind CSS",
  },
  {
    name: "Diseño UI/UX",
    icon: <Palette className="h-8 w-8 text-primary" />,
    description: "Figma, Responsive Design, Accesibilidad Web",
  },
  {
    name: "Patrones de Software",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    description: "MVC, Component-Based Architecture, Clean Code",
  },
  {
    name: "Resolución de Problemas",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    description: "Pensamiento analítico, Debugging, Optimización",
  },
]

/**
 * Datos de pasiones personales
 * Cada pasión tiene un título, icono y descripción
 *
 * Implementa el patrón de Datos Estáticos para facilitar el mantenimiento
 */
const passions = [
  {
    title: "Motociclismo",
    icon: <Bike className="h-8 w-8 text-primary" />,
    description:
      "Amante de la velocidad y la libertad en dos ruedas. Disfruto de rutas largas y descubrir nuevos paisajes.",
  },
  {
    title: "Aventuras",
    icon: <Mountain className="h-8 w-8 text-primary" />,
    description:
      "Siempre buscando nuevos desafíos, desde senderismo hasta deportes extremos que pongan a prueba mis límites.",
  },
  {
    title: "Adrenalina",
    icon: <Zap className="h-8 w-8 text-primary" />,
    description:
      "La emoción de lo desconocido y los retos me impulsa tanto en mi vida personal como en mis proyectos de desarrollo.",
  },
]

/**
 * Componente About (Acerca de mí)
 *
 * Esta sección muestra información personal y profesional:
 * - Descripción personal
 * - Tarjetas de habilidades
 * - Sección de pasiones personales
 * - Estadísticas personales
 * - Trayectoria profesional
 *
 * Implementa el patrón de Presentación (Presentational Component)
 * y el patrón de Animación con Framer Motion.
 */
export default function About() {
  // Variantes de animación para el contenedor
  // Implementa el patrón de Configuración para definir comportamientos reutilizables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Efecto escalonado para los hijos
      },
    },
  }

  // Variantes de animación para los elementos hijos
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const [open, setOpen] = useState(false)
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Encabezado de sección - Animación de entrada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }} // Solo anima una vez
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Acerca de Mí</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Soy una persona curiosa y creativa, actualmente formándome como Ingeniero de Software en la Universidad
            Cooperativa de Colombia, sede Pasto. Me interesa especialmente el desarrollo web y disfruto construir
            soluciones que combinan funcionalidad con una buena experiencia para el usuario.
          </p>
        </motion.div>

        {/* Imagen centrada entre la descripción y las pasiones */}
        <div className="flex justify-center my-12">
          <div
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-lg cursor-pointer"
            onClick={() => setOpen(true)}
            title="Haz clic para ver la foto en grande"
          >
            <Image
              src="/images/A-Cerca-De-Mi.jpg"
              alt="Foto personal"
              fill
              className="object-cover object-[50%_35%]"
              priority
            />
          </div>
        </div>

        {/* Modal para mostrar la imagen en grande */}
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setOpen(false)}
          >
            <div className="relative max-w-full max-h-full p-4" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-primary/20"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
              <Image
                src="/images/A-Cerca-De-Mi.jpg"
                alt="Foto personal ampliada"
                width={600}
                height={800}
                className="rounded-lg object-contain max-h-[80vh] max-w-[90vw] mx-auto"
                priority
              />
            </div>
          </div>
        )}

        {/* Tarjetas de habilidades - Animación escalonada */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div key={skill.name} variants={itemVariants} className="hover-lift">
              <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Sección de pasiones - Personalización */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Mis Pasiones</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {passions.map((passion, index) => (
              <motion.div
                key={passion.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="hover-lift"
              >
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">{passion.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{passion.title}</h3>
                    <p className="text-sm text-muted-foreground">{passion.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trayectoria y estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Descripción de trayectoria */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="w-8 h-1 bg-primary mr-3"></span>
              Mi Trayectoria
            </h3>
            <p className="text-muted-foreground mb-4">
              Me encuentro en proceso de formación como ingeniero de software, construyendo bases sólidas en
              programación, análisis de sistemas y metodologías ágiles. A lo largo de mi camino académico he enfocado mi
              energía en desarrollar proyectos funcionales, con especial atención al impacto que estos pueden tener en
              la experiencia del usuario.
            </p>
            <p className="text-muted-foreground">
              Más allá del aula, dedico tiempo a explorar tecnologías emergentes y a reforzar mis habilidades prácticas
              a través del desarrollo de soluciones web, aplicaciones móviles y conceptos de diseño centrado en el
              usuario.
            </p>

            {/* Lista de intereses */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-primary">Mis intereses técnicos:</h4>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Desarrollo Web
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Inteligencia Artificial
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  UX/UI Design
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Desarrollo Móvil
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Cloud Computing
                </li>
                <li className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Ciberseguridad
                </li>
              </ul>
            </div>
          </div>

          {/* Estadísticas personales */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div className="bg-primary/10 p-4 rounded-lg text-center hover-lift" whileHover={{ scale: 1.05 }}>
              <h4 className="font-bold text-4xl text-primary">21</h4>
              <p className="text-sm text-muted-foreground">Años</p>
            </motion.div>
            <motion.div className="bg-primary/10 p-4 rounded-lg text-center hover-lift" whileHover={{ scale: 1.05 }}>
              <h4 className="font-bold text-4xl text-primary">UCC</h4>
              <p className="text-sm text-muted-foreground">Universidad</p>
            </motion.div>
            <motion.div className="bg-primary/10 p-4 rounded-lg text-center hover-lift" whileHover={{ scale: 1.05 }}>
              <h4 className="font-bold text-4xl text-primary">2+</h4>
              <p className="text-sm text-muted-foreground">Años Programando</p>
            </motion.div>
            <motion.div className="bg-primary/10 p-4 rounded-lg text-center hover-lift" whileHover={{ scale: 1.05 }}>
              <h4 className="font-bold text-4xl text-primary">5+</h4>
              <p className="text-sm text-muted-foreground">Proyectos</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

passions.map((passion) => {
  if (passion.title === "Motociclismo") {
    passion.description =
      "Vivir la carretera sobre dos ruedas es una forma de libertad que me conecta con el presente. Me encanta recorrer rutas largas, descubrir nuevos paisajes y sentir la velocidad como una extensión de mi estilo de vida."
  } else if (passion.title === "Aventuras") {
    passion.description =
      "Me atrae lo desconocido y los retos que salen de lo cotidiano. Ya sea a través del senderismo, exploraciones o actividades extremas, siempre busco experiencias que despierten mi lado más activo y curioso."
  } else if (passion.title === "Adrenalina") {
    passion.description =
      "La intensidad de los momentos impredecibles me motiva tanto fuera como dentro del desarrollo. Esa chispa que surge al enfrentar desafíos es lo que me impulsa a superarme y a innovar constantemente."
  }
  return passion
})
