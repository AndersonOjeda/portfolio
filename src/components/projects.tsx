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
    title: "MotoTracker App",
    description:
      "Aplicación para entusiastas de las motos que permite registrar rutas, compartir experiencias y conectar con otros motociclistas.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React Native", "Firebase", "Google Maps API", "Redux"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    passion: "motos",
  },
  {
    title: "E-commerce Platform",
    description: "Plataforma de comercio electrónico con carrito de compras, gestión de usuarios y pasarela de pagos.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
    passion: null,
  },
  {
    title: "Adventure Logger",
    description:
      "Aplicación web para registrar y compartir aventuras extremas, con mapas interactivos y estadísticas personales.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
    passion: "aventuras",
  },
  {
    title: "Weather Dashboard",
    description: "Dashboard para visualizar datos meteorológicos en tiempo real con gráficos interactivos.",
    image: "/placeholder.svg?height=300&width=500",
    tags: ["JavaScript", "Chart.js", "OpenWeather API"],
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
    passion: null,
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
      case "motos":
        return <Bike className="h-4 w-4 mr-1" />
      case "aventuras":
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
              <Card className="h-full overflow-hidden border-primary/10 hover:border-primary/30 transition-colors">
                {/* Imagen del proyecto */}
                <div className="relative h-48 w-full overflow-hidden group">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                  {/* Insignia de proyecto destacado */}
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Star className="h-3 w-3 mr-1" /> Destacado
                    </div>
                  )}

                  {/* Insignia de pasión relacionada */}
                  {project.passion && (
                    <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      {getPassionIcon(project.passion)}
                      {project.passion === "motos" ? "Motociclismo" : "Aventura"}
                    </div>
                  )}
                </div>

                {/* Contenido del proyecto */}
                <CardHeader className="text-center sm:text-left">
                  <CardTitle className="flex items-center justify-center sm:justify-start">
                    {project.title}
                    {project.featured && (
                      <span className="ml-2 text-primary">
                        <Star className="h-4 w-4 inline" />
                      </span>
                    )}
                    {project.passion === "motos" && (
                      <span className="ml-2 text-primary">
                        <Bike className="h-4 w-4 inline" />
                      </span>
                    )}
                    {project.passion === "aventuras" && (
                      <span className="ml-2 text-primary">
                        <Zap className="h-4 w-4 inline" />
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

                {/* Botones de acción */}
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
                  <Button size="sm" asChild className="bg-primary hover:bg-primary/90">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
