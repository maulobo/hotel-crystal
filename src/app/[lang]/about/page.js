import SectionHero from "@/components/site/SectionHero";
import Prose from "@/components/site/Prose";
import Timeline from "@/components/site/Timeline";
import OurHistory from "./components/our-history";

export default async function AboutPage({ params: { lang } }) {
  const dictionary = await import(`../../dictionaries/${lang}.json`).then(
    (m) => m.default
  );

  return (
    <>
      <SectionHero
        image="/about/about1.jpg"
        alt="Fachada del Hotel Crystal"
        eyebrow="Desde 1966"
        title={dictionary.about.title}
        priority
      />

      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Prose className="text-lg">
              <p className="text-graphite">{dictionary.about.statement}</p>
            </Prose>
          </div>
          <div>
            <span className="u-label text-brand-700">{dictionary.about.ourHistoryh21}</span>
            <div className="mt-6 space-y-4">
              {dictionary.about.historyIntro.map((p, i) => (
                <Prose key={i}>
                  <p>{p}</p>
                </Prose>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-paper-2 bg-white px-6 py-16 md:px-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-graphite">Línea de tiempo</h2>
            <p className="mt-4 max-w-[52ch] text-slate-600">
              Los hitos que marcan la historia del hotel y de la familia que lo fundó.
            </p>
          </div>
          <Timeline items={dictionary.about.timeline} />
        </div>
      </section>

      <OurHistory dictionary={dictionary} />
    </>
  );
}
