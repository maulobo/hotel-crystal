"use client";
import React from "react";
import Container from "../components/container";

export default function page() {
  return (
    <Container className={"flex flex-col gap-4 "}>
      <section className="flex-1 flex justify-center w-[100%] md:flex-row flex-col gap-10">
        <div className=" md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10">
          <h3>Nuestra Historia</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            tenetur repudiandae accusantium sed? Asperiores temporibus nulla
            fuga nam consequatur facere sunt ad, incidunt, officiis, quas earum
            a consequuntur vitae! Quam. Lorem ipsum dolor sit, amet consectetur
          </p>
          <p>
            {" "}
            adipisicing elit. Omnis culpa numquam inventore deleniti
            voluptatibus quaerat assumenda quibusdam! Sed laborum nobis
            consequatur aspernatur. Minima, quod tempora. Deleniti quod
            molestias deserunt voluptatibus.
          </p>
        </div>
        <div className="bg-white md:w-[60%] flex-1 md:flex-auto"></div>
      </section>
      <section className="flex-1 flex justify-center w-[100%] md:flex-row flex-col gap-10">
        <div className="bg-white md:w-[60%] flex-1 md:flex-auto "></div>
        <div className=" md:w-[40%] flex-1 md:flex-auto flex flex-col gap-10">
          <h3>Nuestra Historia</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            tenetur repudiandae accusantium sed? Asperiores temporibus nulla
            fuga nam consequatur facere sunt ad, incidunt, officiis, quas earum
            a consequuntur vitae! Quam. Lorem ipsum dolor sit, amet consectetur
          </p>
          <p>
            {" "}
            adipisicing elit. Omnis culpa numquam inventore deleniti
            voluptatibus quaerat assumenda quibusdam! Sed laborum nobis
            consequatur aspernatur. Minima, quod tempora. Deleniti quod
            molestias deserunt voluptatibus.
          </p>
        </div>
      </section>
    </Container>
  );
}
