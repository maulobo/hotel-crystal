import { HOTEL } from "@/app/lib/seo";

export default function manifest() {
  return {
    name: `${HOTEL.name} — ${HOTEL.city}`,
    short_name: HOTEL.name,
    description: `Hotel familiar en el centro de ${HOTEL.city}, ${HOTEL.street}.`,
    start_url: "/es",
    display: "standalone",
    background_color: "#0B1B2B",
    theme_color: "#0B1B2B",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
