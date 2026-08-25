import { SITE_URL, LOCALES, DEFAULT_LOCALE } from "@/app/lib/seo";

const ROUTES = ["", "about", "rooms", "turism", "contact"];

export default function sitemap() {
  const lastModified = new Date();

  return LOCALES.flatMap((lang) =>
    ROUTES.map((route) => {
      const path = route ? `/${lang}/${route}` : `/${lang}`;
      return {
        url: `${SITE_URL}${path}`,
        lastModified,
        changeFrequency: "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l,
              `${SITE_URL}${route ? `/${l}/${route}` : `/${l}`}`,
            ])
          ),
        },
      };
    })
  );
}
