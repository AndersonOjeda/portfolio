"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

/**
 * Componente ThemeProvider
 *
 * Este componente envuelve la aplicación y proporciona funcionalidad de tema (claro/oscuro).
 *
 * Implementa:
 * - Patrón de Proveedor: Proporciona el contexto de tema a toda la aplicación
 * - Patrón de Composición: Envuelve los componentes hijos
 *
 * @param props - Propiedades del componente, incluyendo los hijos y opciones de tema
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
