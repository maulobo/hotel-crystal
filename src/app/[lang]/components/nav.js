import React from "react";
import MenuNav from "./menu-nav";
import { clima } from "@/app/lib/wather";

export default async function Nav({ lang }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );
  const c = await clima();

  return <MenuNav dictionary={dictionary} clima={c} />;
}
