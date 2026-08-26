import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { IconBrandWhatsapp, IconBrandFacebook } from "@tabler/icons-react";

export default async function Footer({ lang }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );
  const t = dictionary.ui.footer;

  return (
    <footer className="u-texture-dark border-t border-slate-300/10 bg-ink-900 px-6 pb-10 pt-16 text-paper md:px-16">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/isologo-blanco.png"
            alt="Hotel Crystal"
            width={176}
            height={127}
          />
          <p className="mt-5 max-w-[26ch] text-center text-sm text-slate-300 md:text-left">
            Av. Olascoaga 268, Q8300 Neuquén Capital
          </p>
        </div>

        <div className="space-y-3.5 text-sm">
          <a
            href="https://maps.google.com/?q=Av.+Olascoaga+268,+Neuquén"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-slate-300 transition-colors hover:text-cyan-300"
          >
            <MapPin className="h-4 w-4 shrink-0 text-cyan-300" />
            Av. Olascoaga 268, Neuquén Capital
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=2996263856&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-slate-300 transition-colors hover:text-cyan-300"
          >
            <IconBrandWhatsapp className="h-4 w-4 shrink-0 text-cyan-300" />
            299-6263856
          </a>
          <a
            href="tel:+542996263856"
            className="flex items-center gap-3 text-slate-300 transition-colors hover:text-cyan-300"
          >
            <Phone className="h-4 w-4 shrink-0 text-cyan-300" />
            299-6263856
          </a>
          <a
            href="mailto:crystalneuquen@yahoo.com.ar"
            className="flex items-center gap-3 text-slate-300 transition-colors hover:text-cyan-300"
          >
            <Mail className="h-4 w-4 shrink-0 text-cyan-300" />
            crystalneuquen@yahoo.com.ar
          </a>
        </div>

        <div className="flex flex-col items-center gap-5 md:items-start">
          <span className="u-label text-brass-300">{t.follow}</span>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/hotel.crystal.nqn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brass-400/40 text-paper transition-colors hover:border-cyan-300 hover:text-cyan-300"
            >
              <InstagramLogoIcon className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/hotelcrystalnqn/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brass-400/40 text-paper transition-colors hover:border-cyan-300 hover:text-cyan-300"
            >
              <IconBrandFacebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-600/30 pt-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Hotel Crystal. {t.rights}
      </div>
    </footer>
  );
}
