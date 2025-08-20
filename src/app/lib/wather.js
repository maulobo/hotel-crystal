const apiKey = process.env.API_KEY_WEATHER; // Reemplaza con tu clave real de WeatherAPI
const city = "Neuquen"; // Nombre de la ciudad
const country = "Argentina"; // País
const buildUrl = (q) =>
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    q
  )}&aqi=no`;

// Coordenadas aproximadas del centro de Neuquén (lat, lon)
const lat = -38.9517;
const lon = -68.0596;

export const clima = async () => {
  // Intentos: coordenadas (más fiables), nombre con/ sin país, código país y con tilde
  const attempts = [
    `${lat},${lon}`,
    `${city},${country}`,
    city,
    `${city},AR`,
    `Neuquén,${country}`,
  ];

  for (const q of attempts) {
    try {
      const url = buildUrl(q);
      const consulta = await fetch(url, { cache: "no-cache" });
      const res = await consulta.json();

      if (res && !res.error && res.current) {
        return res;
      }

      // Log para depuración de por qué falló esta consulta
      console.log(`Weather API: no data for query='${q}'`, res?.error ?? res);
    } catch (err) {
      console.log(`Weather fetch error for query='${q}'`, err);
    }
  }

  // Si todas las consultas fallan, devolver fallback estructurado
  return {
    location: { name: city, country },
    current: {
      temp_c: null,
      condition: {
        icon: null,
        text: "N/A",
      },
    },
  };
};
