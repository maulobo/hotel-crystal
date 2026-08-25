import Link from "next/link";
import { Globe, Bus } from "lucide-react";
import { IconBrandInstagram } from "@tabler/icons-react";
import Prose from "@/components/site/Prose";

const ICONS = {
  Instagram: IconBrandInstagram,
  Globe,
  Bus,
};

export default function TurismComp({ dictionary }) {
  const activities = dictionary.turism.activities;

  return (
    <section className="px-6 py-16 md:px-16 md:py-24">
      <div className="mb-10">
        <span className="u-label text-brand-700">{dictionary.turism.h3}</span>
        <h2 className="mt-2 text-graphite">Enlaces de interés</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((act) => {
          const Icon = ICONS[act.Ico] || Globe;
          return (
            <a
              key={act.link}
              href={act.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 rounded-card border border-paper-2 bg-white p-5 hover:border-brand-700"
            >
              <Icon className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
              <div>
                <h3 className="font-display text-graphite group-hover:text-brand-700">
                  {act.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{act.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-16">
        <Prose>
          <p>{dictionary.turism.p6}</p>
        </Prose>
      </div>
    </section>
  );
}
