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
import Image from "next/image";

export function Carou({ images }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="md:w-[80%]  "
    >
      <CarouselContent>
        {images.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 ">
            <div className="p-1 ">
              <Card>
                <span className="font-semibold h-[700px] w-[700px]">
                  <Image
                    src={card[0]}
                    width={700}
                    height={700}
                    className="rounded-t-full  "
                  />
                </span>
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
