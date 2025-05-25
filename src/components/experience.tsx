"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Briefcase, Calendar, GraduationCap } from "lucide-react"

/**
 * Datos de experiencia académica
 * Implementa el patrón de Datos Estáticos para facilitar el mantenimiento
 *
 * Cada entrada contiene:
 * - título (nombre del grado/curso)
 * - institución
 * - periodo
 * - descripción
 * - habilidades adquiridas
 */
const educationData = [
  {
    title: "Ingeniería de Software",
    institution: "Universidad Cooperativa de Colombia",
    period: "2020 - Presente (5 semestres)",
    description:
      "Formación integral en desarrollo de software, arquitectura, patrones de diseño y metodologías ágiles.",
    skills: ["Programación", "Bases de datos", "Arquitectura de software", "Metodologías ágiles"],
  },
]

/**
 * Datos de experiencia laboral
 * Implementa el patrón de Datos Estáticos para facilitar el mantenimiento
 *
 * Cada entrada contiene:
 * - puesto
 * - empresa
 * - periodo
 * - descripción
 * - responsabilidades
 * - tecnologías utilizadas
 */
const workData = []

/**
 * Componente Experience (Experiencia Académica y Laboral)
 *
 * Esta sección muestra la trayectoria académica y profesional:
 * - Formación académica con instituciones y periodos
 * - Experiencia laboral con empresas y responsabilidades
 * - Habilidades adquiridas en cada etapa
 *
 * Implementa:
 * - Patrón de Presentación (Presentational Component)
 * - Patrón de Lista para renderizar elementos de manera eficiente
 * - Patrón de Animación con Framer Motion
 * - Uso extensivo de Grid y Flex para layout responsivo
 */
export default function Experience() {
  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="experience" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Experiencia</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Mi trayectoria académica y profesional, destacando las habilidades y conocimientos adquiridos en cada etapa.
          </p>
        </motion.div>

        {/* Contenedor principal usando Grid para layout responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sección de Educación */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold flex items-center">
              <GraduationCap className="mr-2 h-6 w-6 text-primary" />
              Formación Académica
            </h3>

            {/* Lista de educación usando Grid para layout */}
            <div className="grid grid-cols-1 gap-6">
              {educationData.map((item, index) => (
                <motion.div key={`edu-${index}`} variants={itemVariants} className="hover-lift">
                  <Card className="border-primary/10 hover:border-primary/30 transition-colors h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1 bg-primary/5 text-primary">
                          <Calendar className="h-3 w-3" /> {item.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-primary/70" /> {item.institution}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                      {/* Habilidades usando Flex para layout horizontal */}
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, idx) => (
                          <Badge key={`skill-${index}-${idx}`} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sección de Experiencia Laboral */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold flex items-center">
              <Briefcase className="mr-2 h-6 w-6 text-primary" />
              Experiencia Laboral
            </h3>

            <Card className="border-primary/10 hover:border-primary/30 transition-colors h-full">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center py-12">
                <Briefcase className="h-12 w-12 text-primary/30 mb-4" />
                <h4 className="text-xl font-medium mb-2">En búsqueda de oportunidades</h4>
                <p className="text-muted-foreground max-w-md">
                  Actualmente estoy enfocado en mis estudios y en desarrollar proyectos personales para ampliar mi
                  portafolio. Estoy abierto a oportunidades de prácticas y colaboraciones que me permitan aplicar mis
                  conocimientos.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Línea de tiempo - Implementación visual de la trayectoria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Mi Trayectoria</h3>

          {/* Línea de tiempo usando Grid para layout responsivo */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Línea central - visible solo en pantallas medianas y grandes */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2"></div>

            {/* Elementos de la línea de tiempo usando Grid y Flex */}
            <div className="md:col-span-2 md:col-start-1 md:text-right flex flex-col items-end justify-start">
              <div className="bg-card p-4 rounded-lg border border-primary/10 shadow-sm w-full md:w-11/12 relative">
                <div className="hidden md:block absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <h4 className="font-bold">2020</h4>
                <p className="text-sm text-muted-foreground">Graduación del bachillerato</p>
              </div>
            </div>
            <div className="md:col-span-2 md:col-start-4 flex flex-col items-start justify-start md:mt-16">
              <div className="bg-card p-4 rounded-lg border border-primary/10 shadow-sm w-full md:w-11/12 relative">
                <div className="hidden md:block absolute left-0 top-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <h4 className="font-bold">2022</h4>
                <p className="text-sm text-muted-foreground">Inicio de estudios en Ingeniería de Software</p>
              </div>
            </div>
            <div className="md:col-span-2 md:col-start-1 md:text-right flex flex-col items-end justify-start md:mt-16">
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 shadow-sm w-full md:w-11/12 relative">
                <div className="hidden md:block absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <h4 className="font-bold">Presente</h4>
                <p className="text-sm text-muted-foreground">Estudiante de Ingeniería de Software</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
