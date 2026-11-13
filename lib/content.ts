import { HUES } from "./scene";
import type { L, Project, Role, StackGroup } from "./types";

export const ui = {
    nav: {
        projects: { es: "Proyectos", en: "Work" },
        experience: { es: "Trayectoria", en: "Experience" },
        stack: { es: "Qué hago", en: "What I do" },
        contact: { es: "Contacto", en: "Contact" },
        home: { es: "Inicio", en: "Home" },
        primary: { es: "Principal", en: "Primary" },
        language: { es: "Idioma", en: "Language" },
        menu: { es: "Abrir menú", en: "Open menu" },
        close: { es: "Cerrar menú", en: "Close menu" },
    },
    projects: {
        title: { es: "Proyectos", en: "Selected work" },
        index: { es: "Lista de proyectos", en: "Project list" },
        role: { es: "Rol", en: "Role" },
        screens: { es: "Capturas", en: "Screens" },
        enlarge: { es: "Ampliar", en: "Enlarge" },
        close: { es: "Cerrar", en: "Close" },
        next: { es: "Siguiente captura", en: "Next screen" },
        previous: { es: "Captura anterior", en: "Previous screen" },
        allScreens: { es: "Ver las {n} pantallas", en: "See all {n} screens" },
    },
    experience: {
        title: { es: "Trayectoria", en: "Experience" },
        education: { es: "Educación", en: "Education" },
        languages: { es: "Idiomas", en: "Languages" },
    },
    stack: {
        title: { es: "Qué hago", en: "What I do" },
    },
    contact: {
        title: { es: ["Hablemos"], en: ["Let’s", "talk"] } as Record<"es" | "en", string[]>,
        line: {
            es: "Abierto a roles remotos full-stack, de backend, arquitectura e IA, y a proyectos por contrato.",
            en: "Open to remote full-stack, backend, architecture and AI roles, and to contract projects.",
        },
        copied: { es: "Correo copiado", en: "Email copied" },
        write: { es: "Escribir correo", en: "Write an email" },
    },
    cv: {
        title: { es: "Hoja de vida", en: "Résumé" },
        back: { es: "Volver al inicio", en: "Back to home" },
        download: { es: "Descargar PDF", en: "Download PDF" },
        open: { es: "Abrir PDF", en: "Open PDF" },
        document: { es: "Documento oficial", en: "Official document" },
        pageAlt: { es: "Primera página de la hoja de vida", en: "First page of the résumé" },
        pages: { es: "Página 1 de 4. El PDF completo se abre en una pestaña nueva.", en: "Page 1 of 4. The full PDF opens in a new tab." },
    },
};

export const hero = {
    line: {
        es: "Arquitecto de software full-stack. Diseño el backend, construyo la interfaz y llevo agentes de IA y plataformas de datos a producción.",
        en: "Full-stack software architect. I design the backend, build the interface and take AI agents and data platforms to production.",
    },
    focusLabel: { es: "Foco", en: "Focus" },
    focus: { es: "Backend · Frontend · IA · Datos", en: "Backend · Frontend · AI · Data" },
    baseLabel: { es: "Base", en: "Base" },
    base: { es: "Cali, CO → Naples, FL · remoto", en: "Cali, CO → Naples, FL · remote" },
    nowLabel: { es: "Hoy", en: "Now" },
    now: "Axel Growth Partners · Knowten · PROESA",
    cta: { es: "Ver proyectos", en: "See the work" },
    cv: { es: "Ver CV", en: "View CV" },
};

const shot = (src: string, width: number, height: number, es: string, en: string, keep?: "left" | "right") => ({
    src,
    width,
    height,
    alt: { es, en },
    keep,
});

export const projects: Project[] = [
    {
        slug: "knowten",
        name: "Knowten Suite",
        kind: { es: "SaaS de inteligencia competitiva", en: "Competitive intelligence SaaS" },
        line: {
            es: "Plataforma B2B multi-tenant que convierte scraping en la nube en radares competitivos y briefs ejecutivos con cada dato verificado.",
            en: "Multi-tenant B2B platform that turns cloud scraping into competitive radars and executive briefs with every fact verified.",
        },
        features: [
            { es: "Scraping en la nube", en: "Cloud scraping" },
            { es: "Radares competitivos con IA", en: "AI competitive radars" },
            { es: "Agente conversacional Synora", en: "Synora conversational agent" },
        ],
        stack: ["Next.js 16", "NestJS 11", "PostgreSQL 16", "Prisma 7", "Claude", "Apify"],
        role: { es: "Lead Full-Stack & AI Architect", en: "Lead Full-Stack & AI Architect" },
        year: "2026",
        device: "desktop",
        shots: [
            shot("/shots/knowten/01.webp", 1920, 1000, "Radar competitivo con el agente Synora acoplado", "Competitive radar with the Synora agent docked"),
            shot("/shots/knowten/02.webp", 1920, 1000, "Mapa del entorno PESTEL", "PESTEL environment map"),
            shot("/shots/knowten/03.webp", 1920, 1000, "Brief ejecutivo verificado por hechos", "Fact-verified executive brief"),
            shot("/shots/knowten/04.webp", 1920, 1000, "Pulso corporativo por industria", "Corporate pulse by industry"),
            shot("/shots/knowten/05.webp", 1920, 1000, "Estudio de extracción con los scrapers", "Extraction studio with the scrapers"),
            shot("/shots/knowten/06.webp", 1920, 1000, "API pública y webhooks", "Public API and webhooks"),
        ],
        links: [
            { label: { es: "Abrir la app", en: "Open the app" }, href: "https://app.knowten.info" },
            { label: { es: "Apify Store", en: "Apify Store" }, href: "https://apify.com/knowten" },
        ],
        note: { es: "Las capturas muestran datos públicos reales", en: "Screens show real public data" },
        hue: HUES.sodium,
    },
    {
        slug: "enerplus",
        name: "Enerplus",
        kind: { es: "Monitoreo de flotas solares", en: "Solar fleet monitoring" },
        line: {
            es: "SaaS multiempresa que une la telemetría de Huawei, Solis y Growatt en una sola sala de control, con alarmas, mantenimiento predictivo y simulación.",
            en: "Multi-company SaaS that brings Huawei, Solis and Growatt telemetry into one control room, with alarms, predictive maintenance and simulation.",
        },
        features: [
            { es: "Monitoreo solar en tiempo real", en: "Real-time solar monitoring" },
            { es: "Varios fabricantes, una sola sala", en: "Many vendors, one control room" },
            { es: "Mantenimiento predictivo", en: "Predictive maintenance" },
        ],
        stack: ["FastAPI", "Celery", "Redis", "PostgreSQL + TimescaleDB", "Next.js 16", "ECharts"],
        role: {
            es: "Backend y plataforma: API, caché, conectores y multiempresa",
            en: "Backend and platform: API, cache, connectors and multi-tenancy",
        },
        year: "2026",
        device: "desktop",
        shots: [
            shot("/shots/enerplus/01.webp", 1920, 1200, "Sala de control con mapa y curva de la flota", "Control room with map and fleet curve"),
            shot("/shots/enerplus/02.webp", 1920, 1200, "Resumen de la flota con potencia en vivo", "Fleet overview with live power"),
            shot("/shots/enerplus/03.webp", 1920, 1200, "Detalle de una planta", "Single plant detail"),
            shot("/shots/enerplus/04.webp", 1920, 1200, "Sugerencias de mantenimiento predictivo", "Predictive maintenance suggestions"),
            shot("/shots/enerplus/05.webp", 1920, 1200, "Conectores de proveedores y caché Redis", "Vendor connectors and Redis cache"),
            shot("/shots/enerplus/06.webp", 1920, 1200, "Generación real frente a la simulación", "Actual generation against simulation"),
            shot("/shots/enerplus/07.webp", 1920, 1200, "Landing del producto", "Product landing"),
        ],
        links: [{ label: { es: "Ver en producción", en: "See it live" }, href: "https://enerplus.webproai.tech" }],
        note: { es: "Código privado · datos enmascarados", en: "Private code · masked data" },
        hue: HUES.lime,
    },
    {
        slug: "cms",
        name: "CMS Studio",
        kind: { es: "CMS headless multi-tenant", en: "Multi-tenant headless CMS" },
        line: {
            es: "La agencia construye el sitio o la tienda de cada cliente y el dueño del negocio lo edita en un estudio visual, con el sitio real en vivo dentro del lienzo.",
            en: "The agency builds each client’s site or store and the business owner edits it in a visual studio, with the real site live inside the canvas.",
        },
        features: [
            { es: "Editor visual en vivo", en: "Live visual editor" },
            { es: "Multi-tenant y marca blanca", en: "Multi-tenant and white-label" },
            { es: "Herramientas para agentes de IA", en: "Tools for AI agents" },
        ],
        stack: ["NestJS 10", "Prisma 5", "PostgreSQL 16", "Redis 7", "Next.js 15", "MCP"],
        role: { es: "Arquitecto y desarrollador principal", en: "Architect and lead developer" },
        year: "2026",
        device: "desktop",
        shots: [
            shot("/shots/cms/01.webp", 1920, 1200, "Editor visual con el sitio en vivo en el lienzo", "Visual editor with the live site in the canvas"),
            shot("/shots/cms/02.webp", 1920, 1200, "Editor con árbol de capas", "Editor with the layer tree"),
            shot("/shots/cms/03.webp", 1920, 1200, "Gestor de colecciones", "Collections manager"),
            shot("/shots/cms/04.webp", 1920, 1200, "Panel de métricas", "Analytics dashboard"),
            shot("/shots/cms/05.webp", 1920, 1200, "Biblioteca de archivos", "Media library"),
            shot("/shots/cms/06.webp", 1920, 1200, "Sitio de demostración publicado", "Published demo site"),
            shot("/shots/cms/07.webp", 1920, 1200, "Sección de colección del sitio", "Collection section of the site"),
        ],
        links: [{ label: { es: "Ver en producción", en: "See it live" }, href: "https://webproai.tech" }],
        note: { es: "Código privado · datos de demostración", en: "Private code · demo data" },
        hue: HUES.azure,
    },
    {
        slug: "miplante",
        name: "MiPlante",
        kind: { es: "PWA de pagos · Hackathon Interledger", en: "Payments PWA · Interledger Hackathon" },
        line: {
            es: "Cada venta por QR se reparte sola entre el comerciante, sus proveedores y su microcrédito con Open Payments. Si hoy no hay ventas, hoy no se cobra.",
            en: "Every QR sale splits itself between the merchant, their suppliers and their microcredit over Open Payments. No sales today, nothing collected today.",
        },
        features: [
            { es: "Pagos QR con Open Payments", en: "QR payments over Open Payments" },
            { es: "Cada venta se reparte sola", en: "Every sale splits itself" },
            { es: "Asistente de voz GlorIA", en: "GlorIA voice assistant" },
        ],
        stack: ["Angular 22", "Express 5", "Prisma 7", "PostgreSQL 16", "Open Payments", "DeepSeek"],
        role: {
            es: "Caja, onboarding y servicios de pagos · equipo de 4",
            en: "Till, onboarding and payment services · team of 4",
        },
        year: "2026",
        device: "phone",
        shots: [
            shot("/shots/miplante/01.webp", 780, 1688, "Cobro por QR en el mostrador", "QR charge at the counter"),
            shot("/shots/miplante/02.webp", 780, 1688, "Venta cobrada y repartida", "Sale collected and split"),
            shot("/shots/miplante/03.webp", 780, 1688, "Resumen del negocio", "Business summary"),
            shot("/shots/miplante/04.webp", 780, 1688, "Asistente GlorIA", "GlorIA assistant"),
            shot("/shots/miplante/05.webp", 780, 1688, "Avance de las cuotas por proveedor", "Progress toward supplier quotas"),
            shot("/shots/miplante/06.webp", 780, 1688, "Configuración de obligaciones", "Obligation setup"),
            shot("/shots/miplante/07.webp", 780, 1688, "Últimas ventas", "Latest sales"),
            shot("/shots/miplante/08.webp", 780, 1688, "Pantalla de bienvenida", "Welcome screen"),
        ],
        links: [{ label: { es: "Código", en: "Code" }, href: "https://github.com/JuanMCanchala/interledger_hackathon" }],
        note: { es: "Datos de demostración", en: "Demo data" },
        hue: HUES.green,
    },
    {
        slug: "afil",
        name: "Afil",
        kind: { es: "Prefactibilidad inmobiliaria · Cali", en: "Real-estate pre-feasibility · Cali" },
        line: {
            es: "Para cualquier lote de Cali muestra la norma urbana, la cabida máxima, el valor del suelo y una factibilidad financiera, sobre un mapa 3D de oportunidad.",
            en: "For any lot in Cali it shows the zoning norm, the maximum buildable area, the land value and a financial feasibility, over a 3D opportunity map.",
        },
        features: [
            { es: "Norma urbana por lote", en: "Zoning rules per lot" },
            { es: "Mapa 3D de oportunidad", en: "3D opportunity map" },
            { es: "Factibilidad financiera", en: "Financial feasibility" },
        ],
        stack: ["Next.js 16", "deck.gl 9", "Google Maps 3D", "DuckDB", "Python", "AI SDK"],
        // Confirmed with the owner: shown as team work, with no individual technical role claimed.
        role: { es: "Proyecto del equipo WEBPRO", en: "WEBPRO team project" },
        year: "2026",
        device: "desktop",
        shots: [
            shot("/shots/afil/01.webp", 1920, 1183, "Ficha de un lote sobre el mapa 3D", "Lot card over the 3D map"),
            shot("/shots/afil/02.webp", 1920, 1183, "Hexágonos de oportunidad de la ciudad", "City opportunity hexagons"),
            shot("/shots/afil/03.webp", 1920, 1183, "Envolvente normativa en 3D", "Normative envelope in 3D"),
            shot("/shots/afil/04.webp", 1920, 1183, "Factibilidad financiera", "Financial feasibility"),
            shot("/shots/afil/05.webp", 1920, 1200, "Landing del producto", "Product landing"),
            shot("/shots/afil/06.webp", 1920, 1200, "Cabida piso a piso en la landing", "Floor-by-floor envelope on the landing"),
            shot("/shots/afil/07.webp", 1920, 1200, "Calculadora de factibilidad en la landing", "Feasibility calculator on the landing"),
        ],
        links: [{ label: { es: "Ver en producción", en: "See it live" }, href: "https://afil.webprost.com" }],
        note: { es: "Código privado", en: "Private code" },
        hue: HUES.holo,
    },
    {
        slug: "cafe",
        name: "Café Pa’l Monte",
        kind: { es: "App de escritorio para pedidos", en: "Desktop order management" },
        line: {
            es: "App de Windows que lee los pedidos de WhatsApp Business, los guarda en SQLite local y entrega cartera, analítica y reportes en PDF y Excel.",
            en: "Windows app that reads WhatsApp Business orders, stores them in local SQLite and delivers receivables, analytics and PDF and Excel reports.",
        },
        features: [
            { es: "Pedidos desde WhatsApp", en: "Orders straight from WhatsApp" },
            { es: "Cartera y analítica", en: "Receivables and analytics" },
            { es: "Reportes en PDF y Excel", en: "PDF and Excel reports" },
        ],
        stack: ["Electron 35", "SQLite WAL", "puppeteer-core", "PDFKit", "ExcelJS"],
        role: { es: "Desarrollador principal", en: "Lead developer" },
        year: "2026",
        device: "desktop",
        shots: [
            shot("/shots/cafe/01.webp", 1920, 1200, "Panel de pedidos con indicadores y pulso de facturación", "Orders panel with KPIs and billing pulse"),
            shot("/shots/cafe/02.webp", 1920, 1200, "Analítica comercial", "Sales analytics"),
            shot("/shots/cafe/03.webp", 1920, 1200, "Directorio de clientes y cartera", "Customer directory and receivables"),
            shot("/shots/cafe/04.webp", 1920, 1200, "Inspector de pedido", "Order inspector"),
            shot("/shots/cafe/05.webp", 1920, 1200, "Centro de reportes PDF y Excel", "PDF and Excel report centre"),
            shot("/shots/cafe/06.webp", 1920, 1200, "Registro de pedido manual", "Manual order entry"),
        ],
        links: [{ label: { es: "Código", en: "Code" }, href: "https://github.com/thezulux24/scraper_wps_business" }],
        note: { es: "Datos de demostración", en: "Demo data" },
        hue: HUES.ember,
    },
];

export const experience: {
    statement: L;
    education: L;
    languages: L;
    roles: Role[];
} = {
    statement: {
        es: "Diseño la arquitectura, escribo el backend, construyo la interfaz y dejo el producto corriendo.",
        en: "I design the architecture, write the backend, build the interface and leave the product running.",
    },
    education: {
        es: "Ingeniería de Sistemas y Computación + Administración de Empresas. Pontificia Universidad Javeriana Cali, 2022–2027.",
        en: "B.S. Systems & Computer Engineering + B.A. Business Administration. Pontificia Universidad Javeriana Cali, 2022–2027.",
    },
    languages: { es: "Español nativo · Inglés B1", en: "Spanish, native · English B1" },
    roles: [
        {
            period: { es: "Sep 2026 — hoy", en: "Sep 2026 — now" },
            company: "Axel Growth Partners",
            title: { es: "Backend Developer & Software Architect", en: "Backend Developer & Software Architect" },
            line: {
                es: "Backends, infraestructura y agentes de IA para clientes en EE. UU. Naples, Florida, en remoto.",
                en: "Backends, infrastructure and AI agents for US clients. Naples, Florida, remote.",
            },
            points: [
                { es: "Servicios backend seguros y de alta disponibilidad", en: "Secure, high-availability backend services" },
                { es: "Agentes de IA e integraciones con APIs empresariales", en: "AI agents and enterprise API integrations" },
            ],
            current: true,
        },
        {
            period: { es: "May 2026 — hoy", en: "May 2026 — now" },
            company: "PROESA · Universidad Icesi",
            title: { es: "Data Engineer, inteligencia de mercado", en: "Data Engineer, market intelligence" },
            line: {
                es: "8 scrapers HTTP-only de retail para una investigación sobre tabaco y alcohol, con el Banco Mundial.",
                en: "8 HTTP-only retail scrapers for a research study on tobacco and alcohol, with the World Bank.",
            },
            points: [
                { es: "Extracción sin navegador con Scrapling y curl_cffi", en: "Browserless extraction with Scrapling and curl_cffi" },
                { es: "Normalización de productos con Gemini y alertas con Resend", en: "Product normalisation with Gemini and alerts with Resend" },
            ],
            current: true,
        },
        {
            period: { es: "Mar 2026 — hoy", en: "Mar 2026 — now" },
            company: "Knowten",
            title: { es: "Lead Full-Stack & AI Architect", en: "Lead Full-Stack & AI Architect" },
            line: {
                es: "Arquitectura completa del SaaS, del backend a la interfaz: extracción en la nube, radares competitivos y el agente Synora.",
                en: "End-to-end architecture of the SaaS, from backend to interface: cloud extraction, competitive radars and the Synora agent.",
            },
            points: [
                { es: "Orquestación de scrapers en Apify con watchdog de ejecuciones", en: "Apify scraper orchestration with a run watchdog" },
                { es: "Router determinista sin tokens antes del agente con Claude", en: "Zero-token deterministic router in front of the Claude agent" },
            ],
            current: true,
        },
        {
            period: { es: "Ene — Mar 2026", en: "Jan — Mar 2026" },
            company: "P&P Camiones",
            title: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
            line: {
                es: "Plataforma comercial y operativa: solicitudes, planes, pagos y programación de servicios.",
                en: "Commercial and operations platform: requests, plans, payments and service scheduling.",
            },
            points: [{ es: "React y NestJS, con panel operativo en tiempo real", en: "React and NestJS, with a real-time operations panel" }],
            current: false,
        },
        {
            period: { es: "Jul — Nov 2025", en: "Jul — Nov 2025" },
            company: "Campus Nova · Implameq",
            title: { es: "Full-Stack Developer", en: "Full-Stack Developer" },
            line: {
                es: "Gestión clínica y trazabilidad quirúrgica para el sector salud.",
                en: "Clinical management and surgical traceability for healthcare.",
            },
            points: [
                { es: "Modelo clínico-financiero (Dentar) y operaciones quirúrgicas (Implameq)", en: "Clinical-billing model (Dentar) and surgical operations (Implameq)" },
            ],
            current: false,
        },
    ],
};

export const stack: StackGroup[] = [
    {
        title: { es: "Backend y sistemas", en: "Backend & systems" },
        line: {
            es: "APIs y servicios de alta disponibilidad, bases de datos bien modeladas y código de sistemas cuando el rendimiento lo pide.",
            en: "High-availability APIs and services, well-modelled databases, and systems code when performance calls for it.",
        },
        items: [
            { name: "Rust", icon: "rust" },
            { name: "C", icon: "c" },
            { name: "C++", icon: "cplusplus" },
            { name: "TypeScript", icon: "typescript" },
            { name: "Python", icon: "python" },
            { name: "NestJS", icon: "nestjs" },
            { name: "FastAPI", icon: "fastapi" },
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "Redis", icon: "redis" },
        ],
    },
    {
        title: { es: "Frontend e interfaces", en: "Frontend & interfaces" },
        line: {
            es: "Interfaces web y de escritorio rápidas y cuidadas: dashboards densos, editores visuales y experiencias 3D como este sitio.",
            en: "Fast, carefully built web and desktop interfaces: dense dashboards, visual editors and 3D experiences like this site.",
        },
        items: [
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextjs" },
            { name: "Angular", icon: "angular" },
            { name: "Tailwind CSS", icon: "tailwind" },
            { name: "Three.js", icon: "threejs" },
            { name: "GSAP", icon: "gsap" },
            { name: "Electron", icon: "electron" },
            { name: "Flutter", icon: "flutter" },
        ],
    },
    {
        title: { es: "Agentes de IA", en: "AI agents" },
        line: {
            es: "Agentes con herramientas, ruteo barato antes del modelo y respuestas verificadas contra los datos.",
            en: "Tool-using agents, cheap routing before the model, and answers checked against the data.",
        },
        items: [
            { name: "Claude", icon: "claude" },
            { name: "Gemini", icon: "gemini" },
            { name: "Tool calling" },
            { name: "Prompt caching" },
            { name: "TF-IDF + K-Means" },
        ],
    },
    {
        title: { es: "Datos y scraping", en: "Data & scraping" },
        line: {
            es: "Extracción a escala, con y sin navegador, y pipelines que dejan los datos listos para analizar.",
            en: "Extraction at scale, with and without a browser, and pipelines that leave the data ready to analyse.",
        },
        items: [
            { name: "Apify" },
            { name: "Scrapling" },
            { name: "curl_cffi" },
            { name: "Playwright" },
            { name: "Pandas", icon: "pandas" },
            { name: "DuckDB", icon: "duckdb" },
        ],
    },
    {
        title: { es: "Cloud y seguridad", en: "Cloud & security" },
        line: {
            es: "Contenedores, servidores Linux y seguridad práctica: credenciales cifradas, firmas HMAC y caché.",
            en: "Containers, Linux servers and practical security: encrypted credentials, HMAC signatures and caching.",
        },
        items: [
            { name: "Docker", icon: "docker" },
            { name: "Linux", icon: "linux" },
            { name: "Vercel", icon: "vercel" },
            { name: "Coolify" },
            { name: "Argon2id" },
            { name: "HMAC" },
        ],
    },
];

export const contact = {
    email: "thezulux24@gmail.com",
    links: [
        { label: "GitHub", href: "https://github.com/thezulux24" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/brayanzz24" },
        { label: "Apify", href: "https://apify.com/knowten" },
        { label: "CV", href: "/cv" },
    ],
};
