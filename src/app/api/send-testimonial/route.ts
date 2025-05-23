import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Obtener los datos del testimonio
    const testimonialData = await request.json()
    const { name, role, content, email } = testimonialData

    // Validar que todos los campos requeridos estén presentes
    if (!name || !role || !content || !email) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Generar un ID único para el testimonio
    const testimonialId = `testimonial_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    // En un entorno real, aquí guardaríamos el testimonio en una base de datos
    // y/o enviaríamos un correo electrónico de notificación

    // Devolver una respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: "Testimonio recibido correctamente",
        testimonialId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error al procesar el testimonio:", error)
    return NextResponse.json({ error: "Error al procesar el testimonio" }, { status: 500 })
  }
}
