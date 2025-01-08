import React from "react";
import TurismComp from "./components/turism-comp";
import "./styles-turism.css";

export default async function page({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );
  return (
    <>
      <div className="md:py-8 md:px-20 p-8 h-[400px] bg-turism relative flex justify-center items-center">
        <h2>{dictionary.turism.h2}</h2>
      </div>
      <TurismComp dictionary={dictionary} />
    </>
  );
}
