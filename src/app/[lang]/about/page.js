import SectionHero from "@/components/site/SectionHero";
import Prose from "@/components/site/Prose";
import Timeline from "@/components/site/Timeline";
import OurHistory from "./components/our-history";
import { buildMetadata } from "@/app/lib/seo";

export function generateMetadata({ params }) {
  return buildMetadata({ lang: params?.lang, route: "about" });
}

export default async function AboutPage({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  const t = dictionary.ui.aboutPage;

  return (
    <>
      <SectionHero
        image="/about/about1.jpg"
        alt={dictionary.ui.alt.facade}
        title={dictionary.about.title}
        priority
      />

      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <Prose>
              <p className="text-2xl font-light leading-snug text-graphite">
                {dictionary.about.statement}
              </p>
            </Prose>
          </div>
          <div>
            <div className="space-y-5">
              {dictionary.about.historyIntro.map((p, i) => (
                <Prose key={i}>
                  <p className={i === 0 ? "text-lg font-light text-graphite" : ""}>{p}</p>
                </Prose>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="u-texture-dark border-t border-slate-300/10 bg-ink-900 px-6 py-20 md:px-16 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-paper">{t.timelineTitle}</h2>
            <p className="mt-5 max-w-[52ch] text-slate-300">{t.timelineLead}</p>
          </div>
          <div className="rounded-card border border-slate-300/10 bg-ink-800/40 p-8">
            <Timeline items={dictionary.about.timeline} dark />
          </div>
        </div>
      </section>

      <OurHistory dictionary={dictionary} />
    </>
  );
}
