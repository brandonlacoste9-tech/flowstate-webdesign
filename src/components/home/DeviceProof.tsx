import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/motion/FadeIn";
import { getCaseStudy, getWorkHref, getWorkHost } from "@/content/case-studies";

const shots = [
  {
    slug: "joes-italian-kitchen",
    src: "/brand/mockup-joes.webp",
    alt: "Joe’s Italian Kitchen rebuild on a laptop and phone",
    wide: true,
  },
  {
    slug: "wellington-diner",
    src: "/brand/mockup-wellington.webp",
    alt: "Wellington Diner rebuild on a laptop and phone",
  },
  {
    slug: "mednam",
    src: "/brand/mockup-mednam.webp",
    alt: "Clinique MedNam rebuild on a laptop and phone",
  },
] as const;

export async function DeviceProof() {
  const t = await getTranslations("home");

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow={t("devicesEyebrow")}
            title={t("devicesTitle")}
            description={t("devicesDescription")}
          />
        </FadeIn>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {shots.map((shot, i) => {
            const study = getCaseStudy(shot.slug);
            const href = study ? getWorkHref(study) : undefined;
            const host = study ? getWorkHost(study) : "";
            const frame = (
              <img
                src={shot.src}
                alt={shot.alt}
                className="w-full border border-border/60 object-cover transition-opacity group-hover:opacity-90"
              />
            );

            return (
              <FadeIn
                key={shot.src}
                delay={i * 0.06}
                className={shot.wide ? "sm:col-span-2" : undefined}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block"
                  >
                    {frame}
                    <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {host}
                    </span>
                  </a>
                ) : (
                  frame
                )}
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
