"use client"; // Para usar en Next.js App Router (si es necesario)

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LanguageSelector = ({ language }) => {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("es");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const detectedLang = window.location.pathname.split("/")[1];
      setCurrentLang(detectedLang || "en"); // Si no hay idioma, usar "en" por defecto
    }
  }, []);

  const handleChangeLanguage = (event) => {
    const selectedLang = event.target.value;
    const newPath = window.location.pathname.replace(
      `/${currentLang}`,
      `/${selectedLang}`
    );

    // Redirigir a la nueva ruta con el idioma seleccionado
    router.push(newPath);
    router.refresh(); // Forzar un refresco si es necesario
  };

  return (
    <select
      value={currentLang}
      className="bg-transparent"
      onChange={handleChangeLanguage}
    >
      <option value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
      <option value="es">🇪🇸</option>
      <option value="pt">🇵🇹</option>
    </select>
  );
};

export default LanguageSelector;
