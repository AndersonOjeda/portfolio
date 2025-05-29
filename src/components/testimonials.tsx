"use client"

import { DialogFooter } from "@/components/ui/dialog"
import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Bike, AlertCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Lista de palabras inapropiadas para filtrar
const INAPPROPRIATE_WORDS = [
  "tonto",
  "estúpido",
  "idiota",
  "imbécil",
  "pendejo",
  "mierda",
  "puta",
  "puto",
  "joder",
  "coño",
  "carajo",
  "marica",
  "maricón",
  "perra",
  "zorra",
  "cabrón",
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "dick",
  "pussy",
]

/**
 * Función para validar la calidad del texto
 */
function validateTextQuality(text: string): { isValid: boolean; errorMessage?: string } {
  // Convertir a minúsculas para comparación
  const lowerText = text.toLowerCase()

  // Verificar palabras inapropiadas
  for (const word of INAPPROPRIATE_WORDS) {
    if (lowerText.includes(word)) {
      return {
        isValid: false,
        errorMessage: "El texto contiene lenguaje inapropiado. Por favor, utiliza un lenguaje respetuoso.",
      }
    }
  }

  // Verificar texto mal escrito (patrones básicos)
  if (/[A-Z]{4,}/.test(text)) {
    return {
      isValid: false,
      errorMessage: "El texto contiene demasiadas mayúsculas seguidas. Por favor, escribe normalmente.",
    }
  }

  if (/[!?]{3,}/.test(text)) {
    return {
      isValid: false,
      errorMessage: "El texto contiene demasiados signos de exclamación o interrogación.",
    }
  }

  if (/([a-zA-Z])\1{3,}/.test(text)) {
    return {
      isValid: false,
      errorMessage: "El texto contiene caracteres repetidos. Por favor, escribe normalmente.",
    }
  }

  return { isValid: true }
}

// Tipo para los testimonios
interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar: string
  date: string
  type?: string
}

/**
 * Datos de testimonios predefinidos
 */
const initialTestimonials: Testimonial[] = []

/**
 * Componente Testimonials (Testimonios)
 */
export default function Testimonials() {
  // Toast para notificaciones
  const { toast } = useToast()

  // Estado para los testimonios
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)

  // Estado para el formulario de testimonio
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    content: "",
    email: "",
  })

  // Estado para errores de validación
  const [formErrors, setFormErrors] = useState({
    name: "",
    role: "",
    content: "",
    email: "",
  })

  // Estado para controlar el diálogo
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Estado para controlar el loading del botón
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Añadir un nuevo estado para controlar la visibilidad de todos los testimonios
  const [showAllTestimonials, setShowAllTestimonials] = useState(false)

  // Modificar la función useEffect para cargar testimonios guardados
  useEffect(() => {
    const savedTestimonials = localStorage.getItem("userTestimonials")
    if (savedTestimonials) {
      try {
        const parsedTestimonials = JSON.parse(savedTestimonials) as Testimonial[]
        setTestimonials(parsedTestimonials)
      } catch (error) {
        console.error("Error al cargar testimonios guardados:", error)
      }
    }
  }, [])

  // Manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestimonialForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error al editar
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  // Validar el formulario completo
  const validateForm = (): boolean => {
    const errors = {
      name: "",
      role: "",
      content: "",
      email: "",
    }
    let isValid = true

    // Validar nombre
    if (!testimonialForm.name.trim()) {
      errors.name = "El nombre es obligatorio"
      isValid = false
    } else if (testimonialForm.name.length < 3) {
      errors.name = "El nombre debe tener al menos 3 caracteres"
      isValid = false
    }

    // Validar rol
    if (!testimonialForm.role.trim()) {
      errors.role = "El rol es obligatorio"
      isValid = false
    } else if (testimonialForm.role.length < 3) {
      errors.role = "El rol debe tener al menos 3 caracteres"
      isValid = false
    }

    // Validar email
    if (!testimonialForm.email.trim()) {
      errors.email = "El email es obligatorio"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testimonialForm.email)) {
      errors.email = "El email no es válido"
      isValid = false
    }

    // Validar contenido
    if (!testimonialForm.content.trim()) {
      errors.content = "El testimonio es obligatorio"
      isValid = false
    } else if (testimonialForm.content.length < 20) {
      errors.content = "El testimonio debe tener al menos 20 caracteres"
      isValid = false
    } else {
      // Validar calidad del texto
      const textValidation = validateTextQuality(testimonialForm.content)
      if (!textValidation.isValid) {
        errors.content = textValidation.errorMessage || "El texto no cumple con los estándares de calidad"
        isValid = false
      }
    }

    setFormErrors(errors)
    return isValid
  }

  // Modificar la función handleSubmitTestimonial para añadir el nuevo testimonio al inicio del array
  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar el formulario antes de enviar
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Generar un ID único para el testimonio
      const testimonialId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

      // Crear el nuevo testimonio
      const newTestimonial: Testimonial = {
        id: testimonialId,
        name: testimonialForm.name,
        role: testimonialForm.role,
        content: testimonialForm.content,
        avatar: "/images/profile.png",
        date: new Date().toISOString(),
      }

            // Enviar el testimonio a la API para persistencia en base de datos
      const response = await fetch("/api/send-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: testimonialForm.name,
          role: testimonialForm.role,
          content: testimonialForm.content,
          email: testimonialForm.email,
        }),
      })
      if (response.ok) {
        // Obtener el testimonio guardado (con id y fecha de la base de datos)
        const data = await response.json()
        const dbTestimonial: Testimonial = {
          id: data.testimonialId?.toString() || testimonialId,
          name: testimonialForm.name,
          role: testimonialForm.role,
          content: testimonialForm.content,
          avatar: "/images/profile.png",
          date: data.createdAt || new Date().toISOString(),
        }
        setTestimonials([dbTestimonial, ...testimonials])
        toast({
          title: "Testimonio añadido",
          description: "Tu testimonio ha sido añadido y ya es visible en la página.",
        })
        setIsDialogOpen(false)
        setTestimonialForm({
          name: "",
          role: "",
          content: "",
          email: "",
        })
      } else {
        const errorData = await response.json()
        toast({
          title: "Error al añadir",
          description: errorData.error || "Hubo un problema al añadir tu testimonio. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error al añadir el testimonio:", error)

      // Mostrar notificación de error
      toast({
        title: "Error al añadir",
        description: "Hubo un problema al añadir tu testimonio. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Variantes de animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  // Reemplazar la sección de renderizado de testimonios con la nueva implementación
  // Reemplazar la sección de cuadrícula de testimonios con esta nueva implementación
  return (
    <section id="testimonials" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Testimonios</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Lo que dicen mis profesores, compañeros, mentores y amigos sobre mi trabajo, habilidades y pasiones.
          </p>

          {/* Botón para añadir testimonio */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-4 border-primary/30 hover:bg-primary/10 hover:text-primary">
                <Quote className="mr-2 h-4 w-4" /> Añadir tu testimonio
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Añadir testimonio</DialogTitle>
                <DialogDescription>
                  Comparte tu experiencia trabajando o colaborando con Anderson. Tu testimonio será visible públicamente
                  una vez enviado.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitTestimonial}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <div className="col-span-3 space-y-1">
                      <Input
                        id="name"
                        name="name"
                        value={testimonialForm.name}
                        onChange={handleFormChange}
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> {formErrors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Rol/Cargo
                    </Label>
                    <div className="col-span-3 space-y-1">
                      <Input
                        id="role"
                        name="role"
                        value={testimonialForm.role}
                        onChange={handleFormChange}
                        placeholder="Ej: Compañero de equipo, Profesor, etc."
                        className={formErrors.role ? "border-red-500" : ""}
                      />
                      {formErrors.role && (
                        <p className="text-xs text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> {formErrors.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <div className="col-span-3 space-y-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={testimonialForm.email}
                        onChange={handleFormChange}
                        placeholder="Para contacto (no se publicará)"
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-500 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="content" className="text-right pt-2">
                      Testimonio
                    </Label>
                    <div className="col-span-3 space-y-1">
                      <Textarea
                        id="content"
                        name="content"
                        value={testimonialForm.content}
                        onChange={handleFormChange}
                        placeholder="Comparte tu experiencia trabajando con Anderson..."
                        rows={4}
                        className={formErrors.content ? "border-red-500" : ""}
                      />
                      {formErrors.content && (
                        <p className="text-xs text-red-500 flex items-start">
                          <AlertCircle className="h-3 w-3 mr-1 mt-1" /> {formErrors.content}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Tu testimonio debe ser respetuoso y estar bien escrito. No se permiten groserías ni texto mal
                        estructurado.
                      </p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                      </>
                    ) : (
                      "Publicar testimonio"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Nota sobre publicación */}
          <p className="text-xs text-muted-foreground mt-2">
            Los testimonios se publican inmediatamente y son visibles para todos los visitantes.
          </p>
        </motion.div>

        {/* Mensaje cuando no hay testimonios */}
        {testimonials.length === 0 && (
          <div className="text-center p-8 bg-muted/30 rounded-lg">
            <Quote className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-30" />
            <h3 className="text-lg font-medium">No hay testimonios todavía</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Sé el primero en compartir tu experiencia trabajando con Anderson.
            </p>
          </div>
        )}

        {/* Cuadrícula de testimonios con pestaña desplegable si hay 4 o más */}
        {testimonials.length > 0 && testimonials.length < 4 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants} className="hover-lift">
                <Card
                  className={`h-full border-primary/10 hover:border-primary/30 transition-colors ${
                    testimonial.type === "passion" ? "bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    {/* Avatar y datos de la persona */}
                    <div className="flex items-center gap-4 mb-4 justify-center sm:justify-start">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/images/profile.png"} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center">
                          {testimonial.role}
                          {testimonial.type === "passion" && (
                            <span className="ml-1 text-primary">
                              <Bike className="h-3 w-3 inline-block ml-1" />
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Contenido del testimonio */}
                    <div className="relative text-center sm:text-left">
                      <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2 hidden sm:block" />
                      <Quote className="h-6 w-6 text-primary/20 mx-auto mb-2 sm:hidden" />
                      <p className="text-sm text-muted-foreground pt-2 sm:pl-4">{testimonial.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pestaña desplegable para testimonios si hay 4 o más */}
        {testimonials.length >= 4 && (
          <details className="mt-8">
            <summary className="cursor-pointer text-primary font-semibold text-center mb-4">Ver todos los testimonios</summary>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial) => (
                <motion.div key={testimonial.id} variants={itemVariants} className="hover-lift">
                  <Card
                    className={`h-full border-primary/10 hover:border-primary/30 transition-colors ${
                      testimonial.type === "passion" ? "bg-primary/5" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      {/* Avatar y datos de la persona */}
                      <div className="flex items-center gap-4 mb-4 justify-center sm:justify-start">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar || "/images/profile.png"} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            {testimonial.role}
                            {testimonial.type === "passion" && (
                              <span className="ml-1 text-primary">
                                <Bike className="h-3 w-3 inline-block ml-1" />
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Contenido del testimonio */}
                      <div className="relative text-center sm:text-left">
                        <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2 hidden sm:block" />
                        <Quote className="h-6 w-6 text-primary/20 mx-auto mb-2 sm:hidden" />
                        <p className="text-sm text-muted-foreground pt-2 sm:pl-4">{testimonial.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </details>
        )}
      </div>
    </section>
  )
}
