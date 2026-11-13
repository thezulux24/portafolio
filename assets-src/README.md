# Originales y procedencia

Nada de esta carpeta se despliega. El sitio usa las copias optimizadas en `public/`.

| En el sitio | Origen | Cómo se obtuvo |
|---|---|---|
| `public/holo/portrait.webp` | `fotoperfil.jpg` | Fondo eliminado en local con `@imgly/background-removal-node`; bordes descontaminados del fondo blanco; escalado a 1200 px. |
| `public/holo/portrait-depth.webp` | derivado del recorte | Mapa de profundidad aproximado: silueta inflada más volumen del rostro. No es una medición. |
| `public/shots/knowten/*` | `knowten/live-*.png` | Capturas que ya estaban en el repositorio, convertidas a WebP. |
| `public/shots/enerplus/*` | `captures/enerplus/` | App corriendo en local sobre una base de datos descartable. Nombres de plantas, clientes, direcciones, usuarios y seriales reemplazados por datos ficticios. |
| `public/shots/cms/*` | `captures/cms-studio/` | App corriendo en local con proyectos de demostración. |
| `public/shots/miplante/*` | `captures/miplante/` | App corriendo en local con una tienda de demostración y un sustituto de la API de Open Payments. |
| `public/shots/cafe/*` | `captures/cafe-pal-monte/` | App de escritorio con 661 pedidos y 32 clientes ficticios en un perfil aislado. |
| `public/shots/afil/01–04` | `captures/afil/01–04` | Capturas que ya existían en el repositorio de Afil (`landing/originales/`). |
| `public/shots/afil/05–07` | `captures/afil/05–07` | Landing de Afil servida en local. |
| `public/cv/page-1.webp` | `public/Brayan_Zuluaga_CV.pdf` | Primera página del PDF renderizada con PyMuPDF a 170 dpi. Si cambia el PDF, hay que volver a generarla. |
| `public/holo/land.bin` | `world-atlas` (Natural Earth, 110m, dominio público) | Puntos de una esfera de Fibonacci que caen sobre tierra firme, como pares lat/lon en Int16. |
| `app/opengraph-image.jpg`, `app/icon.png`, `app/apple-icon.png` | generados | Dibujados con Python (NumPy + Pillow) con la misma matemática de franjas del shader del sitio. |

`captures/` está en `.gitignore` por su tamaño (42 MB de PNG).

## De dónde sale cada cifra

Las cifras de los proyectos se contaron leyendo cada repositorio el 2026-11-12. Si el código cambia, hay que volver a contarlas.

| Proyecto | Cifra | Fuente |
|---|---|---|
| Knowten Suite | 49 scrapers, 6 radares, router de 10 ms | Texto del portafolio anterior (`lib/translations.ts` en el historial de git), escrito por el dueño. |
| Enerplus | 19 fabricantes en catálogo, 3 activos | Catálogo de conectores del repositorio; la pantalla de proveedores muestra "3 / 19". |
| Enerplus | 24 tipos de job Celery | Tareas registradas en `apps/api`. |
| Enerplus | 54 pantallas | Páginas de `apps/web`. |
| CMS Studio | 41 tipos de bloque | Registro de bloques del repositorio (14 categorías). |
| CMS Studio | 263 operaciones para agentes | Operaciones compartidas por el servidor MCP, la CLI `ltn` y el SDK. |
| CMS Studio | 42 modelos por tenant | Modelos de Prisma con `tenantId`. |
| MiPlante | 99 % de tope de reparto | Validación del backend: las reglas no pueden tomar más del 99 % de una venta. |
| MiPlante | 188 pruebas de backend | Suite de Vitest del backend. |
| MiPlante | 19 decisiones de arquitectura | ADR en `docs/`. |
| Afil | 337k lotes con volumetría | 337.979 lotes en la base calculada, según la documentación del repositorio. |
| Afil | 13 tablas de reglas citadas | CSV en `reglas/cali/`. |
| Afil | Hexágonos de 150 m | Vista de ciudad del mapa de oportunidad. |
| Café Pa'l Monte | Ciclo de 8 s | Intervalo de sincronización automática con WhatsApp Web. |
| Café Pa'l Monte | 11k líneas | Unas 11.100 líneas entre `src` y `scripts`. |
| Café Pa'l Monte | v2.0 | Instalador `CafePalMonte_Setup_v2.0.0.exe`. |
