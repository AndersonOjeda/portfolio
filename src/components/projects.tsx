"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, Bike, Zap, Mountain } from "lucide-react"
import Image from "next/image"

/**
 * Datos de proyectos para mostrar
 * Cada proyecto tiene título, descripción, imagen, etiquetas y enlaces
 *
 * Implementa el patrón de Datos Estáticos para facilitar el mantenimiento
 * y la escalabilidad del componente.
 */
const projects = [
  {
    title: "Mercedario",
    description:
      "Mercedario es una solución tecnológica desarrollada con el objetivo de optimizar la gestión de recursos dentro de establecimientos gastronómicos, específicamente en lo relacionado con el uso, seguimiento y control de ingredientes desde el inventario hasta la preparación de platos. Desarrollado con Python, Tkinter y HTML. La base de datos SQL está correctamente conectada y funcionando para el control de inventarios y operaciones.",
    image: "/images/logo-mercedario.png",
    tags: ["Python", "Tkinter", "HTML", "SQL"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    passion: "gastronomía",
  },
  {
    title: "Presupuesto Personal",
    description:
      "Presupuesto Personal es una aplicación web desarrollada con Next.js, Node.js y Tailwind CSS, orientada a facilitar la gestión financiera individual de manera práctica y visual.",
    image: "/images/logo-presupuesto_personal.png",
    tags: ["Next.js", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/AndersonOjeda/Presupuesto-Personal.git",
    liveUrl: "#",
    featured: true,
    passion: "finanzas",
  },
  {
    title: "classmate",
    description:
      "classmate tiene como objetivo principal facilitar la administración académica de una institución educativa, permitiendo a los profesores, estudiantes y administradores realizar sus tareas de manera eficiente y segura. Esta hecha con Python, Django, CSS, HTML, SQL y Tailwind.",
    image: "/images/logo-classmate.png",
    tags: ["Python", "Django", "CSS", "HTML", "SQL", "Tailwind"],
    githubUrl: "https://github.com/migueltovarb/ISWElectiva110202-10.git",
    liveUrl: "#",
    featured: true,
    passion: "educación",
  },

  
]

/**
 * Componente Projects (Proyectos)
 *
 * Esta sección muestra los proyectos realizados:
 * - Tarjetas de proyectos con imágenes
 * - Etiquetas de tecnologías usadas
 * - Enlaces a código y demo
 * - Indicador de proyectos destacados
 * - Indicadores de proyectos relacionados con pasiones personales
 *
 * Implementa el patrón de Presentación (Presentational Component),
 * el patrón de Animación con Framer Motion y el patrón de Lista
 * para renderizar proyectos de manera eficiente.
 */
export default function Projects() {
  // Variantes de animación para el contenedor
  // Implementa el patrón de Configuración para definir comportamientos reutilizables
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Efecto escalonado para los hijos
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

  /**
   * Función para obtener el icono según la pasión relacionada
   * Implementa el patrón de Estrategia para selección de iconos
   *
   * @param passion - Tipo de pasión relacionada con el proyecto
   * @returns Componente de icono correspondiente
   */
  const getPassionIcon = (passion: string | null) => {
    switch (passion) {
      case "educación":
        return <Bike className="h-4 w-4 mr-1" />
      case "finanzas":
        return <Mountain className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  return (
    <section id="projects" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        {/* Encabezado de sección - Animación de entrada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Mis Proyectos</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Una selección de los proyectos en los que he trabajado, demostrando mis habilidades en desarrollo web y
            diseño de interfaces, incluyendo algunos relacionados con mis pasiones.
          </p>
        </motion.div>

        {/* Cuadrícula de proyectos - Animación escalonada */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants} className="hover-lift">
              <div className="flex flex-col items-center">
                <div className="relative w-full h-48 mb-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-lg shadow-lg bg-white"
                    style={{ position: "absolute" }}
                  />
                </div>
                <Card className="h-full overflow-hidden border-primary/10 hover:border-primary/30 transition-colors w-full">
                  <div className="relative h-0">
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" /> Destacado
                      </div>
                    )}
                    {project.passion && (
                      <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                        {getPassionIcon(project.passion)}
                        {project.passion === "motos" ? "Motociclismo" : project.passion === "finanzas" ? "Finanzas" : project.passion === "educación" ? "Educación" : "Aventura"}
                      </div>
                    )}
                  </div>
                  <CardHeader className="text-center sm:text-left">
                    <CardTitle className="flex items-center justify-center sm:justify-start">
                      {project.title}
                      {project.featured && (
                        <span className="ml-2 text-primary">
                          <Star className="h-4 w-4 inline" />
                        </span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center sm:text-left">
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center sm:justify-between flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-primary/30 hover:bg-primary/10 hover:text-primary"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Código
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
