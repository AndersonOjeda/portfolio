-- Script para crear la base de datos y la tabla de testimonios en PostgreSQL
-- Ejecuta primero la creación de la base de datos si no existe
CREATE DATABASE portfolio;

-- Conéctate a la base de datos antes de crear la tabla
-- \c portfolio

CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);