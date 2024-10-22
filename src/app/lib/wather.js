const apiKey = process.env.API_KEY_WEATHER; // Reemplaza con tu clave real de WeatherAPI
const city = "Neuquen"; // Nombre de la ciudadconst country = "Argentina"; // País
const country = "Argentina"; // País
const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},${country}&aqi=no`;

export const clima = async () => {
  try {
    const consulta = await fetch(url, {
      cache: "no-cache",
    });
    const res = await consulta.json();

    return res;
  } catch (error) {
    console.log(error);
  }
};
