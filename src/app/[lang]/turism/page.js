import SectionHero from "@/components/site/SectionHero";
import TurismComp from "./components/turism-comp";
import { buildMetadata } from "@/app/lib/seo";

export function generateMetadata({ params }) {
  return buildMetadata({ lang: params?.lang, route: "turism" });
}

export default async function TurismPage({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return (
    <>
      <SectionHero
        image="/image/land.jpeg"
        alt={dictionary.ui.alt.landmark}
        title={dictionary.turism.h2}
        priority
      />
      <TurismComp dictionary={dictionary} />
    </>
  );
}
