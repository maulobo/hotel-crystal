import Services from "./components/services";
import { buildMetadata } from "@/app/lib/seo";

export function generateMetadata({ params }) {
  return buildMetadata({ lang: params?.lang, route: "rooms" });
}

export default async function RoomsPage({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return <Services dictionary={dictionary} lang={lang} />;
}
