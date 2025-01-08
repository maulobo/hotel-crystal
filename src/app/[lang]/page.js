import HomeMain from "./components/home";

export default async function Home({ params: { lang } }) {
  const dictionary = await import(`../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return <HomeMain dictionary={dictionary} />;
}
