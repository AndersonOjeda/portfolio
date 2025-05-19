"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Layout, Server, Lightbulb, Wrench, Bike } from "lucide-react"

// Modificar la estructura de datos para eliminar los niveles (porcentajes)
const skillsData = [
  {
    id: "frontend",
    title: "Desarrollo Frontend",
    icon: <Layout className="h-5 w-5" />,
    skills: [
      { name: "HTML5 & CSS3" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "TypeScript" },
      { name: "Responsive Design" },
    ],
  },
  {
    id: "backend",
    title: "Desarrollo Backend",
    icon: <Server className="h-5 w-5" />,
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "API RESTful" },
      { name: "GraphQL" },
      { name: "Autenticación & Seguridad" },
    ],
  },
  {
    id: "database",
    title: "Bases de Datos",
    icon: <Database className="h-5 w-5" />,
    skills: [{ name: "MongoDB" }, { name: "MySQL" }, { name: "Firebase" }, { name: "Modelado de datos" }],
  },
  {
    id: "tools",
    title: "Herramientas & Metodologías",
    icon: <Wrench className="h-5 w-5" />,
    skills: [
      { name: "Git & GitHub" },
      { name: "Docker" },
      { name: "Metodologías Ágiles" },
      { name: "Testing" },
      { name: "CI/CD" },
    ],
  },
  {
    id: "soft",
    title: "Habilidades Blandas",
    icon: <Lightbulb className="h-5 w-5" />,
    skills: [
      { name: "Trabajo en equipo" },
      { name: "Comunicación" },
      { name: "Resolución de problemas" },
      { name: "Gestión del tiempo" },
      { name: "Adaptabilidad" },
    ],
  },
  {
    id: "hobbies",
    title: "Pasiones & Hobbies",
    icon: <Bike className="h-5 w-5" />,
    skills: [
      { name: "Motociclismo" },
      { name: "Deportes extremos" },
      { name: "Fotografía" },
      { name: "Viajes de aventura" },
      { name: "Montañismo" },
    ],
  },
]

// Modificar el componente para mostrar las habilidades sin barras de progreso
export default function Skills() {
  return (
    <section id="skills" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Mis Habilidades</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Conjunto de habilidades técnicas y blandas que he desarrollado a lo largo de mi formación y experiencia
            profesional.
          </p>
        </motion.div>

        {/* Tabs para categorías de habilidades */}
        <Tabs defaultValue="frontend" className="w-full">
          {/* Lista de pestañas usando Flex para layout horizontal */}
          <TabsList className="flex flex-wrap justify-center mb-8 bg-transparent h-auto p-1 w-full md:w-auto mx-auto">
            {skillsData.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2 m-1"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Contenido de cada pestaña */}
          {skillsData.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-lg border border-primary/10 p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.title}</span>
                </h3>

                {/* Grid para organizar las habilidades en columnas */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={`${category.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="bg-primary/5 hover:bg-primary/10 transition-colors rounded-lg p-3 text-center hover-lift">
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
