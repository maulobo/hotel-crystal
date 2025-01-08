import React from "react";
import Container from "../../components/container";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

export default function TurismComp({ dictionary }) {
  const activities = dictionary.turism.activities;

  return (
    <Container className={"gap-14 flex flex-col"}>
      <div className="h-[30%] flex gap-8 md:flex-row flex-col">
        <div className="flex flex-col md:max-w-[65%] gap-10 md:h-auto md:py-8">
          <h3>{dictionary.turism.h3}</h3>
        </div>
        <div className="md:w-[50%]"></div>
      </div>

      <div className="flex flex-col gap-8 py-8 md:py-0">
        {activities.map((act) => {
          const IconComponent = LucideIcons[act.Ico] || LucideIcons.HelpCircle; // Usa un ícono predeterminado si no existe

          return (
            <div className="flex gap-10" key={act.link}>
              <Link
                href={act.link}
                className="w-20 flex flex-col items-center justify-center align-middle"
              >
                <IconComponent className="w-6 h-6" />
                <p className="hover:text-[#f2d5a0]">Link</p>
              </Link>
              <div>
                <h3 className="text-xxl">{act.title}</h3>
                <p>{act.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
