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

## Cifras

Desde el 2026-11-13 las tarjetas de proyecto muestran tres rasgos en palabras (por ejemplo "Editor visual en vivo") en lugar de cifras, a pedido del dueño. Las únicas cifras que quedan en el sitio están en la trayectoria (los 8 scrapers de PROESA, confirmados por el dueño) y en el texto de Knowten, que viene del sitio anterior.
