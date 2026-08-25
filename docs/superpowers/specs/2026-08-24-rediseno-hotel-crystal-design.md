# Rediseño Hotel Crystal — Documento de Diseño

**Fecha:** 2026-08-24
**Proyecto:** hotel-crystal (Next.js 14 App Router)
**Estado:** aprobado para planificación

---

## 1. Contexto y objetivo

El sitio actual es un template de `create-next-app` con contenido de hotel encima. El
contenido es bueno; la presentación no lo sostiene.

**Objetivo elegido:** credibilidad y presencia. El visitante llega desde Booking, Google o
una recomendación y viene a validar que el hotel es serio. No estamos optimizando conversión
de reservas directas — no hay motor de reservas ni precios publicados, y eso no cambia en
este trabajo.

**Huésped objetivo:** viajero corporativo. Neuquén capital, Vaca Muerta, estadías de trabajo
entre semana. El contenido ya lo confirma: late check-out hasta las 18:00, recepción de
paquetería, conserjería 24 h, escritorio en las Superiores, desayuno express desde las 7:30.

**Consecuencia de diseño:** sobrio y eficiente antes que cálido y evocativo. Los datos
prácticos se leen de un vistazo. La antigüedad del hotel es un argumento de confianza, no
una pieza de nostalgia.

---

## 2. Decisiones ya tomadas

| Decisión | Valor |
|---|---|
| Dirección visual | C — Patagonia Contemporánea, con sentido de lugar y carácter tipográfico |
| Paleta | Derivada del logo (§4.1). No se usa la paleta actual de `globals.css` |
| Tipografía | Fraunces (títulos) + Inter (texto y datos) |
| Copy | Se conserva la voz y los hechos; se **condensa** el volumen (§5) |
| `HALL.jpg` | Se elimina del sitio |
| Hero del home | El video actual (ya optimizado a 720p sin audio) |
| Fotografía | No hay fotos nuevas; se trabaja con el set existente (§7.3) |
| Misión/Visión/Valores | Se condensa a una sola declaración (§5.2) |

---

## 3. Problemas concretos del estado actual

Cada uno tiene su contrapartida en el diseño nuevo.

| # | Problema | Ubicación |
|---|---|---|
| P1 | Dos sistemas de color coexisten sin relación: 7 variables custom celestes y la paleta slate por defecto de shadcn, sin usar | `globals.css:6-12` y `:41-60` |
| P2 | `h1 { font-size: 5rem }` fijo y sin responsive; revienta en mobile | `globals.css:15-17` |
| P3 | Geist (fuente por defecto de Vercel) como tipografía de marca | `layout.js:6-15` |
| P4 | `metadataBase`, `canonical` y Open Graph apuntan al placeholder `https://your-domain.com` | `layout.js:30-31` |
| P5 | `roomsCards` y `aboutCards` son idénticos byte a byte en los 3 diccionarios | `dictionaries/*.json` |
| P6 | Tres hojas CSS sueltas por página en vez de un sistema | `styles-about.css`, `styles-rooms.css`, `styles-turism.css` |
| P7 | GSAP y Framer Motion instaladas para el mismo propósito | `package.json` |
| P8 | Los fondos de sección son `background-image` de CSS, así que no pasan por `next/image` | `styles-*.css:2` |
| P9 | El home no muestra ni una habitación: es video + logo + mapa | `components/home.js` |
| P10 | `alt="Iberia Logo"` — residuo del proyecto del que se forkeó | `Footer.js:20` |
| P11 | No existe página de contacto; el nav apunta a un ancla del home | `menu-nav.js` |

**Ya resuelto en esta sesión:** los assets pasaron de **78.5 MB a 12.2 MB (−84.5%)** — ver
el desglose en §7.1. Ninguna de esas optimizaciones requirió cambios de código.

---

## 4. Sistema de diseño

### 4.1 Color

Todos los colores de marca se extrajeron pixel por pixel de `public/logoo.png`. El degradado
de la estrella va de cian a azul; el wordmark aporta el grafito.

```css
/* Marca — muestreados del logo */
--cyan-300:  #5FD7E5;   /* extremo claro de la estrella */
--cyan-500:  #3CAAD1;
--blue-500:  #2D92C8;
--blue-600:  #1B77BD;
--blue-700:  #0C5CB4;   /* extremo profundo de la estrella */
--graphite:  #232227;   /* wordmark CRYSTAL HOTEL */

/* Neutros — derivados del mismo hue azul */
--ink-900:   #0B1B2B;   /* fondos oscuros, veils sobre foto */
--ink-800:   #12293F;   /* superficies oscuras elevadas */
--paper:     #F5F9FB;   /* fondo claro base */
--paper-2:   #E4EDF2;   /* superficies, tags, separadores */
--slate-300: #C3D2DC;   /* texto secundario sobre oscuro */
--slate-400: #7C8E9C;   /* labels, texto terciario */
--slate-600: #4A5C6B;   /* texto secundario sobre claro */
```

**Regla del sistema (no negociable):** el cian sobre fondo claro da **2.52:1** y no cumple
WCAG AA. Sobre `--ink-900` da **10.23:1** (AAA).

> **Cian solo sobre fondos oscuros. Azul profundo (`--blue-700`) sobre fondos claros.**

Contrastes verificados de los pares en uso:

| Par | Ratio | Nivel |
|---|---|---|
| `graphite` sobre `paper` | 14.91:1 | AAA |
| `paper` sobre `ink-900` | 16.44:1 | AAA |
| `cyan-300` sobre `ink-900` | 10.23:1 | AAA |
| `slate-600` sobre `paper` | 6.53:1 | AA |
| `blue-700` sobre `paper` | 6.18:1 | AA |
| `cyan-500` sobre `ink-900` | 6.52:1 | AA |
| `blue-600` sobre `paper` | 4.49:1 | Solo títulos ≥24px |
| `slate-400` sobre `paper` | 3.19:1 | Solo texto grande |

`--blue-600` y `--slate-400` quedan restringidos a texto grande. No se usan para cuerpo.

**Nota histórica:** el `#2175bf` de la paleta vieja era el más fiel al logo (`#1B77BD`).
Los desviados eran `#5aa9c8` y `#3c89ac`, versiones desaturadas del degradado real.

### 4.2 Tipografía

- **Fraunces** — títulos. Serif con carácter, pesos 300 (display) y 600 (subtítulos).
  Se usa en italic para las palabras de acento.
- **Inter** — cuerpo, datos, navegación, labels. Pesos 300/400/500/600.

Ambas por `next/font/google` con `display: swap` y subset latino. **Se eliminan los
`localFont` de Geist** y sus dos `.woff` del repo.

Escala fluida con `clamp()` — reemplaza los tamaños fijos de P2:

| Rol | Tamaño |
|---|---|
| Display (hero) | `clamp(2.5rem, 6vw, 4rem)` |
| H2 sección | `clamp(1.75rem, 3.5vw, 2.5rem)` |
| H3 | `clamp(1.15rem, 2vw, 1.4rem)` |
| Cuerpo | `1rem` / `line-height: 1.65` |
| Label | `0.6875rem`, `letter-spacing: 0.15em`, mayúsculas |

### 4.3 Layout y componentes

Dos tipos de superficie que alternan por sección:

- **Oscura** (`--ink-900`) — heroes con foto y veil. Es donde vive el cian.
- **Clara** (`--paper`) — secciones de contenido. Manda el grafito y el azul profundo.

Componentes compartidos a construir en `src/components/`:

| Componente | Uso |
|---|---|
| `SectionHero` | Título + foto de fondo + veil. Reemplaza los 3 `background-image` de CSS (P8, P6) con `next/image` |
| `FactStrip` | Franja de datos escaneables: check-in, check-out, conserjería, desayuno |
| `RoomCard` | Foto, nombre, configuración de camas, tag Estándar/Superior |
| `ServiceItem` | Icono + nombre + descripción, para Incluidos y Adicionales |
| `Prose` | Contenedor de texto largo con medida legible (~65 caracteres) |

Radio de borde: `4px` en botones y tags, `8px` en tarjetas. Sin sombras difusas grandes;
la jerarquía la dan color y espacio, no elevación.

---

## 5. Estrategia de copy

**Principio:** no se reescribe la voz ni se inventan hechos. Se condensa el volumen.

El diccionario `es.json` tiene ~1878 palabras y la historia sola se lleva ~700 en ocho
párrafos corridos. Es información valiosa presentada de la peor forma posible.

### 5.1 Historia → línea de tiempo + texto corto

Los ocho párrafos pasan a **una introducción de 2–3 párrafos** más una **línea de tiempo**
que preserva todos los hitos sin muro de texto:

| Año | Hito |
|---|---|
| 1913 | Jacobo Eddi y Julia Zerahia llegan a Neuquén desde Roshpirvá, Palestina |
| 1918 | Abre Baratillo Eddi en Sarmiento 36 |
| 1948 | Víctor Eddi se casa con Elena Darmún; vuelven a Neuquén |
| 1964 | Víctor se independiza; compra la propiedad de Olascoaga al 200 |
| **1966** | **El 14 de enero abre el Hotel Crystal con 10 habitaciones** |
| 2018 | Rodrigo Fernández asume la razón social el 1 de julio |
| Hoy | 45 habitaciones, 99 plazas |

Se recortan los detalles que no aportan a la credibilidad del hotel: la lista de escuelas
donde enseñó Elena, las comisiones directivas de Víctor, los nombres de los locales
comerciales intermedios ("El Rey de los Pantalones", "Lencería Juli", "Ella, Medias"), y
las profesiones de los tres hijos. Son datos de genealogía familiar, no de hotel.

### 5.2 Misión / Visión / Valores → una declaración

Los tres párrafos actuales dicen lo mismo con distintas palabras ("acogedor", "como en
casa", "calidez", "atención personalizada" aparecen en los tres). **Decidido: se condensan
en una sola declaración corta.** No se elimina la sección; se reduce a dos o tres líneas que
digan una cosa y la digan bien.

### 5.3 Deduplicación

`aboutCards` se elimina de los 3 diccionarios; queda solo `roomsCards` (P5).

### 5.4 Alcance multiidioma

**Todo recorte de copy se replica en `es.json`, `en.json` y `pt.json`.** Los tres deben
mantener la misma estructura de claves. Una clave eliminada en uno se elimina en los tres.

---

## 6. Estructura de páginas

### Home (`/[lang]`)
Hoy es video + logo + mapa (P9). Pasa a:
1. **Hero** — **el video actual** (decidido), logo blanco, título, badge "Neuquén Capital ·
   desde 1966", dos CTA
2. **FactStrip** — check-in, check-out, conserjería, cantidad de habitaciones
3. **Habitaciones** — 3–4 `RoomCard` con link a la página completa
4. **Servicios destacados** — los 4–5 más relevantes para el huésped corporativo
5. **El hotel** — 2 párrafos + link a la historia
6. **Contacto** — datos + mapa (se conserva el embed actual)

**Requisitos del hero con video**, para que no destruya el LCP:
- `poster="/vid-poster.jpg"` — la primera pintura no espera al video
- `preload="none"` en mobile; el video carga después del contenido
- `autoplay muted loop playsInline` (ya está así en `home.js:29-34`)
- Respetar `prefers-reduced-motion`: si está activo, se muestra solo el póster
- Veil `--ink-900` al 70% para que el cian del sistema tenga contraste sobre el video

### Habitaciones (`/[lang]/rooms`)
`SectionHero` + intro + grilla de `RoomCard` + bloque comparativo Estándar vs Superior +
servicios completos en dos grupos (Incluidos / Adicionales).

### El hotel (`/[lang]/about`)
`SectionHero` + declaración condensada (§5.2) + historia corta + línea de tiempo (§5.1).

### Turismo (`/[lang]/turism`)
Se conserva. Es contenido secundario para el huésped corporativo: baja en jerarquía de
navegación pero mantiene su página. Links y mapa interactivo como están.

### Contacto
Se resuelve P11: o se crea `/[lang]/contact` real, o se elimina del nav y queda como ancla
del home. **Recomendación: página propia**, con dirección, WhatsApp, mail, redes, mapa y
horarios de check-in/out.

---

## 7. Assets

### 7.1 Ya ejecutado

| Acción | Resultado |
|---|---|
| Redimensionado a 2400 px máx. + recompresión | 74.8 MB → 11.6 MB (**−84.5%**) |
| `public/bg.jpg` eliminado | Era **duplicado byte a byte** de `about1.jpg`; entre los dos ocupaban 24 MB de los 74.8 originales |
| `vid.mp4` reencodeado | 1080p con audio → 720p sin audio: 3.72 MB → 1.25 MB (**−66%**) |
| `vid-poster.jpg` generado | 72 KB, para que el LCP no dependa de que cargue el video |

### 7.2 Pendiente

| Acción | Detalle |
|---|---|
| Eliminar `HALL.jpg` | Requiere quitar antes la referencia en `our-history.js:15` |
| Migrar fondos CSS a `next/image` | `bg-about.jpg`, `land.jpeg`, `aa.jpeg` (P8) |

### 7.3 Restricción: no hay fotos nuevas

**Decidido: se trabaja con el material existente.** Esto es una restricción dura, no un
riesgo. La dirección visual elegida apoya peso en la fotografía y el set actual no lo
sostiene de forma pareja.

Triaje del set completo (27 archivos, revisados uno por uno):

**Nivel A — protagonistas.** Se usan grandes.
`DOBLE-B` (Superior: piso de madera, escritorio, ropa de cama neutra — la mejor del set) ·
`homeBox` (detalle de lámpara y cama, poca profundidad de campo) ·
`aa.jpeg` (bandeja de desayuno sobre la cama) ·
`DET-B` (cartel CRYSTAL HOTEL) · `DET-E` (cuadro enmarcado, composición limpia)

**Nivel B — secundarias.** Se usan chicas o con recorte cerrado.
`TRIPLE-D` · `DOBLE-A` · `about1.jpg` (pasillo con sillón rojo) · `about2.jpg` (lobby) ·
`DESA.jpg` (fachada real, pero con cables y un cartel de YPF: **recortar al cartel del hotel**) ·
`land.jpeg` (letras NEUQUÉN, solo para Turismo)

**Nivel C — no se usan.**
`HALL.jpg` (cocina con microondas) · `Captura de pantalla 2024-10-31…` (es una captura, con
gente identificable de espaldas) · `saloon-banner.jpg` (gráfico azul de stock abstracto, no
es una foto del hotel)

**Problema sin salida limpia:** `SINGLE-A` es la **única** foto de habitación single, y
`CUADRUPLE-A/B` las únicas de cuádruple. Todas tienen acolchados estampados o naranjas y piso
de cerámica, y se ven fechadas. No se pueden descartar porque cada tipo de habitación necesita
su foto. Mitigación: recorte cerrado sobre la cabecera o el escritorio evitando el acolchado,
y tamaño de tarjeta chico.

**Consecuencia de diseño:** el peso visual se corre de la fotografía a la **tipografía, la
franja de datos y la línea de tiempo**. Menos fotos y más grandes de las buenas; nunca una
grilla pareja que exponga a las malas al mismo tamaño que a las buenas.

**Hallazgo aprovechable:** las fotos prueban solas la diferencia Estándar/Superior — las
Superiores tienen piso de madera y ropa de cama neutra, las Estándar cerámica y estampados.
El bloque comparativo de §6 puede apoyarse en eso en vez de solo describirlo.

**El video es el hall real.** Muestra recepción, sillones y piso de madera. Cubre el hueco que
deja descartar `HALL.jpg`.

---

## 8. Limpieza técnica incluida

Se hace como parte del trabajo, no como refactor aparte:

- Consolidar `globals.css`: un solo sistema de tokens, se elimina la paleta shadcn sin uso (P1)
- Eliminar los tres `styles-*.css` de página, absorbidos por componentes (P6)
- Elegir **una** librería de animación y desinstalar la otra (P7). Estado real: GSAP se usa
  en 4 archivos de página (`home.js`, `our-history.js`, `mision-vision.js`, `services.js`);
  Framer Motion en 2 componentes compartidos (`image-swiper.jsx`, `apple-cards-carousel.jsx`).
  **Preferencia: Framer Motion**, porque los componentes que dependen de ella son reutilizables
  y los 4 usos de GSAP son animaciones de entrada simples, fáciles de portar. Costo: reescribir
  esas 4 animaciones
- Corregir `metadataBase` y `canonical` a `https://www.hotelcrystalneuquen.com` (P4)
- Corregir `alt="Iberia Logo"` (P10)
- Renombrar el proyecto de `"iberia"` a `"hotel-crystal"` en `package.json`
- Eliminar las fuentes Geist del repo

---

## 9. Fuera de alcance

- **DNS y certificado SSL.** El dominio apunta a Hostinger con un certificado vencido el
  27/03/2025 y sirve un sitio viejo distinto a este proyecto. Es un trabajo de paneles, no
  de código, y se resuelve aparte.
- Motor de reservas o precios publicados.
- Fotografía nueva (se recomienda, no se ejecuta acá).
- Rediseño del logo.
- Modo oscuro conmutable por el usuario. El sistema alterna superficies claras y oscuras por
  sección, que es distinto.

---

## 10. Criterios de éxito

1. Un solo sistema de color, derivado del logo, sin restos de la paleta shadcn.
2. Todos los pares texto/fondo cumplen WCAG AA; los críticos, AAA.
3. Ninguna tipografía fija sin `clamp()`; el sitio se lee bien de 360 px a 1920 px.
4. El home muestra habitaciones y servicios sin necesidad de navegar.
5. La historia conserva todos sus hitos en menos de la mitad de palabras.
6. `es.json`, `en.json` y `pt.json` con estructura de claves idéntica.
7. Cero `background-image` de CSS apuntando a fotos.
8. Una sola librería de animación instalada.
9. Metadata apuntando al dominio real.
10. Lighthouse: performance ≥ 90 y accesibilidad ≥ 95 en mobile.

---

## 11. Preguntas abiertas

**Resueltas el 2026-08-24:**

| Pregunta | Respuesta |
|---|---|
| ¿Se borra `public/bg.jpg`? | **Sí.** Ejecutado; era duplicado exacto de `about1.jpg` (§7.1) |
| ¿Hay fotografía nueva? | **No.** Se trabaja con el material existente (§7.3) |
| Misión/Visión/Valores | **Condensar** a una declaración corta (§5.2) |
| Hero del home | **El video actual**, ya optimizado a 720p (§6) |

**Pendiente:**

1. Contacto: ¿página propia o ancla del home? Recomendación: página propia (§6)
