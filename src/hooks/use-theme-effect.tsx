"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

/**
 * Hook personalizado para optimizar las transiciones de tema
 *
 * Este hook implementa:
 * - Prevención de parpadeo durante la carga inicial
 * - Optimización de rendimiento durante las transiciones
 * - Manejo de preferencias del sistema
 */
export function useThemeEffect() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    // Función para manejar el cambio de tema con optimización de rendimiento
    const handleThemeChange = () => {
      const root = window.document.documentElement

      // Añadir clase para desactivar transiciones durante el cambio
      root.classList.add("disable-transitions")

      // Pequeño retraso para aplicar el cambio sin transiciones
      setTimeout(() => {
        root.classList.remove("disable-transitions")
      }, 10)
    }

    // Escuchar cambios en el tema
    window.addEventListener("themeChange", handleThemeChange)

    // Detectar preferencia de color del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        handleThemeChange()
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)

    return () => {
      window.removeEventListener("themeChange", handleThemeChange)
      mediaQuery.removeEventListener("change", handleSystemThemeChange)
    }
  }, [theme])

  return { theme, resolvedTheme, setTheme }
}
