import { NextResponse } from "next/server"
import { Client } from "pg"

const connectionString = process.env.DATABASE_URL

export async function POST(request: Request) {
  try {
    // Obtener los datos del testimonio
    const testimonialData = await request.json()
    const { name, role, content, email } = testimonialData

    // Validar que todos los campos requeridos estén presentes
    if (!name || !role || !content || !email) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Conectar a PostgreSQL y guardar el testimonio
    if (!connectionString) {
      return NextResponse.json({ error: "No se ha definido la variable de entorno DATABASE_URL" }, { status: 500 })
    }
    const client = new Client({ connectionString })
    try {
      await client.connect()
      await client.query(`CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`)
      const insertQuery = `INSERT INTO testimonials (name, role, content, email) VALUES ($1, $2, $3, $4) RETURNING id, created_at`
      const values = [name, role, content, email]
      const result = await client.query(insertQuery, values)
      const testimonialId = result.rows[0].id
      const createdAt = result.rows[0].created_at
      return NextResponse.json(
        {
          success: true,
          message: "Testimonio guardado correctamente en la base de datos",
          testimonialId,
          createdAt,
        },
        { status: 200 },
      )
    } catch (dbError) {
      console.error("Error al guardar el testimonio en la base de datos:", dbError)
      return NextResponse.json({ error: "Error al guardar el testimonio en la base de datos" }, { status: 500 })
    } finally {
      await client.end()
    }
  } catch (error) {
    console.error("Error al procesar el testimonio:", error)
    return NextResponse.json({ error: "Error al procesar el testimonio" }, { status: 500 })
  }
}
