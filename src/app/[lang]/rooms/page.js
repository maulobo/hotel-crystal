import React from "react";
import Services from "./components/services";
import "./styles-rooms.css";

export default async function page({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );
  const services = dictionary.rooms.roomServices;

  return <Services services={services} dictionary={dictionary}></Services>;
}
