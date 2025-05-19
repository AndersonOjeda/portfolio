"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Loader2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

/**
 * Componente Contact (Contacto)
 *
 * Esta sección permite a los visitantes enviar mensajes:
 * - Formulario de contacto con validación
 * - Información de contacto
 * - Enlaces a redes sociales
 */
export default function Contact() {
  // Hook para mostrar notificaciones
  const { toast } = useToast()

  // Estado para controlar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  /**
   * Maneja los cambios en los campos del formulario
   * @param e - Evento de cambio
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Actualiza los datos del formulario
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpia el error del campo que se está editando
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  /**
   * Valida el formulario antes de enviarlo
   * @returns boolean - Indica si el formulario es válido
   */
  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
      isValid = false
    }

    // Validación del email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
      isValid = false
    }

    // Validación del asunto
    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido"
      isValid = false
    }

    // Validación del mensaje
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
      isValid = false
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  /**
   * Maneja el envío del formulario
   * @param e - Evento de envío
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar el formulario antes de enviar
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Enviar los datos a la API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje")
      }

      // Mostrar notificación de éxito
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarme. Te responderé lo antes posible.",
      })

      // Limpiar el formulario
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      // Mostrar notificación de error
      toast({
        title: "Error al enviar",
        description:
          error instanceof Error ? error.message : "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        {/* Encabezado de sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Contacto</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            ¿Tienes alguna pregunta o propuesta? No dudes en contactarme a través de cualquiera de estos medios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 text-center sm:text-left">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Campo de nombre */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium block text-center sm:text-left">
                        Nombre
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500 flex items-center mt-1 justify-center sm:justify-start">
                          <AlertCircle className="h-3 w-3 mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Campo de email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium block text-center sm:text-left">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 flex items-center mt-1 justify-center sm:justify-start">
                          <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Campo de asunto */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium block text-center sm:text-left">
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Asunto del mensaje"
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-500 flex items-center mt-1 justify-center sm:justify-start">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Campo de mensaje */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium block text-center sm:text-left">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tu mensaje"
                      rows={5}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500 flex items-center mt-1 justify-center sm:justify-start">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Botón de envío */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 glow-border"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <span className="w-4 h-1 bg-primary mr-2"></span>
                    Información de Contacto
                  </h3>

                  {/* Email */}
                  <div className="flex items-start gap-3 group hover-lift">
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a
                        href="mailto:anderoz2508@gmail.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        anderoz2508@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-start gap-3 group hover-lift">
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <a
                        href="tel:+573118936637"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +57 3118936637
                      </a>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-start gap-3 group hover-lift">
                    <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Ubicación</h4>
                      <p className="text-sm text-muted-foreground">Pasto, Nariño, Colombia</p>
                    </div>
                  </div>
                </div>

                {/* Redes sociales */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center">
                    <span className="w-4 h-1 bg-primary mr-2"></span>
                    Redes Sociales
                  </h4>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="rounded-full border-primary/30 hover:bg-primary hover:text-white transition-colors"
                    >
                      <a href="https://github.com/AndersonOjeda" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-github"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                          <path d="M9 18c-4.51 2-5-2-7-2"></path>
                        </svg>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="rounded-full border-primary/30 hover:bg-primary hover:text-white transition-colors"
                    >
                      <a href="https://www.linkedin.com/in/ander-ojeda-89264b366/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-linkedin"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="rounded-full border-primary/30 hover:bg-primary hover:text-white transition-colors"
                    >
                      <a href="https://www.instagram.com/anderoz2508/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-instagram"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="rounded-full border-primary/30 hover:bg-primary hover:text-white transition-colors"
                    >
                      <a href="https://wa.me/573118936637" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                          className="lucide lucide-whatsapp"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.917 1.042 5.587 2.773 7.673L1.529 23.46c-.086.333.051.693.34.882.139.091.297.136.455.136.167 0 .334-.042.483-.126l4.337-2.241C8.755 23.315 10.334 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zM12 22c-1.475 0-2.883-.401-4.154-1.14-.259-.151-.564-.18-.846-.077l-3.694 1.91 1.599-3.608c.122-.276.099-.598-.063-.85C3.674 16.905 2 14.515 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                        </svg>
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
