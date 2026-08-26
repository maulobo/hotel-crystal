# Rediseño Hotel Crystal — Plan de Implementación

> **Para agentes:** SUB-SKILL REQUERIDA: usar `superpowers:subagent-driven-development`
> (recomendado) o `superpowers:executing-plans` para implementar tarea por tarea.
> Los pasos usan checkbox (`- [ ]`) para seguimiento.

**Goal:** Rediseñar el sitio del Hotel Crystal Neuquén con un sistema visual derivado del
logo, condensando el copy existente, sin agregar funcionalidad nueva.

**Architecture:** Next.js 14 App Router con rutas `[lang]` para es/en/pt. Se reemplaza la
paleta actual por tokens CSS derivados del logo, se sustituye Geist por Fraunces + Inter, y
se extraen componentes compartidos que absorben las tres hojas CSS sueltas por página. El
contenido sale de `src/app/dictionaries/{es,en,pt}.json`.

**Tech Stack:** Next.js 14.2.15 · React 18 · Tailwind 3.4 · Framer Motion · next/font ·
lucide-react + @tabler/icons-react · pnpm

**Spec:** `docs/superpowers/specs/2026-08-24-rediseno-hotel-crystal-design.md`
Leerla completa antes de empezar. Este plan argumenta desde ella.

---

## ⚠️ Contexto para quien retome esto sin haber estado en la conversación

Esto se decidió con el dueño del proyecto el 2026-08-24. Lo que sigue **no está abierto a
rediscusión** salvo que él lo pida:

1. **Objetivo del sitio:** credibilidad y presencia, no conversión de reservas. No hay motor
   de reservas y no se agrega. Los precios dicen "Consultar" y siguen así.
2. **Huésped objetivo:** viajero corporativo (Neuquén capital / Vaca Muerta).
3. **Dirección visual:** sobria, con carácter tipográfico y sentido de lugar.
4. **Paleta:** derivada del logo. Extraída pixel por pixel de `public/logoo.png`.
   No se inventan colores nuevos.
5. **Copy:** se conserva la voz y los hechos. Se **condensa** el volumen. No se reescribe.
6. **Fotografía:** no hay fotos nuevas. Se trabaja con el set existente. Ver §7.3 de la spec
   para el triaje de qué foto sirve y cuál no.
7. **Hero del home:** el video actual, ya optimizado.

**Ya ejecutado (no rehacer):** los assets pasaron de 78.5 MB a 12.2 MB. `public/bg.jpg`
eliminado por ser duplicado exacto de `about1.jpg`. `vid.mp4` reencodeado a 720p sin audio
(3.72 MB → 1.25 MB) y se generó `public/vid-poster.jpg`. Commits `cdba034` y `0922079`.

**Fuera de alcance:** el dominio `hotelcrystalneuquen.com` apunta a Hostinger con certificado
vencido el 27/03/2025 y sirve un sitio viejo distinto a este repo. Es trabajo de paneles
(DNS + Vercel), no de código. No intentar arreglarlo desde acá.

---

## Global Constraints

Aplican a **todas** las tareas.

- **Node:** >= 20 (`package.json` engines). Gestor: **pnpm**.
- **Tres idiomas siempre:** todo cambio de copy se replica en `es.json`, `en.json` y
  `pt.json`. Los tres deben mantener **estructura de claves idéntica**. Hay un script de
  verificación en la Tarea 3; correrlo después de cada cambio de diccionario.
- **Regla de color (no negociable):** el cian sobre fondo claro da 2.52:1 y no cumple WCAG AA.
  → **Cian solo sobre fondos oscuros. `--blue-700` sobre fondos claros.**
- `--blue-600` (#1B77BD) y `--slate-400` (#7C8E9C) **solo en texto ≥24px**. Nunca en cuerpo.
- **Nada de tipografías fijas.** Todo tamaño de título usa `clamp()`.
- **Cero `background-image` de CSS apuntando a fotos.** Todo va por `next/image`.
- **No agregar dependencias** sin justificarlo. El objetivo es sacar una (gsap), no sumar.
- **Commits frecuentes**, uno por tarea como mínimo.

### Verificación en este proyecto

**No hay framework de tests y no se agrega uno.** Es un sitio de marketing estático; montar
Jest/Vitest para esto sería overhead sin retorno. El ciclo de verificación real es:

```bash
pnpm run build     # debe compilar sin errores ni warnings nuevos
pnpm run lint      # debe pasar limpio
pnpm run dev       # revisión visual en 360px, 768px y 1440px
```

Donde una tarea **sí** tiene una verificación automatizable (paridad de claves de los
diccionarios, contraste de color), el script está escrito en la tarea. Usarlo.

---

## Estructura de archivos

**Se crean:**

| Archivo | Responsabilidad |
|---|---|
| `src/components/site/SectionHero.jsx` | Hero de sección: foto + veil + título. Reemplaza los 3 `background-image` de CSS |
| `src/components/site/FactStrip.jsx` | Franja de datos escaneables (check-in, check-out, etc.) |
| `src/components/site/RoomCard.jsx` | Tarjeta de habitación |
| `src/components/site/ServiceItem.jsx` | Ítem de servicio con icono |
| `src/components/site/Prose.jsx` | Contenedor de texto largo con medida legible |
| `src/components/site/Timeline.jsx` | Línea de tiempo de la historia |
| `src/app/[lang]/contact/page.js` | Página de contacto (nueva ruta) |
| `scripts/check-dictionaries.mjs` | Verifica paridad de claves entre los 3 idiomas |

**Se modifican:** `globals.css`, `tailwind.config.js`, `layout.js`, `page.js`, `home.js`,
`nav.js`/`menu-nav.js`, `Footer.js`, las 4 páginas de sección, los 3 diccionarios,
`next.config.mjs`, `package.json`.

**Se eliminan:** `styles-about.css`, `styles-rooms.css`, `styles-turism.css`,
`fonts/GeistVF.woff`, `fonts/GeistMonoVF.woff`, `public/about/HALL.jpg`,
`public/crys/Captura de pantalla 2024-10-31 a la(s) 13.27.14.jpg`,
`src/app/[lang]/image/saloon-banner.jpg`.

---

## Task 1: Fundaciones — tokens de color y tipografía

Todo lo demás depende de esto. Hacer primero.

**Files:**
- Modify: `src/app/[lang]/globals.css` (reescritura completa)
- Modify: `tailwind.config.js`
- Modify: `src/app/[lang]/layout.js:1-15` (fuentes) y `:30-31` (metadata)
- Delete: `src/app/[lang]/fonts/GeistVF.woff`, `src/app/[lang]/fonts/GeistMonoVF.woff`

**Interfaces:**
- Produces: tokens CSS `--cyan-300`, `--cyan-500`, `--blue-500`, `--blue-600`, `--blue-700`,
  `--graphite`, `--ink-900`, `--ink-800`, `--paper`, `--paper-2`, `--slate-300`,
  `--slate-400`, `--slate-600`; clases Tailwind `bg-ink-900`, `text-graphite`, etc.;
  variables de fuente `--font-fraunces` y `--font-inter`.

- [ ] **Step 1: Reescribir `globals.css`**

Reemplazar **todo** el archivo. Se elimina la paleta shadcn sin usar y los `h1/h2/h3` fijos.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Marca — muestreados de public/logoo.png */
    --cyan-300:  #5FD7E5;
    --cyan-500:  #3CAAD1;
    --blue-500:  #2D92C8;
    --blue-600:  #1B77BD;
    --blue-700:  #0C5CB4;
    --graphite:  #232227;

    /* Neutros — derivados del mismo hue azul */
    --ink-900:   #0B1B2B;
    --ink-800:   #12293F;
    --paper:     #F5F9FB;
    --paper-2:   #E4EDF2;
    --slate-300: #C3D2DC;
    --slate-400: #7C8E9C;
    --slate-600: #4A5C6B;

    --radius-card: 8px;
    --radius-ctl:  4px;
  }

  body {
    background-color: var(--paper);
    color: var(--graphite);
    font-family: var(--font-inter), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-fraunces), Georgia, serif;
    font-weight: 300;
    letter-spacing: -0.022em;
    line-height: 1.04;
  }

  h1 { font-size: clamp(2.5rem, 6vw, 4rem); }
  h2 { font-size: clamp(1.75rem, 3.5vw, 2.5rem); }
  h3 { font-size: clamp(1.15rem, 2vw, 1.4rem); font-weight: 600; }
  p  { line-height: 1.65; }
}

@layer components {
  /* Label en mayúsculas: usado por FactStrip, eyebrows y tags */
  .u-label {
    font-size: 0.6875rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-weight: 600;
  }
}
```

- [ ] **Step 2: Conectar los tokens en `tailwind.config.js`**

Reemplazar el bloque `theme.extend.colors` completo por:

```js
extend: {
  colors: {
    cyan:     { 300: 'var(--cyan-300)', 500: 'var(--cyan-500)' },
    brand:    { 500: 'var(--blue-500)', 600: 'var(--blue-600)', 700: 'var(--blue-700)' },
    graphite: 'var(--graphite)',
    ink:      { 800: 'var(--ink-800)', 900: 'var(--ink-900)' },
    paper:    { DEFAULT: 'var(--paper)', 2: 'var(--paper-2)' },
    slate:    { 300: 'var(--slate-300)', 400: 'var(--slate-400)', 600: 'var(--slate-600)' },
  },
  borderRadius: {
    card: 'var(--radius-card)',
    ctl:  'var(--radius-ctl)',
  },
  fontFamily: {
    display: ['var(--font-fraunces)', 'Georgia', 'serif'],
    sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
  },
},
```

Dejar `keyframes`, `animation` y `plugins` como están.

- [ ] **Step 3: Cambiar las fuentes en `layout.js`**

Borrar los dos bloques `localFont` (`layout.js:6-15`) y poner:

```js
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
```

Y en el `<body>`, reemplazar las clases de Geist por:

```jsx
<body className={`${fraunces.variable} ${inter.variable} antialiased`}>
```

Quitar también `bg-[var(--color-fuente-2-opacity)]` y `text-[var(--color-fuente)]` del body:
ahora el fondo lo define `globals.css`.

- [ ] **Step 4: Corregir la metadata (P4)**

En `layout.js`, dentro de `generateMetadata`, reemplazar las líneas 30-31:

```js
const url = `https://www.hotelcrystalneuquen.com/${lang}`;
const image = `https://www.hotelcrystalneuquen.com/og-image.jpg`;
```

Y agregar al objeto que retorna:

```js
metadataBase: new URL("https://www.hotelcrystalneuquen.com"),
```

> Nota: `og-image.jpg` **todavía no existe**. Crearlo en la Tarea 9 a partir de una foto de
> Nivel A con el logo encima, 1200×630.

- [ ] **Step 5: Borrar las fuentes Geist**

```bash
rm "src/app/[lang]/fonts/GeistVF.woff" "src/app/[lang]/fonts/GeistMonoVF.woff"
rmdir "src/app/[lang]/fonts" 2>/dev/null || true
```

- [ ] **Step 6: Verificar**

```bash
pnpm run build
```

Esperado: compila. Van a aparecer errores en páginas que usan `var(--color-fuente-*)`, que
ya no existe — es correcto, se arreglan en las tareas siguientes. **Anotar cuáles son** para
no perderlas:

```bash
grep -rn "color-fuente" src/ | tee /tmp/pendientes-color.txt
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Reemplazo la paleta y las fuentes por el sistema derivado del logo"
```

---

## Task 2: Componentes compartidos

**Files:**
- Create: `src/components/site/Prose.jsx`, `SectionHero.jsx`, `FactStrip.jsx`,
  `RoomCard.jsx`, `ServiceItem.jsx`

**Interfaces:**
- Consumes: tokens y clases de la Tarea 1.
- Produces:
  - `<Prose>{children}</Prose>`
  - `<SectionHero image title eyebrow priority />`
  - `<FactStrip items={[{k,v}]} tone="dark"|"light" />`
  - `<RoomCard image title beds tag />`
  - `<ServiceItem icon name description />`

- [ ] **Step 1: `Prose.jsx`**

```jsx
export default function Prose({ children, className = "" }) {
  return (
    <div className={`max-w-[65ch] text-slate-600 ${className}`}>{children}</div>
  );
}
```

- [ ] **Step 2: `SectionHero.jsx`**

Reemplaza los `background-image` de CSS. `priority` solo en el hero de la primera pantalla.

```jsx
import Image from "next/image";

export default function SectionHero({ image, alt, title, eyebrow, priority = false }) {
  return (
    <section className="relative h-[clamp(260px,42vh,420px)] overflow-hidden bg-ink-900">
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,27,43,.62) 0%, rgba(11,27,43,.42) 45%, rgba(11,27,43,.88) 100%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-end px-6 pb-10 md:px-16 md:pb-14">
        {eyebrow && <span className="u-label mb-3 text-cyan-300">{eyebrow}</span>}
        <h1 className="text-paper">{title}</h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `FactStrip.jsx`**

`tone` decide qué mitad del sistema de color se usa. Respeta la regla del cian.

```jsx
export default function FactStrip({ items, tone = "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`grid grid-cols-2 gap-y-6 border-t px-6 py-6 md:grid-cols-4 md:px-16 ${
        dark ? "border-slate-300/20 bg-ink-900" : "border-paper-2 bg-paper"
      }`}
    >
      {items.map((it) => (
        <div key={it.k}>
          <span className={`u-label block ${dark ? "text-slate-400" : "text-brand-700"}`}>
            {it.k}
          </span>
          <span
            className={`mt-1 block font-display text-base ${
              dark ? "text-paper" : "text-graphite"
            }`}
          >
            {it.v}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: `RoomCard.jsx`**

`objectPosition` existe por §7.3 de la spec: `SINGLE-A`, `CUADRUPLE-A/B` y `TRIPLE-A` tienen
acolchados estampados que conviene recortar. Permite empujar el encuadre hacia la cabecera.

```jsx
import Image from "next/image";

export default function RoomCard({ image, title, beds, tag, objectPosition = "center" }) {
  return (
    <article className="overflow-hidden rounded-card border border-paper-2 bg-white">
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-graphite">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{beds}</p>
        {tag && (
          <span className="u-label mt-3 inline-block rounded-ctl bg-paper-2 px-2 py-1 text-brand-700">
            {tag}
          </span>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 5: `ServiceItem.jsx`**

```jsx
export default function ServiceItem({ icon: Icon, name, description }) {
  return (
    <div className="flex gap-4">
      {Icon && <Icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" aria-hidden />}
      <div>
        <h3 className="font-display text-graphite">{name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Verificar y commitear**

```bash
pnpm run build && pnpm run lint
git add src/components/site
git commit -m "Agrego los componentes compartidos del sistema"
```

---

## Task 3: Condensar el copy en los tres idiomas

La tarea más delicada. **Leer §5 de la spec antes de empezar.**

**Files:**
- Modify: `src/app/dictionaries/es.json`, `en.json`, `pt.json`
- Create: `scripts/check-dictionaries.mjs`

**Interfaces:**
- Produces: clave nueva `about.timeline` (array de `{year, text}`);
  `about.statement` (string); se elimina `rooms.aboutCards`;
  `about.ourHistoryp1..p8` se reemplaza por `about.historyIntro` (array de 2-3 strings).

- [ ] **Step 1: Escribir el verificador de paridad**

Crear `scripts/check-dictionaries.mjs`:

```js
import fs from "node:fs";

const LANGS = ["es", "en", "pt"];
const load = (l) =>
  JSON.parse(fs.readFileSync(`src/app/dictionaries/${l}.json`, "utf8"));

function keys(obj, prefix = "") {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    out.push(path);
    if (v && typeof v === "object" && !Array.isArray(v)) out.push(...keys(v, path));
    if (Array.isArray(v)) out.push(`${path}[${v.length}]`);
  }
  return out.sort();
}

const sets = Object.fromEntries(LANGS.map((l) => [l, keys(load(l))]));
const base = sets.es;
let failed = false;

for (const l of LANGS.slice(1)) {
  const missing = base.filter((k) => !sets[l].includes(k));
  const extra = sets[l].filter((k) => !base.includes(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`\n❌ ${l}.json difiere de es.json`);
    missing.forEach((k) => console.error(`   falta:  ${k}`));
    extra.forEach((k) => console.error(`   sobra:  ${k}`));
  }
}

if (failed) process.exit(1);
console.log(`✅ Los ${LANGS.length} diccionarios tienen la misma estructura (${base.length} claves)`);
```

Agregar a `package.json`:

```json
"scripts": {
  "check:dict": "node scripts/check-dictionaries.mjs"
}
```

- [ ] **Step 2: Correrlo sobre el estado actual**

```bash
pnpm run check:dict
```

Esperado: **pasa** (los tres ya están alineados hoy). Si falla, hay una divergencia previa
que hay que arreglar antes de seguir. Esta es la línea de base.

- [ ] **Step 3: Reemplazar la historia por intro + timeline (`es.json`)**

Borrar `ourHistoryp1` … `ourHistoryp8`. En su lugar:

```json
"historyIntro": [
  "En 1913, Jacobo Eddi y Julia Zerahia llegaron a Neuquén desde Roshpirvá, Palestina, cuando la ciudad no superaba los dos mil habitantes. Levantaron su comercio en la calle Sarmiento y formaron una familia de seis hijos.",
  "Medio siglo después, su hijo Víctor construyó el Hotel Crystal sobre la avenida Olascoaga. Abrió el 14 de enero de 1966 con diez habitaciones.",
  "Hoy son cuarenta y cinco habitaciones y noventa y nueve plazas, y la misma vocación de hospitalidad que empezó aquella familia."
],
"timeline": [
  { "year": "1913", "text": "Jacobo Eddi y Julia Zerahia llegan a Neuquén desde Palestina" },
  { "year": "1918", "text": "Abre Baratillo Eddi, en Sarmiento 36" },
  { "year": "1948", "text": "Víctor Eddi se casa con Elena Darmún; vuelven a Neuquén" },
  { "year": "1964", "text": "Víctor adquiere la propiedad de avenida Olascoaga al 200" },
  { "year": "1966", "text": "El 14 de enero abre el Hotel Crystal, con diez habitaciones" },
  { "year": "2018", "text": "Rodrigo Fernández asume la razón social del hotel" },
  { "year": "Hoy", "text": "Cuarenta y cinco habitaciones y noventa y nueve plazas" }
]
```

**Qué se recorta y por qué** (§5.1 de la spec): las escuelas donde enseñó Elena, las
comisiones directivas de Víctor, los nombres de los locales intermedios ("El Rey de los
Pantalones", "Lencería Juli", "Ella, Medias") y las profesiones de los tres hijos. Son datos
de genealogía familiar, no del hotel. **Los hitos del hotel se conservan todos.**

- [ ] **Step 4: Condensar Misión/Visión/Valores (`es.json`)**

Borrar el array `about.mision` completo (los tres objetos). Reemplazar por:

```json
"statement": "Somos un hotel familiar en el centro de Neuquén. Trabajamos para que cada huésped encuentre un lugar cómodo, atendido por gente que conoce la ciudad y está disponible a cualquier hora."
```

- [ ] **Step 5: Eliminar la duplicación (P5)**

Borrar la clave `rooms.aboutCards` de los tres diccionarios. Era idéntica byte a byte a
`rooms.roomsCards`. Verificar antes con:

```bash
node -e "const d=require('./src/app/dictionaries/es.json');console.log(JSON.stringify(d.rooms.roomsCards)===JSON.stringify(d.rooms.aboutCards))"
```

Esperado: `true`. Si diera `false`, **no borrar** y consultar.

- [ ] **Step 6: Replicar en `en.json` y `pt.json`**

Mismas claves, traducidas. Mantener el orden de claves igual al de `es.json`.

- [ ] **Step 7: Verificar paridad**

```bash
pnpm run check:dict
```

Esperado: ✅ con la misma cantidad de claves en los tres. **Si falla, arreglar antes de
commitear.**

- [ ] **Step 8: Medir la reducción**

```bash
for l in es en pt; do printf "%s: " $l; wc -w < src/app/dictionaries/$l.json; done
```

Base previa: es 1878, en 1804, pt 1814 palabras. Esperado: caída de ~35-40% en cada uno.

- [ ] **Step 9: Commit**

```bash
git add src/app/dictionaries scripts package.json
git commit -m "Condenso el copy y agrego verificador de paridad entre idiomas"
```

---

## Task 4: Home

**Files:**
- Modify: `src/app/[lang]/components/home.js` (reescritura)
- Modify: `src/app/[lang]/page.js` si hace falta pasar más datos

**Interfaces:**
- Consumes: `FactStrip`, `RoomCard`, `ServiceItem`, `Prose` (Tarea 2); `dictionary` (Tarea 3).

- [ ] **Step 1: Hero con video**

Reemplazar `VideoBackground` por un hero acotado (hoy es `position: fixed` a pantalla
completa, lo que rompe el scroll en mobile). Requisitos de la spec §6:

```jsx
"use client";
import Image from "next/image";

function Hero({ dictionary }) {
  return (
    <section className="relative h-[clamp(420px,88vh,760px)] overflow-hidden bg-ink-900">
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        poster="/vid-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
      >
        <source src="/vid.mp4" type="video/mp4" />
      </video>
      {/* Fallback para prefers-reduced-motion */}
      <div className="absolute inset-0 hidden motion-reduce:block">
        <Image src="/vid-poster.jpg" alt="" fill priority className="object-cover" />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,27,43,.72) 0%, rgba(11,27,43,.40) 38%, rgba(11,27,43,.93) 100%)",
        }}
      />

      <div className="relative flex h-full flex-col justify-center px-6 md:px-16">
        <Image
          src="/logo-blanco.png"
          alt="Hotel Crystal"
          width={132}
          height={132}
          priority
          className="mb-6"
        />
        <span className="u-label mb-4 self-start rounded-full border border-cyan-300/40 px-3 py-1.5 text-cyan-300">
          Neuquén Capital · desde 1966
        </span>
        <h1 className="text-paper">{dictionary.home.h2}</h1>
      </div>
    </section>
  );
}
```

> `motion-reduce:` es una variante nativa de Tailwind, no hace falta configurar nada.

- [ ] **Step 2: FactStrip debajo del hero**

```jsx
<FactStrip
  tone="dark"
  items={[
    { k: "Check-in",     v: "12:00" },
    { k: "Check-out",    v: "10:00" },
    { k: "Conserjería",  v: "24 horas" },
    { k: "Habitaciones", v: "45 · 99 plazas" },
  ]}
/>
```

- [ ] **Step 3: Sección de habitaciones**

Tres `RoomCard` desde `dictionary.rooms.roomsCards`, más un link a `/${lang}/rooms`.
Usar las fotos de Nivel A/B según §7.3 de la spec. Para `Single` y `Cuádruple`, pasar
`objectPosition="center 30%"` para recortar el acolchado.

- [ ] **Step 4: Servicios destacados**

Cinco `ServiceItem` filtrados de `dictionary.rooms.roomServices[0].services` — los más
relevantes para el huésped corporativo: Wifi, Conserjería, Desayuno, Recepción de Paquetería,
Late Check-Out (este último está en el grupo `ADICIONAL`).

- [ ] **Step 5: Teaser del hotel + contacto**

Dos párrafos de `dictionary.about.historyIntro` dentro de `<Prose>`, con link a
`/${lang}/about`. Después el bloque de contacto con el iframe del mapa (conservar el embed
tal cual está en `home.js:96`).

- [ ] **Step 6: Verificar**

```bash
pnpm run build && pnpm run dev
```

Revisar en 360px, 768px y 1440px. Confirmar que el video no bloquea el scroll en mobile
(era el bug del `position: fixed`).

- [ ] **Step 7: Commit**

```bash
git add "src/app/[lang]"
git commit -m "Rediseño el home con hero de video, datos y habitaciones"
```

---

## Task 5: Habitaciones

**Files:**
- Modify: `src/app/[lang]/rooms/page.js`, `rooms/components/services.js`
- Delete: `src/app/[lang]/rooms/styles-rooms.css`

- [ ] **Step 1: `SectionHero` en vez del CSS de fondo**

Sacar `import "./styles-rooms.css"` y la clase `bg-rooms`. Usar:

```jsx
<SectionHero
  image="/crys/DOBLE-B.jpg"
  alt="Habitación Superior del Hotel Crystal"
  eyebrow="45 habitaciones · 99 plazas"
  title={dictionary.rooms.titleRooms}
  priority
/>
```

- [ ] **Step 2: Grilla de habitaciones**

`RoomCard` desde `roomsCards`. **No usar grilla pareja de 4** — §7.3: expone las fotos malas
al mismo tamaño que las buenas. Usar `Doble` y `Triple` (Nivel A/B) a ancho completo o 2
columnas, y `Single`/`Cuádruple` más chicas.

- [ ] **Step 3: Bloque comparativo Estándar vs Superior**

Aprovechar el hallazgo de §7.3: las Superiores tienen piso de madera y ropa neutra, las
Estándar cerámica y estampados. Poner `DOBLE-B` (Superior) y `TRIPLE-A` (Estándar) lado a
lado con sus diferencias listadas — la foto prueba la diferencia sola.

Diferencias reales, de `es.json`: las Superiores suman desayuno de cortesía, heladera, pava
eléctrica y escritorio más amplio.

- [ ] **Step 4: Servicios en dos grupos**

`ServiceItem` en dos columnas: `roomServices[0]` (INCLUIDOS) y `roomServices[1]` (ADICIONAL).
Los iconos vienen por nombre en el JSON (`"Coffee"`, `"Wifi"`, …) — mapearlos a
`lucide-react` con un objeto, no con `eval`:

```jsx
import { Coffee, Wifi, ConciergeBell, Package, Hotel, Luggage,
         ParkingCircle, Martini, ClockArrowDown } from "lucide-react";

const ICONS = { Coffee, Wifi, ConciergeBell, Package, Hotel, Luggage,
                ParkingCircle, Martini, ClockArrowDown };
```

- [ ] **Step 5: Borrar el CSS y verificar**

```bash
rm "src/app/[lang]/rooms/styles-rooms.css"
pnpm run build
git add -A && git commit -m "Rediseño la página de habitaciones"
```

---

## Task 6: El hotel (about) + línea de tiempo

**Files:**
- Modify: `src/app/[lang]/about/page.js`, `about/components/our-history.js`,
  `about/components/mision-vision.js`
- Create: `src/components/site/Timeline.jsx`
- Delete: `src/app/[lang]/about/styles-about.css`, `public/about/HALL.jpg`

- [ ] **Step 1: `Timeline.jsx`**

```jsx
export default function Timeline({ items }) {
  return (
    <ol className="relative border-l border-paper-2 pl-6">
      {items.map((it) => (
        <li key={it.year} className="relative pb-8 last:pb-0">
          <span className="absolute -left-[1.8125rem] top-1.5 h-2 w-2 rounded-full bg-brand-700" />
          <span className="u-label block text-brand-700">{it.year}</span>
          <p className="mt-1 max-w-[52ch] text-slate-600">{it.text}</p>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 2: Reescribir `about/page.js`**

`SectionHero` (imagen `/about/about1.jpg`, Nivel B) → `statement` en `<Prose>` →
`historyIntro` → `<Timeline items={dictionary.about.timeline} />`.

Sacar `import "./styles-about.css"` y la clase `bg-about`.

- [ ] **Step 3: Quitar la referencia a `HALL.jpg` y borrarlo**

En `our-history.js:15` está `["/about/HALL.jpg"]`. Al reescribir el componente, esa lista
desaparece. Después:

```bash
rm public/about/HALL.jpg
grep -rn "HALL.jpg" src/ || echo "sin referencias, ok"
```

**Importante:** el `grep` tiene que salir vacío antes de borrar. Si no, el build rompe.

- [ ] **Step 4: Quitar GSAP de estos dos componentes**

`our-history.js` y `mision-vision.js` usan `gsap`. Reemplazar por Framer Motion:

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

- [ ] **Step 5: Verificar y commitear**

```bash
rm "src/app/[lang]/about/styles-about.css"
pnpm run build
git add -A && git commit -m "Rediseño la historia con línea de tiempo y elimino HALL.jpg"
```

---

## Task 7: Turismo

Contenido secundario para el huésped corporativo. Baja en jerarquía, mantiene su página.

**Files:**
- Modify: `src/app/[lang]/turism/page.js`, `turism/components/turism-comp.js`
- Delete: `src/app/[lang]/turism/styles-turism.css`

- [ ] **Step 1:** `SectionHero` con `/image/land.jpeg` (letras NEUQUÉN), sacando el CSS de fondo.
- [ ] **Step 2:** Los 5 links de `dictionary.turism.activities` como tarjetas. Iconos por
      nombre (`"Instagram"`, `"Globe"`, `"Bus"`) con el mismo patrón de mapeo de la Tarea 5.
      Todos los links externos con `target="_blank" rel="noopener noreferrer"`.
- [ ] **Step 3:** El párrafo `turism.p6` (mapa interactivo) en `<Prose>`.
- [ ] **Step 4:**
```bash
rm "src/app/[lang]/turism/styles-turism.css"
pnpm run build
git add -A && git commit -m "Rediseño la página de turismo"
```

---

## Task 8: Página de contacto (nueva)

Resuelve P11. Hoy el nav dice CONTACTO y apunta al ancla `#contact` del home.

**Files:**
- Create: `src/app/[lang]/contact/page.js`
- Modify: `src/app/[lang]/components/menu-nav.js` (destino del link)

- [ ] **Step 1: Crear la página**

Datos reales (de `home.js:18-32` y `Footer.js`):

| Dato | Valor |
|---|---|
| Dirección | Av. Olascoaga 268, Q8300 Neuquén Capital |
| WhatsApp | 299-6263856 |
| Mail | crystalneuquen@yahoo.com.ar |
| Instagram | `https://www.instagram.com/hotel.crystal.nqn` |
| Facebook | `https://www.facebook.com/hotelcrystalnqn/` |

Estructura: `SectionHero` → datos de contacto en columna + mapa → `FactStrip tone="light"`
con check-in 12:00, check-out 10:00, desayuno 7:30–10:00 (dom. y feriados 8:00–11:00),
conserjería 24 h.

El iframe del mapa se copia de `home.js:96` sin cambios.

**No es un formulario.** No hay backend. Los canales son WhatsApp, mail y teléfono.

- [ ] **Step 2: Apuntar el nav a la ruta real**

En `menu-nav.js`, cambiar el destino de CONTACTO de `#contact` a `/${lang}/contact`.

- [ ] **Step 3: Verificar en los tres idiomas**

```bash
pnpm run build
# visitar /es/contact, /en/contact, /pt/contact
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "Agrego la página de contacto"
```

---

## Task 9: Limpieza técnica y cierre

**Files:** `package.json`, `Footer.js`, `next.config.mjs`, varios

- [ ] **Step 1: Desinstalar GSAP**

Antes, confirmar que no queda ningún uso:

```bash
grep -rn "gsap" src/ || echo "sin usos, listo para desinstalar"
```

Solo si sale vacío:

```bash
pnpm remove gsap @gsap/react
```

> Si todavía aparece `home.js` o `services.js`, faltó portar esas animaciones (Tareas 4 y 5).

- [ ] **Step 2: Corregir el alt del logo (P10)**

`Footer.js:20`: `alt="Iberia Logo"` → `alt="Hotel Crystal"`.

- [ ] **Step 3: Renombrar el proyecto**

`package.json`: `"name": "iberia"` → `"name": "hotel-crystal"`.

- [ ] **Step 4: Borrar los assets descartados (§7.3)**

```bash
rm "public/crys/Captura de pantalla 2024-10-31 a la(s) 13.27.14.jpg"
rm "src/app/[lang]/image/saloon-banner.jpg"
grep -rn "Captura de pantalla\|saloon-banner" src/ || echo "sin referencias, ok"
```

El `grep` debe salir vacío **antes** de borrar.

- [ ] **Step 5: Crear `og-image.jpg`**

1200×630, a partir de `public/crys/DOBLE-B.jpg` (Nivel A) con el logo encima:

```bash
ffmpeg -i public/crys/DOBLE-B.jpg -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -q:v 3 public/og-image.jpg
```

Queda pendiente superponerle el logo — hacerlo a mano o con `ffmpeg -i ... -i public/logo-blanco.png -filter_complex overlay`.

- [ ] **Step 6: Confirmar que no quedan tokens viejos**

```bash
grep -rn "color-fuente" src/ && echo "❌ QUEDAN REFERENCIAS VIEJAS" || echo "✅ limpio"
grep -rn "background-image" src/ --include="*.css" && echo "❌ QUEDA CSS CON FOTOS" || echo "✅ limpio"
```

Ambos deben dar ✅. Comparar contra `/tmp/pendientes-color.txt` de la Tarea 1.

- [ ] **Step 7: Verificación final contra los criterios de la spec §10**

```bash
pnpm run build
pnpm run lint
pnpm run check:dict
```

Después, con `pnpm run dev` corriendo, Lighthouse en mobile sobre `/es`:
- Performance ≥ 90
- Accesibilidad ≥ 95

Si accesibilidad baja de 95, lo más probable es contraste: revisar que no se haya colado
cian sobre fondo claro (la regla del sistema).

- [ ] **Step 8: Commit final**

```bash
git add -A
git commit -m "Limpieza técnica: saco gsap, corrijo metadata y assets sin uso"
```

---

## Self-review de este plan

**Cobertura de la spec:**

| Sección de la spec | Tarea |
|---|---|
| §4.1 Color | 1 |
| §4.2 Tipografía | 1 |
| §4.3 Componentes | 2 |
| §5.1 Historia → timeline | 3, 6 |
| §5.2 Misión/Visión | 3, 6 |
| §5.3 Deduplicación | 3 |
| §5.4 Multiidioma | 3 (script) |
| §6 Home | 4 |
| §6 Habitaciones | 5 |
| §6 El hotel | 6 |
| §6 Turismo | 7 |
| §6 Contacto | 8 |
| §7.2 Assets pendientes | 6, 9 |
| §7.3 Triaje fotográfico | 4, 5, 6 |
| §8 Limpieza técnica | 1, 5, 6, 7, 9 |
| §10 Criterios de éxito | 9 |

Sin huecos. P1–P11 quedan cubiertos: P1/P2/P3/P4 en Tarea 1, P5 en 3, P6 en 5/6/7, P7 en 9,
P8 en 2/5/6/7, P9 en 4, P10 en 9, P11 en 8.

**Consistencia de nombres:** `SectionHero`, `FactStrip`, `RoomCard`, `ServiceItem`, `Prose`,
`Timeline` se usan con la misma firma en todas las tareas. Los tokens Tailwind
(`bg-ink-900`, `text-brand-700`, `text-cyan-300`, `border-paper-2`) coinciden con lo
definido en la Tarea 1, Paso 2.

**Riesgo conocido:** la Tarea 1 rompe temporalmente las páginas que usan
`var(--color-fuente-*)`. Es intencional y se resuelve en las Tareas 4-7. El Paso 6 de la
Tarea 1 deja registro de cuáles son para no perder ninguna.
