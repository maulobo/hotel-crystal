import { Globe, Bus, ArrowUpRight } from "lucide-react";
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
    <section className="px-6 py-20 md:px-16 md:py-28">
      <div className="mb-12">
        <span className="u-eyebrow text-brand-700">{dictionary.turism.h3}</span>
        <h2 className="mt-4 text-graphite">Enlaces de interés</h2>
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
              className="group flex gap-4 rounded-card border border-paper-2 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-700 hover:shadow-[0_12px_40px_-18px_rgba(11,27,43,0.35)]"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brass-400/40 bg-paper-2/60">
                <Icon className="h-5 w-5 text-brand-700" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-graphite transition-colors group-hover:text-brand-700">
                  {act.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{act.description}</p>
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-brand-700" />
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
