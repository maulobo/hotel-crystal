import React from "react";
import Container from "../components/container";
import { ArrowBigDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <Container className={"gap-14 flex flex-col"}>
      <div className="h-[30%] flex gap-8 md:flex-row  flex-col ">
        <div className="flex flex-col md:max-w-[65%] gap-10 md:h-auto ">
          <h2 className="">TURISMO</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            odit. Quidem, corrupti molestias quisquam laborum ad vero
            voluptatibus in fugiat temporibus perspiciatis, harum eveniet
            exercitationem. Deleniti minus ex ut expedita.
          </p>
        </div>
        <div className="md:w-[50%] "></div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-10">
          <ArrowUpRight strokeWidth={3} size={96} className="h-full w-40" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
            officia eligendi voluptate. Dolores impedit dolorum deleniti
            pariatur recusandae voluptate, fuga necessitatibus tenetur
            repudiandae optio exercitationem inventore molestias minima ex
            corrupti.
          </p>
        </div>
        <div className="flex gap-10">
          <ArrowUpRight strokeWidth={3} size={96} className="h-full w-40" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
            officia eligendi voluptate. Dolores impedit dolorum deleniti
            pariatur recusandae voluptate, fuga necessitatibus tenetur
            repudiandae optio exercitationem inventore molestias minima ex
            corrupti.
          </p>
        </div>
        <div className="flex gap-10">
          <ArrowUpRight strokeWidth={3} size={96} className="h-full w-40" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
            officia eligendi voluptate. Dolores impedit dolorum deleniti
            pariatur recusandae voluptate, fuga necessitatibus tenetur
            repudiandae optio exercitationem inventore molestias minima ex
            corrupti.
          </p>
        </div>
      </div>
    </Container>
  );
}
