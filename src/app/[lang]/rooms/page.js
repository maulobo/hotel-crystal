import React from "react";
import Container from "../components/container";
import Image from "next/image";
import logo from "/public/iberia-logo.png";
import { CarouselSize } from "./components/carousel";
import { AppleCardsCarouselDemo } from "./components/apple";

export default function page() {
  return (
    <>
      <div className="md:py-8 md:px-20 p-8 h-[500px] bg-gray-400"></div>
      <section className="flex  flex-col justify-center align-middle items-center md:py-8 md:px-20 p-8 gap-20">
        <div className="flex flex-col gap-20 justify-center align-middle items-center">
          <Image src={logo} className="" height={300} width={100} alt="logo" />
          <h2>Habitaciones Hotel Iberia</h2>
          <p className="md:w-[50%] text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perferendis quam accusamus error velit aut, tenetur laboriosam quo
            labore? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aut, numquam nobis eveniet porro
          </p>
        </div>
        <section className="w-full p-8 md:flex md:items-center md:align-middle md:justify-center md:w-screen md:py-8 md:px-20">
          <CarouselSize />
        </section>
        <section className="w-full p-8 md:flex md:items-center md:align-middle md:justify-center md:w-screen md:py-8 md:px-20">
          <AppleCardsCarouselDemo />
        </section>
      </section>
    </>
  );
}
