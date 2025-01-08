import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { RealEstateCard } from "../../components/image-swip";
import { ImageSwiper } from "@/components/image-swiper";
import { AirVentIcon, Wifi } from "lucide-react";

export function DialogDemo({ card }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="">
          info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[var(--color-fuente-4)] border-black color-white text-black">
        <DialogHeader>
          <DialogTitle>{card.title}</DialogTitle>
          <DialogDescription className="text-black">
            {card.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ImageSwiper images={card.images} />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
