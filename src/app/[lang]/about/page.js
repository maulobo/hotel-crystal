import React from "react";
import OurHistory from "./components/our-history";
import MisionVision from "./components/mision-vision";
import "./styles-about.css";

export default async function page({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );
  return (
    <>
      <div className="md:py-8 md:px-20 p-8 h-[400px] bg-about flex justify-center items-center relative">
        <h2>{dictionary.about.title}</h2>
      </div>
      <div className="bg-[var(--color-fuente)] text-[var(--color-fuente-2)]">
        <div className="flex flex-col gap-10 justify-center align-middle items-center md:py-20 md:px-20 p-8 text-center ">
          <MisionVision dictionary={dictionary} />
        </div>
      </div>

      <div className={"flex flex-col gap-20 md:py-8 md:px-20 p-8"}>
        <OurHistory dictionary={dictionary} />
      </div>
    </>
  );
}
