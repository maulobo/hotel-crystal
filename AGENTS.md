# Hotel Crystal — Contexto para agentes

Sitio del Hotel Crystal, Neuquén Capital. Next.js 14 App Router, rutas `[lang]` para
**es / en / pt**. Gestor de paquetes: **pnpm**. Node >= 20.

---

## 🎯 Si venís a continuar el rediseño, leé esto primero

Hay un rediseño **especificado y planificado, pero no implementado**. Los dos documentos
son autosuficientes: se escribieron para que alguien sin contexto previo pueda ejecutarlos.

| Documento | Para qué |
|---|---|
| `docs/superpowers/specs/2026-08-24-rediseno-hotel-crystal-design.md` | **Qué** se decidió y por qué. Leer completo antes de tocar código |
| `docs/superpowers/plans/2026-08-24-rediseno-hotel-crystal.md` | **Cómo** hacerlo. 9 tareas con código real, en orden |
| `docs/superpowers/reference/direccion-visual.html` | Referencia visual. Abrir en el navegador desde la raíz del repo |

**El plan empieza por la Tarea 1 y las tareas tienen dependencias.** La Tarea 1 rompe
temporalmente las páginas a propósito; se reparan en las Tareas 4-7. No saltear.

---

## Decisiones cerradas — no rediscutir sin pedido explícito del dueño

1. **Objetivo:** credibilidad y presencia. **No** conversión de reservas. No hay motor de
   reservas y no se agrega. Los precios dicen "Consultar" y siguen así.
2. **Huésped objetivo:** viajero corporativo (Neuquén capital / Vaca Muerta).
3. **Paleta:** derivada del logo, extraída de `public/logoo.png`. **No inventar colores.**
4. **Tipografía:** Fraunces (títulos) + Inter (cuerpo). Geist se elimina.
5. **Copy:** se conserva la voz y los hechos, se **condensa** el volumen. No reescribir.
6. **Fotografía:** no hay fotos nuevas. Ver el triaje en §7.3 de la spec.
7. **Hero del home:** el video actual, ya optimizado.

---

## ⚠️ Reglas duras

**Color.** El cian sobre fondo claro da 2.52:1 y no cumple WCAG AA. Sobre `--ink-900` da
10.23:1.
> **Cian solo sobre fondos oscuros. `--blue-700` sobre fondos claros.**

`--blue-600` (#1B77BD) y `--slate-400` (#7C8E9C) solo en texto ≥24px. Nunca en cuerpo.

**Tres idiomas siempre.** Todo cambio de copy va a `es.json`, `en.json` **y** `pt.json`, con
estructura de claves idéntica. Verificar con `pnpm run check:dict` (el script se crea en la
Tarea 3 del plan).

**Sin `background-image` de CSS apuntando a fotos.** Todo por `next/image`.

**Sin tipografías fijas.** Todo título usa `clamp()`.

---

## Verificación

**No hay framework de tests, y es deliberado** — es un sitio de marketing estático. El ciclo
real es:

```bash
pnpm run build     # compila sin errores
pnpm run lint      # pasa limpio
pnpm run dev       # revisión visual en 360px, 768px y 1440px
```

Objetivo Lighthouse mobile: performance ≥ 90, accesibilidad ≥ 95. Si accesibilidad baja de
95, sospechar contraste: casi siempre es cian colado sobre fondo claro.

---

## Estado de los assets

Ya optimizados el 2026-08-24: **78.5 MB → 12.2 MB (−84.5%)**. No rehacer.

- Imágenes redimensionadas a 2400 px máx., calidad 72
- `public/bg.jpg` eliminado: era duplicado byte a byte de `public/about/about1.jpg`
- `vid.mp4`: 1080p con audio → 720p sin audio, 3.72 MB → 1.25 MB
- `public/vid-poster.jpg` generado (72 KB) para el LCP del hero

Al agregar imágenes nuevas, mantener el criterio: máx. 2400 px, calidad ~72.

---

## 🚨 Fuera de alcance: el dominio está roto

`hotelcrystalneuquen.com` **no apunta a este proyecto.**

- Los nameservers son de Hostinger (`ns1/ns2.dns-parking.com`), no de Vercel
- El certificado Let's Encrypt **venció el 27/03/2025**
- Sirve un sitio viejo distinto: un build de Create React App (`<title>React App</title>`)

Por eso el navegador avisa "no es seguro" y después muestra una web vieja. **Es trabajo de
paneles (DNS + Vercel), no de código.** No intentar arreglarlo desde el repo.

Para arreglarlo: agregar el dominio en Vercel → Settings → Domains, y en el DNS de Hostinger
poner `A @ → 76.76.21.21` y `CNAME www → cname.vercel-dns.com`, borrando los A actuales. El
certificado lo emite Vercel solo. Si hay casillas de mail en el dominio, **no** mover los
nameservers: cambiar solo esos dos registros.

---

## Datos reales del hotel

| | |
|---|---|
| Dirección | Av. Olascoaga 268, Q8300 Neuquén Capital |
| WhatsApp | 299-6263856 |
| Mail | crystalneuquen@yahoo.com.ar |
| Instagram | [hotel.crystal.nqn](https://www.instagram.com/hotel.crystal.nqn) |
| Facebook | [hotelcrystalnqn](https://www.facebook.com/hotelcrystalnqn/) |
| Fundación | 14 de enero de 1966, con 10 habitaciones |
| Hoy | 45 habitaciones, 99 plazas |

---

## Deuda técnica conocida

Toda está cubierta por el plan, con la tarea que la resuelve entre paréntesis.

- Paleta shadcn sin usar conviviendo con la paleta custom en `globals.css` (T1)
- `h1 { font-size: 5rem }` fijo, revienta en mobile (T1)
- `metadataBase` y `canonical` apuntan al placeholder `https://your-domain.com` (T1)
- `rooms.aboutCards` es duplicado exacto de `rooms.roomsCards` en los 3 idiomas (T3)
- Tres hojas CSS sueltas por página en vez de un sistema (T5, T6, T7)
- GSAP y Framer Motion instaladas para lo mismo; se elimina GSAP (T9)
- `alt="Iberia Logo"` en `Footer.js:20`, residuo del proyecto forkeado (T9)
- `package.json` todavía se llama `"iberia"` (T9)
- El nav apunta a `#contact`; no existe página de contacto (T8)
