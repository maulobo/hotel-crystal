export const SITE_URL = "https://www.hotelcrystalneuquen.com";
export const LOCALES = ["es", "en", "pt"];
export const DEFAULT_LOCALE = "es";

// Formato que espera Open Graph (og:locale), distinto del segmento de la URL.
const OG_LOCALE = { es: "es_AR", en: "en_US", pt: "pt_BR" };

export const HOTEL = {
  name: "Hotel Crystal",
  street: "Av. Olascoaga 268",
  city: "Neuquén",
  region: "Neuquén",
  postalCode: "Q8300",
  country: "AR",
  phone: "+54-299-626-3856",
  email: "crystalneuquen@yahoo.com.ar",
  lat: -38.9516,
  lng: -68.0591,
  social: [
    "https://www.instagram.com/hotel.crystal.nqn",
    "https://www.facebook.com/hotelcrystalnqn/",
  ],
};

// Copy por idioma y por ruta. `""` es el home.
const COPY = {
  es: {
    siteName: "Hotel Crystal",
    "": {
      title: "Hotel Crystal — Alojamiento en el centro de Neuquén Capital",
      description:
        "Hotel familiar en pleno centro de Neuquén Capital, sobre Av. Olascoaga 268. Habitaciones single a cuádruple con desayuno, wifi y conserjería 24 h. Atendido por la misma familia desde 1966.",
    },
    about: {
      title: "Nosotros",
      description:
        "La historia del Hotel Crystal: de las diez habitaciones que abrieron el 14 de enero de 1966 a las cuarenta y cinco habitaciones y noventa y nueve plazas de hoy, con la misma vocación de hospitalidad familiar.",
    },
    rooms: {
      title: "Habitaciones y servicios",
      description:
        "Habitaciones single, doble, triple y cuádruple en el centro de Neuquén. Estándares y superiores con baño privado, desayuno express incluido, wifi y guarda de equipaje.",
    },
    turism: {
      title: "Turismo en Neuquén",
      description:
        "Qué hacer en Neuquén Capital: paseos, gastronomía, bodegas y actividades culturales cerca del Hotel Crystal, más un mapa turístico interactivo de la ciudad.",
    },
    contact: {
      title: "Contacto",
      description:
        "Reservá en el Hotel Crystal: Av. Olascoaga 268, Neuquén Capital. WhatsApp 299-6263856, recepción con atención las 24 horas.",
    },
  },
  en: {
    siteName: "Hotel Crystal",
    "": {
      title: "Hotel Crystal — Stay in downtown Neuquén, Patagonia",
      description:
        "Family-run hotel in the heart of Neuquén, Argentina, at Av. Olascoaga 268. Single to quadruple rooms with breakfast, wifi and a 24-hour front desk. Run by the same family since 1966.",
    },
    about: {
      title: "About us",
      description:
        "The story of Hotel Crystal: from the ten rooms that opened on 14 January 1966 to today's forty-five rooms and ninety-nine beds, with the same family hospitality.",
    },
    rooms: {
      title: "Rooms & services",
      description:
        "Single, double, triple and quadruple rooms in downtown Neuquén. Standard and superior rooms with private bathroom, express breakfast, wifi and luggage storage.",
    },
    turism: {
      title: "Things to do in Neuquén",
      description:
        "What to do in Neuquén: walks, food, wineries and cultural activities near Hotel Crystal, plus an interactive tourist map of the city.",
    },
    contact: {
      title: "Contact",
      description:
        "Book at Hotel Crystal: Av. Olascoaga 268, Neuquén, Argentina. WhatsApp +54 299-6263856, front desk open 24 hours.",
    },
  },
  pt: {
    siteName: "Hotel Crystal",
    "": {
      title: "Hotel Crystal — Hospedagem no centro de Neuquén, Patagônia",
      description:
        "Hotel familiar no centro de Neuquén, Argentina, na Av. Olascoaga 268. Quartos de single a quádruplo com café da manhã, wi-fi e recepção 24 horas. Administrado pela mesma família desde 1966.",
    },
    about: {
      title: "Sobre nós",
      description:
        "A história do Hotel Crystal: dos dez quartos inaugurados em 14 de janeiro de 1966 aos quarenta e cinco quartos e noventa e nove leitos de hoje, com a mesma hospitalidade familiar.",
    },
    rooms: {
      title: "Quartos e serviços",
      description:
        "Quartos single, duplo, triplo e quádruplo no centro de Neuquén. Standard e superiores com banheiro privativo, café da manhã expresso, wi-fi e guarda-volumes.",
    },
    turism: {
      title: "Turismo em Neuquén",
      description:
        "O que fazer em Neuquén: passeios, gastronomia, vinícolas e atividades culturais perto do Hotel Crystal, além de um mapa turístico interativo da cidade.",
    },
    contact: {
      title: "Contato",
      description:
        "Reserve no Hotel Crystal: Av. Olascoaga 268, Neuquén, Argentina. WhatsApp +54 299-6263856, recepção aberta 24 horas.",
    },
  },
};

const AMENITIES = {
  es: ["Wifi", "Desayuno", "Conserjería 24 h", "Guarda de equipaje", "Servicio de mucamas"],
  en: ["Wifi", "Breakfast", "24-hour concierge", "Luggage storage", "Housekeeping"],
  pt: ["Wi-Fi", "Café da manhã", "Concièrge 24 h", "Guarda-volumes", "Arrumação"],
};

export function normalizeLocale(lang) {
  return LOCALES.includes(lang) ? lang : DEFAULT_LOCALE;
}

/**
 * Metadata de una ruta. `route` es el segmento sin idioma ("" para el home,
 * "rooms", "about", "turism", "contact").
 */
export function buildMetadata({ lang, route = "" }) {
  const locale = normalizeLocale(lang);
  const copy = COPY[locale][route] ?? COPY[locale][""];
  const siteName = COPY[locale].siteName;

  const path = route ? `/${locale}/${route}` : `/${locale}`;
  const url = `${SITE_URL}${path}`;
  const title = route ? `${copy.title} | ${siteName}` : copy.title;

  // hreflang: los tres idiomas apuntan a la misma ruta, más x-default en español.
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}${route ? `/${l}/${route}` : `/${l}`}`])
  );
  languages["x-default"] = `${SITE_URL}${
    route ? `/${DEFAULT_LOCALE}/${route}` : `/${DEFAULT_LOCALE}`
  }`;

  const image = {
    url: `${SITE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: `${siteName} — ${HOTEL.street}, ${HOTEL.city}`,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: copy.description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description: copy.description,
      url,
      siteName,
      images: [image],
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: copy.description,
      images: [image.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

/** JSON-LD schema.org/Hotel — le da a Google los datos del alojamiento. */
export function hotelJsonLd(lang) {
  const locale = normalizeLocale(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: HOTEL.name,
    description: COPY[locale][""].description,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/isologo.png`,
    telephone: HOTEL.phone,
    email: HOTEL.email,
    priceRange: "$$",
    numberOfRooms: 45,
    address: {
      "@type": "PostalAddress",
      streetAddress: HOTEL.street,
      addressLocality: HOTEL.city,
      addressRegion: HOTEL.region,
      postalCode: HOTEL.postalCode,
      addressCountry: HOTEL.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: HOTEL.lat, longitude: HOTEL.lng },
    sameAs: HOTEL.social,
    amenityFeature: AMENITIES[locale].map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };
}
