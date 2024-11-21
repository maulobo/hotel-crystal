import React from "react";
import Container from "../../components/container";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TurismComp({ dictionary }) {
  const activities = dictionary.turism.activities;

  return (
    <Container className={"gap-14 flex flex-col"}>
      <div className="h-[30%] flex gap-8 md:flex-row  flex-col ">
        <div className="flex flex-col md:max-w-[65%] gap-10 md:h-auto md:py-8 ">
          <h3>{dictionary.turism.h3}</h3>
        </div>
        <div className="md:w-[50%] "></div>
      </div>

      <div className="flex flex-col gap-8 py-8 md:py-0">
        {activities.map((act) => {
          return (
            <div className="flex gap-10" key={`${act}`}>
              <Link
                href={act.link}
                className="w-20 flex flex-col items-center justify-center align-middle"
              >
                <ArrowUpRight
                  strokeWidth={1}
                  size={56}
                  className=" w-20 hover:text-[#f2d5a0]"
                />
                <p className=" hover:text-[#f2d5a0]">Link</p>
              </Link>
              <p>{act.description}</p>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
