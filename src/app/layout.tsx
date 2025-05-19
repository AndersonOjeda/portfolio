import type React from "react"
import type { Metadata } from "next"
import { PT_Serif } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

/**
 * Configuración de la fuente PT Serif con todas sus variantes
 *
 * Utiliza la API de fuentes de Next.js para cargar y optimizar la fuente PT Serif.
 * Configura todas las variantes necesarias: regular, bold, italic y bold-italic.
 *
 * @pattern Singleton - Una única instancia de la configuración de fuente
 * @pattern Factory - Crea una instancia configurada de la fuente
 * @principle Performance Optimization - Carga optimizada de fuentes
 */
const ptSerif = PT_Serif({
  subsets: ["latin"], // Subconjunto de caracteres a cargar
  weight: ["400", "700"], // Pesos de fuente: regular (400) y bold (700)
  style: ["normal", "italic"], // Estilos: normal e italic
  variable: "--font-pt-serif", // Variable CSS para acceder a la fuente
  display: "swap", // Estrategia de carga: muestra texto con fuente alternativa mientras carga
})

/**
 * Metadatos de la página
 *
 * Define información SEO y metadatos para la aplicación.
 *
 * @pattern Metadata
 * @principle SEO Optimization
 */
export const metadata: Metadata = {
  title: "Anderson Ojeda | Portfolio",
  description:
    "Portfolio personal de Anderson Ojeda, Estudiante de Ingeniería de Software y desarrollador web con pasión por las motos y aventuras",
  keywords: "desarrollo web, frontend, react, next.js, portfolio, ingeniería de software, motociclismo",
  authors: [{ name: "Anderson Ojeda" }],
  creator: "Anderson Ojeda",
    generator: 'v0.dev'
}

/**
 * Componente RootLayout
 *
 * Layout principal que envuelve toda la aplicación.
 * Proporciona la estructura común, proveedores de contexto y configuración global.
 *
 * @param props - Propiedades del componente
 * @param props.children - Componentes hijos (páginas)
 * @returns Componente React que define la estructura base de la aplicación
 *
 * @pattern Layout
 * @pattern Provider
 * @pattern Composition
 * @principle Single Responsibility (SOLID)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${ptSerif.variable}`}>
      <head>
        {/* 
          Script para prevenir parpadeo durante la carga inicial del tema
          
          Este script se ejecuta antes de que React se hidrate, detectando
          el tema almacenado o la preferencia del sistema y aplicándolo
          inmediatamente para evitar el flash de contenido incorrecto.
          
          @pattern Early Initialization
          @principle User Experience Optimization
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = storedTheme || 'system';
                  const resolvedTheme = theme === 'system' ? systemTheme : theme;
                  
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error al aplicar tema:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-serif">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          <div className="page-wrapper">
            <Navbar />
            {children}
            <footer className="py-6 border-t theme-transition" role="contentinfo">
              <div className="container mx-auto px-4 text-center">
                <small className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Anderson Ojeda. Todos los derechos reservados.
                </small>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
