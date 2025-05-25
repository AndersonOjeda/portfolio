"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * Componente Progress
 *
 * Este componente implementa una barra de progreso personalizable.
 *
 * Implementa:
 * - Patrón de Composición: Extiende el componente base de Radix UI
 * - Patrón de Presentación: Se enfoca en la presentación visual
 * - Principio de Accesibilidad: Mantiene las propiedades de accesibilidad del componente base
 *
 * @param props - Propiedades del componente, incluyendo valor, className y otras props de HTML
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
