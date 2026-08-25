import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { IconBrandWhatsapp, IconBrandFacebook } from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-ink-900 px-6 py-12 text-paper md:px-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/logoo.png"
            alt="Hotel Crystal"
            width={120}
            height={120}
            className="brightness-0 invert"
          />
          <p className="mt-4 text-center text-sm text-slate-300 md:text-left">
            Av. Olascoaga 268, Q8300 Neuquén Capital
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <a
            href="https://maps.google.com/?q=Av.+Olascoaga+268,+Neuquén"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-slate-300 hover:text-cyan-300"
          >
            <MapPin className="h-4 w-4 text-cyan-300" />
            Av. Olascoaga 268, Neuquén Capital
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=2996263856&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-slate-300 hover:text-cyan-300"
          >
            <IconBrandWhatsapp className="h-4 w-4 text-cyan-300" />
            299-6263856
          </a>
          <a
            href="tel:+542996263856"
            className="flex items-center gap-3 text-slate-300 hover:text-cyan-300"
          >
            <Phone className="h-4 w-4 text-cyan-300" />
            299-6263856
          </a>
          <a
            href="mailto:crystalneuquen@yahoo.com.ar"
            className="flex items-center gap-3 text-slate-300 hover:text-cyan-300"
          >
            <Mail className="h-4 w-4 text-cyan-300" />
            crystalneuquen@yahoo.com.ar
          </a>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-start">
          <span className="u-label text-slate-400">Seguinos</span>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/hotel.crystal.nqn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-paper hover:text-cyan-300"
            >
              <InstagramLogoIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/hotelcrystalnqn/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-paper hover:text-cyan-300"
            >
              <IconBrandFacebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-600/30 pt-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Hotel Crystal. Todos los derechos reservados.
      </div>
    </footer>
  );
}
