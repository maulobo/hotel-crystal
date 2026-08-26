"use client";

import { usePathname, useRouter } from "next/navigation";

const LANGS = [
  { code: "es", flag: "🇦🇷", label: "Español" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
];

const LanguageSelector = ({ lang }) => {
  const router = useRouter();
  const pathname = usePathname();

  // El idioma sale de la URL, no de un efecto: así el server y el cliente
  // renderizan lo mismo y no parpadea la bandera equivocada.
  const current = LANGS.some((l) => l.code === lang)
    ? lang
    : pathname.split("/")[1];

  const handleChangeLanguage = (event) => {
    const next = event.target.value;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  };

  return (
    <select
      value={current}
      aria-label="Idioma / Language / Idioma"
      className="bg-transparent"
      onChange={handleChangeLanguage}
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code} aria-label={l.label}>
          {l.flag}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
