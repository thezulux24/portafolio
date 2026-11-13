# Portafolio · Brayan Zuluaga

Sitio personal de una página, bilingüe (ES/EN), con estética holográfica: el fondo es un campo de franjas de interferencia en WebGL y el retrato se reconstruye como holograma 3D.

## Qué hay

- **Hero**: el nombre en grande y el retrato recortado, desplazado por un mapa de profundidad, con líneas de barrido y ensamblado desde puntos al cargar.
- **Proyectos**: escenario fijado al hacer scroll, un producto por paso (Knowten Suite, Enerplus, CMS Studio, MiPlante, Afil, Café Pa'l Monte), con capturas reales, galería y vista ampliada. Por debajo de 1200 px, o con movimiento reducido, es una lista normal.
- **Trayectoria**, **Qué hago** (cinco disciplinas, del backend al frontend) y **Contacto**, con un globo holográfico que marca la ruta Cali → Naples.
- **`/cv`**: resumen y PDF oficial.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger, ScrambleText, CustomEase) · Lenis · three.js / React Three Fiber · Zustand.

## Estructura

```text
app/                  layout, página, /cv, estilos y tokens (globals.css), icono y tarjeta social
components/gl/        FringeField (shader de fondo), HoloPortrait (holograma), HoloGlobe (globo de contacto)
components/sections/  Hero, Projects, Experience, Stack, Contact
components/layout/    Nav
components/ui/        Preloader, Lightbox, BrandIcon
lib/content.ts        todo el texto y los datos de proyectos, en ES y EN
lib/scene.ts          estado compartido que GSAP anima y WebGL lee cada cuadro
lib/gsap.ts           registro de plugins, curvas y media queries
public/shots/         capturas en WebP que usa el sitio
public/holo/          retrato recortado y mapa de profundidad
assets-src/           originales (foto, capturas PNG); no se despliegan
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Editar contenido

Todo el texto vive en `lib/content.ts`. Cada proyecto tiene una frase, tres datos, stack, rol, capturas y enlaces. Para agregar capturas, guarda el WebP en `public/shots/<proyecto>/` y añádelo a la lista `shots` con su ancho y alto.

## Documentos de diseño

- `PRODUCT.md`: para quién es el sitio y qué debe lograr.
- `DESIGN.md`: sistema visual (color, tipografía, componentes, movimiento).
- `docs/interference-plate.md`: filosofía visual de las piezas estáticas (tarjeta social e icono).
