"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

/**
 * Definición de los elementos de navegación
 * Implementa el patrón de Datos Estáticos para facilitar el mantenimiento
 *
 * Cada elemento contiene:
 * - name: texto visible del enlace
 * - href: destino del enlace (ID de sección con #)
 */
const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Acerca de mí", href: "#about" },
  { name: "Experiencia", href: "#experience" },
  { name: "Habilidades", href: "#skills" },
  { name: "Proyectos", href: "#projects" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Contacto", href: "#contact" },
]

/**
 * Componente de Barra de Navegación
 *
 * Este componente crea una barra de navegación responsiva con:
 * - Logo en la parte izquierda
 * - Enlaces de navegación en el centro
 * - Botón de cambio de tema en la derecha
 * - Menú hamburguesa para dispositivos móviles
 *
 * Implementa:
 * - Patrón de Estado: Usa useState para gestionar estados internos
 * - Patrón de Efecto Secundario: Usa useEffect para efectos de scroll
 * - Patrón de Renderizado Condicional: Muestra/oculta elementos según condiciones
 * - Uso de Flex para layout horizontal responsivo
 */
export default function Navbar() {
  // Estado para controlar si el menú móvil está abierto o cerrado
  // Implementa el patrón de Estado
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Estado para controlar si la barra de navegación debe tener fondo sólido
  // Implementa el patrón de Estado
  const [isScrolled, setIsScrolled] = useState(false)

  // Función para alternar el estado del menú móvil
  // Implementa el patrón de Comando
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Función para manejar el desplazamiento suave a las secciones
  // Implementa el patrón de Estrategia
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault() // Prevenir el comportamiento predeterminado del enlace

    // Cerrar el menú móvil si está abierto
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // Obtener el elemento de destino usando el ID (quitando el #)
    const targetId = href.replace("#", "")
    const targetElement = document.getElementById(targetId)

    // Si el elemento existe, desplazarse hasta él
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })

      // Actualizar la URL sin recargar la página
      window.history.pushState({}, "", href)
    }
  }

  // Efecto para detectar el desplazamiento y cambiar el estilo de la barra de navegación
  // Implementa el patrón de Observador
  useEffect(() => {
    const handleScroll = () => {
      // Si el desplazamiento es mayor a 50px, aplicar fondo sólido
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Agregar el evento de desplazamiento
    window.addEventListener("scroll", handleScroll)

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between" role="navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="ADOZ Logo">
          <figure className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden">
            <Image src="/images/logo.png" alt="ADOZ Logo" fill className="object-contain theme-transition" priority />
          </figure>
          <span className="ml-2 font-bold text-xl hidden sm:inline-block">ADOZ</span>
        </Link>

        {/* Navegación para escritorio - Flex para layout horizontal */}
        <ul className="hidden md:flex items-center gap-6">
          {/* Mapeo de elementos de navegación - Patrón de Lista */}
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-medium transition-colors hover:text-primary animated-underline"
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <ModeToggle /> {/* Componente para cambiar tema */}
          </li>
        </ul>

        {/* Botón de menú para móviles - Flex para alineación */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="hover:bg-primary/10"
          >
            {/* Icono condicional - Patrón de Renderizado Condicional */}
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Menú móvil desplegable - Renderizado condicional */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="grid gap-3 p-4 bg-background border-b">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
