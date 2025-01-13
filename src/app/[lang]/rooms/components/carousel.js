"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RealEstateCard } from "../../components/image-swip";

import { DialogDemo } from "./dialog";

export function CarouselSize({ dictionary }) {
  const cards = dictionary.rooms.roomsCards;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="md:w-[80%] "
    >
      <CarouselContent>
        {cards.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 ">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 bg-[var(--color-fuente)] rounded-t-full">
                  <span className="font-semibold ">
                    <RealEstateCard images={card.images} title={card.title} />
                    <DialogDemo card={card} dictionary={dictionary} />
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
