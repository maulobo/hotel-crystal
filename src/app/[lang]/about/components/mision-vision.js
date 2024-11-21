import React from "react";

export default function MisionVision({ dictionary }) {
  const mision = dictionary.about.mision;
  return (
    <section className="flex flex-wrap gap-8 ">
      {mision.map((mis) => {
        return (
          <div
            key={mis.h3}
            className=" flex-1 flex flex-col items-center  min-w-52 gap-4 "
          >
            <h3>{mis.h3}</h3>
            <p>{mis.p}</p>
          </div>
        );
      })}
    </section>
  );
}
