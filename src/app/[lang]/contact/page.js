import SectionHero from "@/components/site/SectionHero";
import FactStrip from "@/components/site/FactStrip";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const contactData = [
  {
    label: "Dirección",
    value: "Av. Olascoaga 268, Q8300 Neuquén Capital",
    href: "https://maps.google.com/?q=Av.+Olascoaga+268,+Neuquén",
    icon: MapPin,
  },
  {
    label: "WhatsApp",
    value: "299-6263856",
    href: "https://api.whatsapp.com/send/?phone=2996263856&text&type=phone_number&app_absent=0",
    icon: IconBrandWhatsapp,
  },
  {
    label: "Teléfono",
    value: "299-6263856",
    href: "tel:+542996263856",
    icon: Phone,
  },
  {
    label: "Email",
    value: "crystalneuquen@yahoo.com.ar",
    href: "mailto:crystalneuquen@yahoo.com.ar",
    icon: Mail,
  },
  {
    label: "Instagram",
    value: "@hotel.crystal.nqn",
    href: "https://www.instagram.com/hotel.crystal.nqn",
    icon: Instagram,
  },
  {
    label: "Facebook",
    value: "Hotel Crystal NQN",
    href: "https://www.facebook.com/hotelcrystalnqn/",
    icon: Facebook,
  },
];

export default async function ContactPage({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return (
    <>
      <SectionHero
        image="/about/about1.jpg"
        alt="Fachada del Hotel Crystal"
        eyebrow="Atención las 24 horas"
        title={dictionary.nav.contact}
        priority
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="u-eyebrow text-brand-700">Contacto</span>
            <h2 className="mt-4 text-graphite">Hablemos</h2>
            <p className="mt-4 max-w-[52ch] text-slate-600">
              Estamos en el centro de Neuquén Capital. Escribinos por WhatsApp, llamanos o
              pasá a saludar.
            </p>

            <ul className="mt-8 space-y-3">
              {contactData.map((item) => {
                const Icon = item.icon;
                const external = item.href.startsWith("http");
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-card border border-paper-2 bg-white p-4 transition-all duration-300 hover:border-brand-700 hover:shadow-[0_12px_40px_-18px_rgba(11,27,43,0.35)]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass-400/40 bg-paper-2/60">
                        <Icon className="h-5 w-5 text-brand-700" />
                      </span>
                      <div>
                        <span className="u-label block text-slate-400">{item.label}</span>
                        <span className="text-graphite">{item.value}</span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="overflow-hidden rounded-card border border-paper-2 shadow-[0_20px_60px_-30px_rgba(11,27,43,0.4)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.5119845800255!2d-68.06132092406025!3d-38.957975871711255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a34a9cb8dea9b%3A0xcc9bddd5fd58bbe9!2sCRYSTAL%20SRL!5e0!3m2!1ses-419!2sar!4v1736342715046!5m2!1ses-419!2sar"
              className="h-72 w-full md:h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <FactStrip
        tone="light"
        items={[
          { k: "Check-in", v: "12:00" },
          { k: "Check-out", v: "10:00" },
          { k: "Desayuno", v: "Lun–Sáb 7:30–10:00 / Dom y feriados 8:00–11:00" },
          { k: "Conserjería", v: "24 horas" },
        ]}
      />
    </>
  );
}
