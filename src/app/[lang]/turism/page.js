import SectionHero from "@/components/site/SectionHero";
import TurismComp from "./components/turism-comp";

export default async function TurismPage({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return (
    <>
      <SectionHero
        image="/image/land.jpeg"
        alt="Letras de Neuquén Capital"
        title={dictionary.turism.h2}
        priority
      />
      <TurismComp dictionary={dictionary} />
    </>
  );
}
