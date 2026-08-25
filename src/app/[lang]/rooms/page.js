import Services from "./components/services";

export default async function RoomsPage({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return <Services dictionary={dictionary} lang={lang} />;
}
